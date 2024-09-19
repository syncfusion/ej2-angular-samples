import { Component, Inject, ViewChild } from '@angular/core';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilderComponent, QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { TabAllModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { GridModule, GridComponent } from '@syncfusion/ej2-angular-grids';
import { getAzureChatAIRequest } from '../../azure-openai';
@Component({
  selector: 'app-nl-query',
  standalone: true,
  templateUrl: './natural-language-query.component.html',
  styleUrl: './natural-language-query.component.css',
  imports: [QueryBuilderModule, GridModule, ButtonModule, TabAllModule]
})
export class NlQueryComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-natural-language-query.component.html',
      'natural-language-query.component.css',
    ];
  }
  @ViewChild('querybuilder') qryBldrObj!: QueryBuilderComponent;
  @ViewChild('grid') gridObj!: GridComponent;
  @ViewChild('tabDefault') tabDefault!: TabComponent;
  headerText: any = [{ text: 'Natural Language Query' }, { text: 'Query Builder UI' }];

  tabCreated(): void {
    this.tabDefault.select(1);
    this.tabDefault.select(0);
  }

  generateRandomUsers(count: number): object[] {
    const names: string[] = ["John", "Jane", "Bob", "Alice", "Tom", "Sally", "Jim", "Mary", "Peter", "Nancy"];
    const cities: string[] = ["Los Angeles", "San Diego", "New York", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "Dallas", "San Jose"];
    const states: string[] = ["California", "New York", "Illinois", "Texas", "Arizona", "Pennsylvania"];
    const streets: string[] = ["Elm St", "Oak St", "Maple Ave", "Pine St", "Cedar St", "Birch St"];
    const emails: string[] = ["example.com", "test.com", "demo.com"];
    const users: object[] = [];

    for (let i = 0; i < count; i++) {
      const id: number = i + 1;
      const name: string = names[Math.floor(Math.random() * names.length)];
      const email: string = `${name.toLowerCase()}${id}@${emails[Math.floor(Math.random() * emails.length)]}`;
      const address: string = `${Math.floor(Math.random() * 10000)} ${streets[Math.floor(Math.random() * streets.length)]}`;
      const city: string = cities[Math.floor(Math.random() * cities.length)];
      const state: string = states[Math.floor(Math.random() * states.length)];
      const zipcode: string = `${Math.floor(10000 + Math.random() * 90000)}`;
      const credits: number = Math.floor(Math.random() * 2001);
      users.push({ id, name, email, address, city, state, zipcode, credits });
    }

    return users;
  }
  users: object[] = this.generateRandomUsers(20);

  gridCreated(): void {
    createSpinner({
      target: document.getElementById('grid') as HTMLElement
    });
  }

  generateQuery(): void {
    showSpinner(document.getElementById('grid') as HTMLElement);
    let textArea = `Given the following input: "write SQL query to` + (document.querySelector('#text-area') as any).value + `I need to get sql query without changing the given values", generate an SQL query that matches the requirement similar to the example output. The output should be in the format: "SELECT * FROM user WHERE credits > 100".`;
    let aiOutput = getAzureChatAIRequest({ messages: [{ role: 'user', content: textArea }] });
    aiOutput.then((result) => {
      if (result?.indexOf("```sql") !== -1) {
        result = (result as any).split("```sql")[1]
      }
      let val: string = (result as any).split("WHERE ")[1].split(";\n")[0];
      val = val.replace("\n", "");
      this.qryBldrObj.setRulesFromSql(val);
      let predicate: Predicate = this.qryBldrObj.getPredicate(this.qryBldrObj.getValidRules());
      let query: Query;
      if (isNullOrUndefined(predicate)) {
        query = new Query();
      } else {
        query = new Query().where(predicate);
      }
      this.gridObj.query = query;
      this.gridObj.refresh();
      hideSpinner(document.getElementById('grid') as HTMLElement);
    });
  }
}
