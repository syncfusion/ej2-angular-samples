import { serverAIRequest } from '../backend/ai-service';
import { executeGridAction } from './GridAction';
import { GridComponent} from '@syncfusion/ej2-angular-grids';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import {generateSchema} from './sf-ai-schema';
function fetchAI( text: string | undefined, grid: GridComponent, assistView: AIAssistViewComponent, columns: any) {
let schema = generateSchema('Grid');
let required = schema.required;
let state: any = JSON.parse(grid.getPersistData());
delete state.columns;
schema.props.properties.properties = state;
let prompt = `
You are an assistant that helps users customize a grid showing Gadget purchase details. You help users modify grid configuration to fit their needs.
Use the provided schema to adjust grid features according to the user's request.
Change only what the user explicitly asked for, not the complete state. Provide a clear explanation of what you changed.
Explanation: Based on the user request and its result,
### Available Columns
These are the only valid columns you may reference (case-insensitive, allow near matches for common typos/misspellings):
${JSON.stringify(columns)}
Strictly check that any column mentioned in the request exists (or closely matches) in the above list. If a requested column does not exist or cannot be reasonably matched, do not apply any state changes related to it and explain why in the response.
Important: Explain if the user wants to do action which is not provided in the current schema provide a clear explanation of the action not handled in the current schema strictly provide in json result.
Current grid state: ${JSON.stringify(state)}
schema : ${JSON.stringify(schema)}
state structure:
{
  "sortSettings": { "columns": [{"field": "ColumnName", "direction": "Ascending" | "Descending"}] },
  "filterSettings": { "columns": [{"field": "ColumnName", "operator": "equal" | "notequal" | "greaterthan" | "greaterthanorequal" | "lessthan" | "lessthanorequal" | "contains" | "startswith" | "endswith", "value": "value"}] },
  "groupSettings": { "columns": ["ColumnName1", "ColumnName2"] },
  "pageSettings": { "pageSize": number, "currentPage": number },
  "searchSettings": { "key": "search term" }
}
Required Results: ${required} strictly provide in json result`
    let aiOutput = serverAIRequest({ messages: [{ role: 'system', content: prompt }, {role: 'user', content: text}]});
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
                executeGridAction(data, grid, data.includedProps);
                response = data.explanation;
            } else {
                response = jsonResult;
            }
        } catch (error) {
            assistView.addPromptResponse({ prompt: error, response: error });
            return;
        }
        if (data && data.confidence < 0.7) {
            aiOutput = serverAIRequest({ messages: [{ role: 'system', content: prompt }, {role: 'user', content: text}]});
        }
        assistView.addPromptResponse({ response: response });
    });
}
export {fetchAI};