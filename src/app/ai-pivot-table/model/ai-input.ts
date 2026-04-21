import { serverAIRequest } from '../backend/ai-service';
import { executePivotAction } from './PivotAction';
import { PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { generateSchema } from './sf-ai-schema';

function fetchAI(text: string | undefined, pivot: PivotViewComponent, assistView: AIAssistViewComponent, dataSourceSettings: any) {
  let schema = generateSchema('PivotView');
  let required = schema.required;
  let state: any = JSON.parse(pivot.getPersistData());
  if (Array.isArray(state?.dataSourceSettings?.dataSource)) {
    dataSourceSettings.dataSource = dataSourceSettings.dataSource.slice(0, 1);
    state.dataSourceSettings.dataSource = state.dataSourceSettings.dataSource.slice(0, 1);
    state.pivotValues = [];
  }
  delete state.pivotValues;
  delete state.gridSettings;
  delete state.pageSettings;
  delete state.dataSourceSettings.authentication;
  delete state.dataSourceSettings.alwaysShowValueHeader;
  delete state.dataSourceSettings.fieldMapping;
  delete state.dataSourceSettings.localeIdentifier;
  delete state.dataSourceSettings.groupSettings;
  delete state.dataSourceSettings.mode;
  delete state.dataSourceSettings.providerType;
  delete state.dataSourceSettings.showHeaderWhenEmpty;
  delete state.dataSourceSettings.showAggregationOnValueField;
  delete state.dataSourceSettings.valueIndex;
  delete state.dataSourceSettings.type;

  if (state.chartSettings) {
    const type = state.chartSettings?.chartSeries?.type ?? undefined;
    state.chartSettings = { chartSeries: {} };
    if (type !== undefined) {
      state.chartSettings.chartSeries.type = type;
    }
  }
  const dss = state.dataSourceSettings;
  if (dss && typeof dss === 'object') {
    const shrinkFields = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map(f => ({
        name: f?.name ?? '',
        caption: (typeof f?.caption === 'string' && f.caption.length > 0) ? f.caption : (f?.name ?? ''),
        expandAll: !!f?.expandAll
      }));
    };
    const shrinkValueFields = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map(f => ({
        name: f?.name ?? '',
        caption: (typeof f?.caption === 'string' && f.caption.length > 0) ? f.caption : (f?.name ?? ''),
        type: f?.type ?? ''
      }));
    };

    if (Array.isArray(dss.columns)) dss.columns = shrinkFields(dss.columns);
    if (Array.isArray(dss.rows)) dss.rows = shrinkFields(dss.rows);
    if (Array.isArray(dss.values)) dss.values = shrinkValueFields(dss.values);
    schema.props.properties.properties = state;
  }
  let textArea = ` You are an assistant that customizes Syncfusion PivotView for Sales Analysis. Modify ONLY requested parts in props.dataSourceSettings, props.displayOption, and props.chartSettings. Apply minimal diffs; do not reset unrelated settings. RULES: Fields/Measures: - Use only fields/measures from datasource (case-insensitive). No invented fields. - If requested field is missing, explain and skip. - Add/remove fields in rows/columns/values/filters only if they exist. - values: ALWAYS return full values array when calculated fields added. Aggregation: - Find measure by name in dataSourceSettings.values; set type to requested aggregation (Sum, Avg, Count, DistinctCount, Product, Min, Max). Preserve others. Expand/Collapse: - Overall expand/collapse: dataSourceSettings.expandAll=true/false. - Field-level: set expandAll on specific field in rows/columns. - Specific members: drilledMembers=[{name,items:[...]}]. - If expandAll is set, drilledMembers=[]. Sorting: - Member sorting: use sortSettings with order Ascending/Descending/None. - Value sorting: Return full valueSortSettings {columnHeaderText,columnSortOrder,rowHeaderText,rowSortOrder,measure}. Use user-provided header text. If missing→null. Apply sortOrder to specified header(s). Clear member sorting→sortSettings=[]. Clear value sorting→valueSortSettings={}. Formatting: - Use formatSettings only if requested; clear→[]. Conditional Formatting: - Use dataSourceSettings.conditionalFormatSettings. Each rule: {measure,conditions,value1,value2?,style{backgroundColor,color,fontFamily,fontSize}}. Clear all only when requested→conditionalFormatSettings=[]. Totals: - Always inside dataSourceSettings. Row Sub-total→showSubTotals=true,showRowSubTotals=true. Col Sub-total→showSubTotals=true,showColumnSubTotals=true. Hide Row Sub→showRowSubTotals=false; if both false→showSubTotals=false. Hide Col Sub→showColumnSubTotals=false; same logic. Clear All Sub→showSubTotals=showRowSubTotals=showColumnSubTotals=false. Apply identical pattern for Grand Totals. Calculated Fields: - Add via calculatedFieldSettings {name,formula,caption?}. Formula: each measure reference MUST be "\"Sum(Field)\"". Combine with +,-,*,/ and numbers/parentheses. No leading "=". Normalize: [Field]→"Sum(Field)", bare Field→"Sum(Field)", preserve numbers, remove leading "=". Validate references; if invalid, explain and skip. Merge with existing arrays. Do NOT remove/overwrite unless explicitly asked. Filtering: - Three types; pick correctly: 1. Member Filtering: explicit include/exclude. Format {name,type:"Include"/"Exclude",items:[...]}. 2. Label Filtering: text-based conditions. Conditions: Equals,DoesNotEquals,GreaterThan,GreaterThanOrEqualTo,LessThan,LessThanOrEqualTo,Between,NotBetween,Contains,DoesNotContains,BeginWith,DoesNotBeginWith,EndsWith,DoesNotEndsWith. Format {name,type:"Label",condition,value1,value2?}. 3. Value Filtering: numeric conditions on aggregated values. Format {name,type:"Value",measure,condition,value1,value2?}. - Preserve existing filters unless asked to clear→[]. Ref: https://ej2.syncfusion.com/documentation/pivotview/ DisplayOption: - NEVER modify 'view' (always "Both"). ONLY change 'primary' ("Chart" or "Table"). Chart: - Change chart type via chartSettings.chartSeries.type. When changed, also update props.displayOption.primary="Chart". Axis: - Move values via valueAxis="row"/"column". REFERENCE NOTE: - Sample raw data is only for reference. Actual dataset members: • Country: France,Germany,United Kingdom,United States • Year: FY 2022,FY 2023,FY 2024,FY 2025 • Product_Categories: Accessories,Bikes,Clothing • Quarter: Q1,Q2,Q3,Q4 • Products: Bottles and Cages,Cleaners,Fenders • Order_Source: Retail Outlets,Sales Person,App Store,Teleshopping - Always assume full dataset for expand/collapse, sorting, filtering, drilledMembers. IMPORTANT: - Output JSON must NEVER include commented lines inside props or any nested objects. Only valid JSON is allowed. Current pivot state:${JSON.stringify(state)} Schema:${JSON.stringify(schema)} state structure:{ "dataSourceSettings":{ "columns":[{"name":"","caption":"","expandAll":false}], "rows":[{"name":"","caption":"","expandAll":false}], "values":[{"name":"","caption":"","type":""}], "filters":[{"name":"","caption":""}], "filterSettings":[ {"name":"","type":"","items":[]}, {"name":"","type":"Label","condition":"","value1":"","value2":""}, {"name":"","type":"Value","measure":"","condition":"","value1":0,"value2":0} ], "excludeFields":[], "expandAll":false, "enableSorting":false, "formatSettings":[{"name":"","format":"","useGrouping":false,"minimumFractionDigits":0,"maximumFractionDigits":0}], "sortSettings":[{"name":"","order":"","membersOrder":[]}], "valueSortSettings":{"columnHeaderText":"","headerDelimiter":"","columnSortOrder":"","rowHeaderText":"","rowSortOrder":"","measure":""}, "drilledMembers":[{"name":"","items":[]}], "calculatedFieldSettings":[{"name":"","formula":""}], "conditionalFormatSettings":[{"measure":"","applyGrandTotals":false,"conditions":"","value1":0,"value2":0,"style":{"backgroundColor":"","color":"","fontFamily":"","fontSize":""}}], "grandTotalsPosition":"", "subTotalsPosition":"", "showColumnGrandTotals":false, "showRowGrandTotals":false, "showColumnSubTotals":false, "showRowSubTotals":false, "showGrandTotals":false, "showSubTotals":false, "valueAxis":"" }, "displayOption":{"view":"Both","primary":""}, "chartSettings":{"chartSeries":{"type":""}} } Output contract (JSON only):{ "explanation":string, "confidence":number, "props":{ "dataSourceSettings":{}, "displayOption"?{"view":"Both","primary":""}, "chartSettings"?{"chartSeries"?{"type":"Column"|"Bar"|"Line"|"Spline"|"Area"|"SplineArea"|"StepLine"|"StepArea"|"StackingColumn"|"StackingBar"|"StackingArea"|"StackingColumn100"|"StackingBar100"|"StackingArea100"|"Scatter"|"Bubble"|"Pyramid"|"Funnel"|"Polar"|"Radar"}} }, "ignoredActions":string[] } Required Results:${required} Return ONLY valid JSON matching the schema and contract above. Do not include any commented lines inside props.`
  let aiOutput = serverAIRequest({ messages: [{ role: 'system', content: textArea }, { role: 'user', content: text }] });
  aiOutput.then((result: string) => {
    if (!result) {
      return;
    }
    let jsonResult = result;
    if (result.indexOf("```json") !== -1) {
      jsonResult = result.split("```json")[1].split("```")[0].trim();
    }
    let data;
    let response: string = '';
    try {
      if (jsonResult.indexOf('{') !== -1 && jsonResult.indexOf('}') !== -1) {
        data = JSON.parse(jsonResult);
        executePivotAction(data, pivot, data.includedProps);
        response = data.explanation;
      } else {
        response = jsonResult;
      }
    } catch (error) {
      assistView.addPromptResponse({ prompt: error, response: error });
      return;
    }
    if (data && data.confidence < 0.7) {
      aiOutput = serverAIRequest({ messages: [{ role: 'system', content: textArea }, { role: 'user', content: text }] });
    }
    assistView.addPromptResponse({ response: response });
  });
}
export { fetchAI };