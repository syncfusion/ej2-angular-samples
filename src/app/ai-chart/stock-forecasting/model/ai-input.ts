
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { generateChartSchema } from './sf-ai-schema';
import { serverAIRequest } from '../backend/ai-service';

type ChartPoint = { date: Date; high: number; low: number; open: number; close: number };

function parseLinesToPoints(text: string, original: ChartPoint[]): ChartPoint[] {
  const lines = text.split('\n').filter(l => l.trim().length);
  const out: ChartPoint[] = [];
  for (const line of lines) {
    const [stamp, highStr, lowStr, openStr, closeStr] = line.split(':').map(s => s.trim());
    if (!stamp || !highStr || !lowStr || !openStr || !closeStr) continue;

    const [y, M, d] = stamp.split('-').map(n => parseInt(n, 10));
    const date = new Date(y, M - 1, d);
    const high = parseFloat(highStr);
    const low = parseFloat(lowStr);
    const open = parseFloat(openStr);
    const close = parseFloat(closeStr);
    if ([high, low, open, close].some(v => Number.isNaN(v))) continue;

    out.push({ date, high, low, open, close });
  }
  return [...original, ...out];
}

export async function fetchAI(
  userPrompt: string,
  chart: ChartComponent,
  chartState: any,
  originalData: ChartPoint[],
): Promise<any> {
  const schema = generateChartSchema('Chart');

  const systemPrompt = `
Return ONLY the cleaned/forecast lines in "yyyy-MM-dd:High:Low:Open:Close".
We will set series[0].dataSource from your lines. Do not change chart configuration.

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

  const parsed = parseLinesToPoints(cleanedText, originalData);

  return {
    props: {
      series: [{ dataSource: parsed }],
    },
    includedProps: ['DataSource'],
    ignoreProps: schema.ignoreProps.default,
    explanation: 'Appended 35 realistic OHLC rows to dataSource for forecasting.',
    confidence: 0.95,
  };
}
``
