import { Component, OnInit, ViewChild } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'conditionalformatting.html'
})
export class ConditionalFormattingComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
    }

    queryCellInfo (args: QueryCellInfoEventArgs) {
        if (args.cell.innerHTML === 'High') {
            let x: HTMLElement = document.createElement('IMG');
            x.setAttribute('src', 'src/treegrid/images/up.png');
            x.setAttribute('height', '15px');
            x.setAttribute('style', 'padding-left:20px;');
            args.cell.appendChild(x);
          } else if (args.cell.innerHTML === 'Critical') {
           let y: HTMLElement = document.createElement('IMG');
           y.setAttribute('src', 'src/treegrid/images/down.png');
           y.setAttribute('height', '15px');
           y.setAttribute('style', 'padding-left:20px;');
           args.cell.appendChild(y);
          } else if (args.cell.innerHTML === 'Low') {
           let z: HTMLElement = document.createElement('IMG');
           z.setAttribute('src', 'src/treegrid/images/low.png');
           z.setAttribute('height', '15px');
           z.setAttribute('style', 'padding-left:10px;');
           args.cell.appendChild(z);
          } else if (args.cell.innerHTML === 'Normal') {
           let a: HTMLElement = document.createElement('IMG');
           a.setAttribute('src', 'src/treegrid/images/normal.png');
           a.setAttribute('height', '15px');
           a.setAttribute('style', 'padding-left:10px;');
           args.cell.appendChild(a);
          } else if (+args.cell.innerHTML > 90 && +args.cell.innerHTML <= 100 && args.column.field === 'progress') {
             args.cell.setAttribute('style', 'background-color:#336c12;color:white;');
          } else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
               args.cell.setAttribute('style', 'background-color:#7b2b1d;color:white;');
          }
    }
}
