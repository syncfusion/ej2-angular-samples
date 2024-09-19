import { Component, ViewChild, TemplateRef, Inject } from '@angular/core';
import { GridAllModule, GridComponent, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { predictiveData, predictive } from './grid-data';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
  selector: 'app-predictive-dataentry',
  standalone: true,
  imports: [GridAllModule],
  templateUrl: './predictive-dataentry.component.html',
  styleUrl: './predictive-dataentry.component.css'
})
export class PredictiveDataentryComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-predictive-dataentry.component.html',
      'predictive-dataentry.component.css',
    ];
  }
  @ViewChild('grid', { static: true }) grid!: GridComponent;
  @ViewChild('toolbarTemplate', { static: true }) toolbarTemplate!: TemplateRef<any>;
  public toolbar: any;
  public gridData: predictive[] = predictiveData;
  ngOnInit() {
    this.toolbar = [{ template: this.toolbarTemplate }];
  }

  CalculateGrade() {
    this.grid.showSpinner();
    this.ExecutePrompt();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ExecutePrompt() {
    const prompt: string = 'Final year GPA column should updated based on GPA of FirstYearGPA, SecondYearGPA and ThirdYearGPA columns. Total GPA should update based on average of all years GPA. Total Grade update based on total GPA. Updated the grade based on following details, 0 - 2.5 = F, 2.6 - 2.9 = C, 3.0 - 3.4 = B, 3.5 - 3.9 = B+, 4.0 - 4.4 = A, 4.5 - 5 = A+. average value decimal should not exceed 1 digit.';
    const gridReportJson: string = JSON.stringify(this.grid.dataSource);
    const userInput: string = this.generatePrompt(gridReportJson, prompt);
    let aiOutput: any = getAzureChatAIRequest({ messages: [{ role: 'user', content: userInput }] });
    aiOutput.then((result: any) => {
      result = result.replace('```json', '').replace('```', '');
      const generatedData: predictive[] = JSON.parse(result);
      this.grid.hideSpinner();
      if (generatedData.length) {
        this.grid.showColumns(['Final Year GPA', 'Total GPA', 'Total Grade']);
        this.updateRows(generatedData);
      }
    });
  }

  async updateRows(generatedData: predictive[]) {
    await this.delay(300);
    for (let i: number = 0; i < generatedData.length; i++) {
      const item = generatedData[i];
      this.grid.setRowData(item.StudentID, item);
      await this.delay(300);
    }
  }

  CustomizeCell(args: QueryCellInfoEventArgs) {
    if (args.column!.field === 'FinalYearGPA' || args.column!.field === 'TotalGPA') {
      if ((args.data as predictive).FinalYearGPA! > 0) {
        args.cell!.classList.add('e-PredictiveColumn');
      }
      else if ((args.data as predictive).TotalGPA! > 0) {
        args.cell!.classList.add('e-PredictiveColumn');
      }
    }
    if (args.column!.field === 'TotalGrade') {
      if ((args.data as predictive).TotalGPA! <= 2.5) {
        args.cell!.classList.add('e-inactivecolor');
      }
      else if ((args.data as predictive).TotalGPA! >= 4.5) {
        args.cell!.classList.add('e-activecolor');
      }
      else if ((args.data as predictive).TotalGPA! > 0) {
        args.cell!.classList.add('e-PredictiveColumn');
      }
    }
  }

  generatePrompt(data: string, userInput: string): string {
    return `Given the following datasource are bounded in the Grid table\n\n${data}.\n Return the newly prepared datasource based on following user query:  ${userInput}\n\nGenerate an output in JSON format only and Should not include any additional information or contents in response`;
  }

}
