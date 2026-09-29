
// src/app/models/sf-ai-schema.ts
export const generateChartSchema = (componentType = 'Chart') => ({
  title: 'Syncfusion Universal AI Response (Chart)',
  type: 'object',
  props: {
    componentType: { type: 'string', const: componentType },
    properties: { type: 'object', properties: {} },
  },
  includedProps: {
    type: 'array',
    items: { type: 'string' },
    default: ['DataSource'],
  },
  ignoreProps: {
    type: 'array',
    items: { type: 'string' },
    default: [
      'primaryXAxis',
      'primaryYAxis',
      'legendSettings',
      'chartArea',
      'series.type',
      'theme',
      'palettes',
      'tooltip',
      'locale',
      'enableRtl',
      'cssClass',
      'created',
      'destroyed',
      'height',
      'width',
    ],
  },
  explanation: { type: 'string' },
  confidence: { type: 'number', minimum: 0, maximum: 1 },
   required: ['props', 'explanation', 'includedProps', 'ignoreProps', 'confidence'],
  additionalProperties: true
})
