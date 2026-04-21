import type { GridComponent } from "@syncfusion/ej2-angular-grids";
export interface UniversalAIDelta {
  componentType: GridComponent;
  properties: Record<string, any>;      // Any valid Syncfusion prop/value
  ignoreProps?: string[];             // Props AI must NEVER touch
  explanation: string;                  // Human friendly "I did X, Y, Z"
  confidence?: number;                  // 0-1 (optional, for UI feedback)
}
export const generateSchema = (componentType: string) => ({
  "title": "Syncfusion Universal AI Response",
  "type": "object",
  "props": {
    "componentType": { "type": "string", "const": componentType },
    "properties": {
      "type": "object",
      "properties": {},
      "description": "Only the props you want to change. Can be any valid Syncfusion prop."
    },
  },
  "includedProps": {
    "type": "array",
    "items": {"type": "string"},
    "default": ['Filter', 'Sort', 'Group', 'Page' ],   // Used for ai result as for this enabled features.
    "description": 'This actions only handled in this schema'
  },
  "ignoreProps": {
    "type": "array",
    "items": { "type": "string" },
    "default": ["dataSource", "height", "width", "locale", "enableRtl", "cssClass", "created", "destroyed"],  // Used to prevent the changes requested from user.
    "description": 'This actions were not handled in this schema'
  },
  "explanation": { "type": "string", "description": "User actions for included or ignored props" },
  "confidence": { "type": "Float", "minimum": 0, "maximum": 1 },
  "required": ["props", "explanation", "includedProps", "ignoredProps", "confidence"],
  "additionalProperties": true
});