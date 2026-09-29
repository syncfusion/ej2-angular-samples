
// src/app/models/ai-input.ts
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { generateChartSchema } from './sf-ai-schema';
import { serverAIRequest } from '../backend/ai-service';

type ChartPoint = { time: Date; visitors: number | null; color?: string };

function parseCleanedLines(linesText: string, original: ChartPoint[]): ChartPoint[] {
  const lines = linesText.split('\n').filter(l => l.trim().length);
  const out: ChartPoint[] = [];
  let i = 0;

  for (const line of lines) {
    const [stamp, value] = line.split(':');
    if (!stamp || !value) continue;

    const [y, M, d, H, m, s] = stamp.trim().split('-').map(n => parseInt(n, 10));
    const val = parseFloat(value.trim());

    if ([y, M, d, H, m, s].every(Number.isFinite) && !Number.isNaN(val)) {
      const date = new Date(y, M - 1, d, H, m, s);

      const isCurrNull = original[i]?.visitors == null;
      const isNextNull = original[i + 1]?.visitors == null;
      const color = isCurrNull || isNextNull ? '#D84227' : undefined;

      out.push({ time: date, visitors: val, color });
      i++;
    }
  }
  return out;
}

export async function fetchAI(
  userPrompt: string,
  chart: ChartComponent,
  chartState: any,
  originalData: ChartPoint[],
): Promise<any> {
  const schema = generateChartSchema('Chart');

  const systemPrompt = `
You help clean hourly website visitors data for a Syncfusion Chart.
Return ONLY cleaned lines in "yyyy-MM-dd-HH-m-ss:Value" format (no extra text).
We will set series[0].dataSource from your lines.
Do not modify chart configuration.

Current chart state: ${JSON.stringify(chartState)}
Schema (for reference): ${JSON.stringify(schema)}
`;

  const aiOutput = await serverAIRequest({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  if (!aiOutput) {
    return { props: {}, explanation: 'Empty AI output', confidence: 0 };
  }

  const cleanedText =
    aiOutput.includes('```') ? aiOutput.split('```')[1].trim() : aiOutput.trim();

  const parsed = parseCleanedLines(cleanedText, originalData);

  return {
    props: {
      series: [{ dataSource: parsed }]
    },
    includedProps: ['DataSource'],
    ignoreProps: schema.ignoreProps.default,
    explanation: 'Filled missing values & resolved outliers in dataSource.',
    confidence: 0.95,
  };
}
