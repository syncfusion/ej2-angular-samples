import { Component, ViewChild, TemplateRef, Inject } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { GridAllModule, GridComponent } from '@syncfusion/ej2-angular-grids';
import { MedicalRecord, MedicalRecords } from './grid-data';
import { Query, Predicate } from "@syncfusion/ej2-data";
import { embeddingModel, cosineSimilarity } from '../../embedding-model';

@Component({
  selector: 'app-semantic-search',
  standalone: true,
  imports: [GridAllModule, TextBoxModule],
  templateUrl: './semantic-search.component.html',
  styleUrl: './semantic-search.component.css'
})
export class SemanticSearchComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-semantic-search.component.html',
      'semantic-search.component.css',
    ];
  }
  @ViewChild('grid', { static: true }) grid!: GridComponent;
  @ViewChild('textbox', { static: true }) textbox!: TextBoxComponent;
  @ViewChild('toolbarTemplate', { static: true }) toolbarTemplate!: TemplateRef<any>;
  public machineDataList: MedicalRecord[] = MedicalRecords
  public toolbar: any;
  public productEmbeddings: { [key: string]: number[] } = {};
  
  ngOnInit () {
    this.toolbar = [{ template: this.toolbarTemplate }];
  }
  generatePredicate(filteredData: MedicalRecord[]) {
    let predicates: Predicate[] = [];
    for (let i: number = 0; i < filteredData.length; i++) {
      predicates.push(new Predicate('Symptoms', 'contains', filteredData[i].Symptoms));
    }
    return Predicate.or(predicates);
  }
  async getEmbeddingsData() {
    for (let record of MedicalRecords) {
      let data: number[] = (await embeddingModel(
        record.DoctorDetails + ' ' + record.PatientID + ' ' + record.Symptoms + ' ' + record.Diagnosis
      )) as number[];
      this.productEmbeddings[record.RecordID] = data;
    }
  }
  async ExecutePrompt(searchValue: string) {
    let queryVector: any = await embeddingModel(searchValue);
    const similarityThreshold: number = 0.8;
    const outputData = MedicalRecords.filter((record: any) => {
      const similarity = cosineSimilarity(
        this.productEmbeddings[record.RecordID],
        queryVector
      );
      if (similarity > similarityThreshold) {
        return record;
      }
    });
    this.grid.hideSpinner();
    if (outputData.length > 0) {
      this.grid.query = new Query().where(this.generatePredicate(outputData));
    } else {
      this.grid.query = new Query().take(0);
    }
  }
  public created(): void {
    this.getEmbeddingsData();
  }

  smartSearch() {
    let searchEle: HTMLInputElement = this.grid.element.querySelector('#semantic-grid input.e-textbox')!;
      if (searchEle) {
        let searchValue: string = searchEle.value.trim();
        if (searchValue) {
          this.grid.showSpinner();
          this.ExecutePrompt(searchValue);
        } else {
          this.grid.query = new Query();
        }

      }
    
  }
}
