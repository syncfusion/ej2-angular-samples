export function getCELQuery(rules: any, celQuery: string): string {
    celQuery = convertQuery(rules, celQuery, null, 'CEL');
    return celQuery;
}

export function getSpELQuery(rules: any, spELQuery: string): string {
    spELQuery = convertQuery(rules, null, spELQuery, 'SpEL');
    return spELQuery;
}

export function getMongoQuery(rules: any, mongoQuery: string): string {
mongoQuery = '{';
if (rules.condition == "or") {
    mongoQuery += '"$or":[';
    mongoQuery = convertMongoQuery(rules.rules, mongoQuery) + ']';
} else {
    mongoQuery += '"$and":[';
    mongoQuery = convertMongoQuery(rules.rules, mongoQuery) + ']';
}
mongoQuery += '}';
return mongoQuery;
}

export function updateRuleValue(rule: any, isNamedParameter: boolean): string[] {
  let ruleVal: string[] = [];
  let namedParameters: string[] = [];
  ruleVal = updateValue(rule, isNamedParameter, [], ruleVal, namedParameters);
  return ruleVal;
}

export function getParameterSql(content: string, ruleValue: any): string {
  let replacedString: string = content.replace(/'\?'/g, "?");
  return '{ sql: "(' + replacedString + ')", "params": [' + ruleValue.join(", ") + '] }';
  
}

export function getNamedParameterSql(content: string, ruleValue: any): string {
  let replacedString: string = content.replace(/'(:[^']*)'/g, '$1');
  return '{ sql: "(' + replacedString + ')", "params": {' + ruleValue.join(", ") + '} }';
}

const convertQuery = function(rules, celQuery, spELQuery, type): string {
    let isRoot: boolean = false;
    let celOperators: any = {
        equal: '==', notequal: '!=', greaterthan: '>', greaterthanorequal: '>=', lessthan: '<', in: 'in', notin: 'in',
        lessthanorequal: '<=', startswith: 'startsWith', endswith: 'endsWith', contains: 'contains', isnull: '== null', isnotnull: '!= null',
        isempty: '== ""', isnotempty: '!= ""'
    };
    let spELOperators: any = {
      equal: '==', notequal: '!=', greaterthan: '>', greaterthanorequal: '>=', lessthan: '<', in: 'in', notin: 'in',
      lessthanorequal: '<=', startswith: 'matches', endswith: 'matches', contains: 'matches', isnull: '== null', isnotnull: '!= null',
      isempty: '== ""', isnotempty: '!= ""'
    };
    if (type === 'CEL') {
      if (!celQuery && celQuery !== '') {
          celQuery = '';
          isRoot = true;
      } else {
          celQuery += '(';
      }
    } else {
      if (!spELQuery && spELQuery !== '') {
          spELQuery = '';
          isRoot = true;
      } else {
          spELQuery += '(';
      }
    }
    
    let condition: string = rules.condition;
    if (rules.rules) {
        for (let j: number  = 0, jLen = rules.rules.length; j < jLen; j++) {
            if (rules.rules[j].rules) {
              if (type === 'CEL') {
                celQuery = convertQuery(rules.rules[j], celQuery, null, 'CEL');
              } else {
                spELQuery = convertQuery(rules.rules[j], null, spELQuery, 'SpEL');
              }
            } else {
                const rule: any = rules.rules[j]; let valueStr: string = '';
                const ruleOpertor: string = (type === 'CEL') ? celOperators[rule.operator] : spELOperators[rule.operator];
                let operator: string = rule.operator.toString();
                if (rule.value instanceof Array) {
                    if (operator === 'between') {
                        const ruleCondition: string = ' ' + '&&' + ' ';
                        if (rule.type === 'date') {
                            valueStr += '(' + rule.field + ' >= "' + rule.value[0] + '"' + ruleCondition + rule.field + ' <= "' + rule.value[1] + '")';
                        } else {
                            valueStr += '(' + rule.field + ' >= ' + rule.value[0] + ruleCondition + rule.field + ' <= ' + rule.value[1] + ')';
                        }
                    } else if (operator === 'notbetween') {
                        const ruleCondition: string = ' ' + '||' + ' ';
                        if (rule.type === 'date') {
                            valueStr += '(' + rule.field + ' < "' + rule.value[0] + '"' + ruleCondition + rule.field + ' > "' + rule.value[1] + '")';
                        } else {
                            valueStr += '(' + rule.field + ' < ' + rule.value[0] + ruleCondition + rule.field + ' > ' + rule.value[1] + ')';
                        }
                    } else {
                        if (type === 'CEL') {
                          if (rule.value !== null) {
                            let value: string = rule.value[0] ? rule.value[0] : "";
                            valueStr += '["' + value + '"';
                            for (let k = 1, kLen = rule.value.length; k < kLen; k++) {
                                valueStr += ', "' + rule.value[k] + '"';
                            }
                            valueStr += ']';
                          }
                        } else {
                          if (rule.value !== null) {
                            let value: string = rule.value[0] ? rule.value[0] : "";
                            valueStr += '(' + rule.field + ' == "' + value + '"';
                            for (let k: number = 1, kLen = rule.value.length; k < kLen; k++) {
                                valueStr += ' or ' + rule.field + ' == "' + rule.value[k] + '"';
                            }
                            valueStr += ')';
                        }
                      }
                    }
                } else {
                  if (type === 'CEL') {
                    if (rule.type === 'number' || typeof rule.value === 'boolean' || rule.value === null) {
                      valueStr += rule.value;
                    } else {
                        valueStr += '"' + rule.value + '"';
                    }
                  } else {
                    if (operator.indexOf('startswith') > -1) {
                        valueStr += rule.value ? '"^' + rule.value + '"' : '(' + rule.value + ')';
                    } else if (operator.indexOf('endswith') > -1) {
                        valueStr += rule.value ? '"' + rule.value + '$"' : '(' + rule.value + ')';
                    } else if (operator.indexOf('contains') > -1) {
                        valueStr += rule.value ? '"' + rule.value + '"' : '(' + rule.value + ')';
                    } else if (operator.indexOf('isempty') > -1) {
                        valueStr += '';
                    } else {
                        if (rule.type === 'number' || typeof rule.value === 'boolean' || rule.value === null) {
                            valueStr += rule.value;
                        } else {
                            valueStr += '"' + rule.value + '"';
                        }
                    }
                  }
                }
                if (operator.indexOf('null') > -1 || (operator.indexOf('empty') > -1)) {
                    if (rule.field.indexOf(' ') > -1) {
                        rule.field = '"' + rule.field + '"';
                    }
                    if (type === 'CEL') {
                      celQuery += rule.field + ' ' + ruleOpertor;
                    } else {
                      spELQuery += rule.field + ' ' + ruleOpertor;
                    }
                } else {
                    if (rule.field.indexOf(' ') > -1) {
                        rule.field = '"' + rule.field + '"';
                    }
                    if (type === 'CEL') {
                      if (operator.indexOf('startswith') > -1 || (operator.indexOf('endswith') > -1) || (operator.indexOf('contains') > -1)) {
                          celQuery += rule.field + '.' + ruleOpertor + '(' + valueStr + ')';
                      } else if (operator.indexOf('between') > -1) {
                          celQuery += valueStr;
                      } else if (operator.indexOf('notin') > -1) {
                          celQuery += '!(' + rule.field + ' ' + ruleOpertor + ' ' + valueStr + ')';
                      } else {
                          celQuery += rule.field + ' ' + ruleOpertor + ' ' + valueStr;
                      }
                    } else {
                      if (operator.indexOf('between') > -1 || operator === 'in') {
                        spELQuery += valueStr;
                      } else if (operator.indexOf('notin') > -1) {
                          spELQuery += '!' + valueStr;
                      } else {
                          spELQuery += rule.field + ' ' + ruleOpertor + ' ' + valueStr;
                      }
                    }
                }
                if (rule.condition && rule.condition !== '') {
                    condition = rule.condition;
                }
            }
            if (j !== jLen - 1) {
                const rule = rules.rules[j];
                if (condition === '' || (rule && rule.condition !== '' && rule.custom && (rule.custom).isCustom)){
                    condition = rule.condition;
                }
                if (type === 'CEL') {
                  condition = condition.toUpperCase();
                  if (condition === 'AND') {
                      celQuery += ' && ';
                  } else {
                      celQuery += ' || ';
                  }
                } else {
                  condition = condition.toLowerCase();
                  spELQuery += ' ' + condition + ' ';
                }
            }
        }
    }
    if (!isRoot) {
      if (type === 'CEL') {
        celQuery += ')';
      } else {
        spELQuery += ')';
      }
    }
    if (type === 'CEL') {
      return celQuery;
    }
    return spELQuery;
}
  
const convertMongoQuery = function(rules, mongoQuery): string {
    let i: number = 0;
    rules.forEach((item) => {
        i++;
        mongoQuery += '{';
        if (item.rules != undefined) {
            if (item.condition == "or") {
                mongoQuery += ' "$or":[';
                mongoQuery = convertMongoQuery(item.rules, mongoQuery) + ']';
            } else {
                mongoQuery += ' "$and":[';
                mongoQuery = convertMongoQuery(item.rules, mongoQuery) + ']';
            }
        }
        let itVal: string = item.type == 'string' && item.operator != 'in' && item.operator != 'notin' && item.value && item.value.trim() != '' ? item.value.replace(/\"/g, "\\\"") : '';
        if (item.type == 'string' && (item.operator == 'in' || item.operator == 'notin') && item.value && item.value.length == 1) {
            itVal = item.value[0].replace(/\"/g, "\\\"");
        }
        let field: string = item.field ? item.field.substring(0) : '';
        switch (item.operator) {
            case "contains":
                mongoQuery += '"' + field + '":{"$regex":"' + itVal + '"}';
                break;
            case "startswith":
                mongoQuery += '"' + field + '":{"$regex":"^' + itVal + '"}';
                break;
            case "endswith":
                mongoQuery += '"' + field + '":{"$regex":"' + itVal + '$"}';
                break;
            case "isnull":
                mongoQuery += '"' + field + '": null';
                break;
            case "isnotnull":
                mongoQuery += '"' + field + '":{"$ne": null}';
                break;
             case "isempty":
                mongoQuery += '"' + field + '": ""';
                break;
            case "isnotempty":
                mongoQuery += '"' + field + '":{"$ne": ""}';
                break;
            case "equal":
                if (item.type == "string") {
                    mongoQuery += '"' + field + '":"' + itVal + '"';
                } else {
                    mongoQuery += '"' + field + '":"' + item.value + '"';
                }
                break;
            case "notequal":
                if (item.type == "string") {
                  mongoQuery += '"' + field + '":{"$ne":"' + itVal + '"}';
                } else {
                  mongoQuery += '"' + field + '":{"$ne":"' + item.value + '"}';
                }
                break;
            case "in":
                if (item.type == "string") {
                    let j = 0;
                    if (item.value.length > 1) {
                        let s = item.value.map(function (x, j) { if (j < item.value.length) { return '"' + item.value[j] + '"' } }).toString();
                        s = s.endsWith(',') ? s.substring(0, s.length - 1) : s;
                        mongoQuery += '"' + field + '": { "$in": [' + s + ']}';
                    } else {
                      mongoQuery += '"' + field + '": { "$in": ["' + itVal + '"]}';
                    }
                } else if (item.type == "number") {
                    if (item.value.length > 1) {
                        mongoQuery += '"' + field + '": { "$in": [' + item.value.toString() + ']}';
                    } else {
                        mongoQuery += '"' + field + '": { "$in": [' + item.value + ']}';
                    }
                }
                break;
            case "notin":
                if (item.type == "string") {
                    let j: number = 0;
                    if (item.value.length > 1) {
                        let s = item.value.map(function (x, j) { if (j < item.value.length) { return '"' + item.value[j] + '"' } }).toString();
                        s = s.endsWith(',') ? s.substring(0, s.length - 1) : s;
                        mongoQuery += '"' + field + '": { "$nin": [' + s + ']}';
                    } else {
                      mongoQuery += '"' + field + '": { "$nin": ["' + itVal + '"]}';
                    }
                }
                else if (item.type == "number") {
                    if (item.value.length > 1) {
                        mongoQuery += '"' + field + '": { "$nin": [' + item.value.toString() + ']}';
                    } else {
                      mongoQuery += '"' + field + '": { "$nin": [' + item.value + ']}';
                    }
                }
                break;
            case "greaterthan":
                mongoQuery += '"' + field + '": { "$gt": "' + item.value + '"}';
                break;
            case "greaterthanorequal":
                mongoQuery += '"' + field + '": { "$gte": "' + item.value + '"}';
                break;
            case "between":
                mongoQuery += '"' + field + '": {"$gte":' + item.value[0] + ', "$lte":' + item.value[1] + '}';
                break;
            case "notbetween":
                mongoQuery += '"or":[{"' + field + '": {"$lte":' + item.value[0] + '}}, {"' + field + '": {"$gte":' + item.value[1] + '}}]';
                break;
            case "lessthan":
                mongoQuery += '"' + field + '": { "$lt": "' + item.value + '"}';
                break;
            case "lessthanorequal":
                mongoQuery += '"' + field + '": { "$lte": "' + item.value + '"}';
                break;
        }
        mongoQuery += '}';
        if (rules.length != i) {
            mongoQuery += ',';
        }
    });
    return mongoQuery;
}

const updateValue = function(rule: any, isNamedParameter: boolean, list: any, ruleVal: string[], namedParameters: string[]): string[] {
  let qbrules: any = rule.rules;
  for (let i: number = 0; i < qbrules.length; i++) {
      list.push(qbrules[i]);
  }
  let rulecollection: any = list; 
  let len: number = rulecollection.length; 
  for (let i: number = 0; i < len; i++) {
      if (rulecollection[i].rules != null) { 
          let rule: any = rulecollection[i];
          list = [];
          rulecollection = []; 
          ruleVal = updateValue(rule, isNamedParameter, list, ruleVal, namedParameters);
      } else {
          let namedField: string;
          if (rulecollection[i].value instanceof Array) {
              for (let j: number = 0; j < (rulecollection[i].value as any).length; j++) {
                  if (isNamedParameter) {
                      namedField = getNamedParameter(rulecollection[i].field, namedParameters);
                  }
                  if (rulecollection[i].type === "string" || rulecollection[i].type === "date") {
                      if (isNamedParameter) {
                          const newValue: string = '"' + namedField + '": ' + '"' + rulecollection[i].value[j].toString() + '"';
                          ruleVal.push(newValue);
                      } else {
                          ruleVal.push('"' + rulecollection[i].value[j].toString() + '"');
                      }
                  } else {
                      if (isNamedParameter) {
                          const newValue: string = '"' + namedField + '": ' + rulecollection[i].value[j].toString();
                          ruleVal.push(newValue);
                      } else {
                          ruleVal.push(rulecollection[i].value[j].toString());
                      }
                  }
                  if (isNamedParameter) {
                      rulecollection[i].value[j] = ":" + namedField;
                  } else {
                      rulecollection[i].value[j] = "?";
                  }
              }
          } else {
              if (isNamedParameter) {
                namedField = getNamedParameter(rulecollection[i].field, namedParameters);
              }
              if (rulecollection[i].operator.indexOf('null') < 1) {
                  if (rulecollection[i].type != "string" || (rulecollection[i].type == "string" && rulecollection[i].value != "")) {
                      if (rulecollection[i].type === "string" || rulecollection[i].type === "date") {
                          if (rulecollection[i].operator.indexOf('empty') < 1) {
                            let value: string = rulecollection[i].value.toString();
                            switch (rulecollection[i].operator) {
                              case 'startswith':
                                value = value + '%';
                                break;
                              case 'endswith':
                                value = '%' + value;
                                break;
                              case 'contains':
                                value = '%' + value + '%';
                                break;
                            }
                            if (isNamedParameter) {
                              const newValue: string = '"' + namedField + '": ' + '"' + value + '"';
                              ruleVal.push(newValue);
                            } else {
                                ruleVal.push('"' + value + '"'); 
                            }
                          } else {
                              if (isNamedParameter) {
                                  const newValue: string = '"' + namedField + '": ' + '"' + '"';
                                  ruleVal.push(newValue);
                              } else {
                                  ruleVal.push('"' + '"'); 
                              }
                              if (rulecollection[i].operator === 'isempty') {
                                  rulecollection[i].operator = 'equal';
                              } else {
                                  rulecollection[i].operator = 'notequal';
                              }
                          }
                      } else {
                          if (isNamedParameter) {
                              const newValue: string = '"' + namedField + '":' + rulecollection[i].value.toString();
                              ruleVal.push(newValue);
                          } else {
                              ruleVal.push(rulecollection[i].value.toString());
                          }
                      }
                      if (isNamedParameter) {
                          rulecollection[i].value = ":" + namedField;
                      } else {
                          rulecollection[i].value = "?";
                      }
                  }
              }
          }
      }
  } 
  rulecollection = []; 
  list= [];
  return ruleVal;
}

function getNamedParameter(field: string, namedParameters: string[]): string {
  let newField: string = null;
  if (namedParameters.length > 0) {
      for (let i: number = namedParameters.length - 1; i >= 0; i--) {
          const currField: string  = namedParameters[i];
          if (currField.indexOf(field) > -1) {
              const idx: number = parseInt(currField.split('_')[1]) + 1;
              newField = field + '_' + idx;
              namedParameters.push(newField);
              break;
          }
      }
  }
  if (!newField) {
      newField = field + '_1';
      namedParameters.push(newField);
  }
  return newField;
}