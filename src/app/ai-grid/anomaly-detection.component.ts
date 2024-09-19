import { Component, Inject, ViewChild } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import {
  GridAllModule,
  GridComponent,
  QueryCellInfoEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { MachineData, machineDataList } from './grid-data';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
  selector: 'app-anomaly-detection',
  standalone: true,
  imports: [GridAllModule],
  templateUrl: './anomaly-detection.component.html',
  styleUrls: ['./anomaly-detection.component.css'],
})
export class AnomalyDetectionComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-anomaly-detection.component.html',
      'anomaly-detection.component.css',
    ];
  }
  @ViewChild('toolbarTemplate', { static: true }) toolbarTemplate: any;
  @ViewChild('grid', { static: true }) grid!: GridComponent;

  public machineDb: MachineData[] = machineDataList;
  public toolbarOptions!: any[];
  public aiGeneratedData: MachineData[] = [];

  ngOnInit(): void {
    this.toolbarOptions = [{ template: this.toolbarTemplate }];
  }

  generatePrompt(data: string): string {
    return `Given the following datasource are bounded in the Grid table\n\n${data}.\n Return the anomaly data rows (ie. pick the ir-relevant datas mentioned in the corresponding table) present in the table mentioned above as like in the same format provided do not change the format. Example: Watch out the production rate count and the factors that is used to acheive the mentioned production rate(Temprature, Pressure, Motor Speed) If the production rate is not relevant to the concern factors mark it as anomaly Data. If it is anomaly data then due to which column data it is marked as anomaly that particular column name should be updated in the AnomalyFieldName. Also Update the AnomalyDescription stating that due to which reason it is marked as anomaly a short description. Example if the data is marked as anomaly due to the Temperature column, Since the mentioned temperature is too high than expected, it is marked as anomaly data.\n\nGenerate an output in JSON format only and Should not include any additional information or contents in response`;
  }

  detectAnomaly(): void {
    this.grid.showSpinner();
    this.detectAnomalyData();
  }

  detectAnomalyData(): void {
    const gridReportJson: string = JSON.stringify(this.grid.dataSource);
    const userInput: string = this.generatePrompt(gridReportJson);
    let aiOutput: any = getAzureChatAIRequest({
      messages: [{ role: 'user', content: userInput }],
    });

    aiOutput.then((result: any) => {
      result = result.replace('```json', '').replace('```', '');
      this.aiGeneratedData = JSON.parse(result);
      this.grid.hideSpinner();

      if (this.aiGeneratedData.length) {
        this.grid.showColumns(['Anomaly Description']);
        for (let i: number = 0; i < this.aiGeneratedData.length; i++) {
          const item = this.aiGeneratedData[i];
          this.grid.setRowData(item.MachineID, item);
        }
      }
    });
  }

  customizeCell(args: QueryCellInfoEventArgs): void {
    if (this.aiGeneratedData != null && this.aiGeneratedData.length > 0) {
      let isAnomalyData: boolean = false;
      this.aiGeneratedData.map((e: any) => {
        if (
          !isNullOrUndefined(e.AnomalyFieldName) &&
          e.MachineID === (args.data as MachineData).MachineID &&
          (e.AnomalyFieldName === args.column?.field ||
            args.column?.field === 'AnomalyDescription')
        ) {
          isAnomalyData = true;
        }
      });

      if (isAnomalyData) {
        args.cell?.classList.add('anomaly-cell');
        args.cell?.classList.remove('normal-cell');
      }
    } else if (args.column?.field === 'AnomalyDescription') {
      args.cell?.classList.add('normal-cell');
    }
  }
}
