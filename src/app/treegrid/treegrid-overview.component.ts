import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { countries } from './jsontreegriddata';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { addClass } from '@syncfusion/ej2-base';
import { TreeGridModule, SortService, FilterService, ReorderService, ITreeData } from '@syncfusion/ej2-angular-treegrid';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'treegrid-overview.html',
    styleUrls: ['treegrid-overview.css'],
    providers: [FilterService, SortService, ReorderService],
    encapsulation: ViewEncapsulation.None
})
export class TreeGridOverviewComponent implements OnInit {
    public data: Object[] = [];
    public filterSettings: Object;

    ngOnInit(): void {
        this.data = countries;
        this.filterSettings = {type: 'Excel'};
    }

    queryCellInfo(args: QueryCellInfoEventArgs): void {
        if (args.column.field === 'gdp') {
            if (args.data[args.column.field] < 2) {
                args.cell.querySelector('.statustxt').classList.add('e-lowgdp');
                args.cell.querySelector('.statustemp').classList.add('e-lowgdp');
            }
        }
        if (args.column.field === 'unemployment') {
            if (args.data[args.column.field] <= 4) {
                addClass([args.cell.querySelector('.bar')], ['progressdisable']);
            }
            (args.cell.querySelector('.bar')as HTMLElement).style.width = args.data[args.column.field] * 10 + '%';
            args.cell.querySelector('.barlabel').textContent = args.data[args.column.field] + '%';
        }
        if (args.column.field === 'name') {
            let imgElement: HTMLElement = document.createElement('IMG');
            let val: string = !(<ITreeData>args.data).level ? args.data[args.column.field] :
                 (<ITreeData>args.data).parentItem[args.column.field];
            imgElement.setAttribute('src', 'source/treegrid/images/' + val + '.png');
            imgElement.classList.add('e-image');
            let div: HTMLElement = document.createElement('DIV');
            div.style.display = 'inline-block';
            div.appendChild(imgElement);
            let cellValue: HTMLElement = document.createElement('DIV');
            cellValue.innerHTML = args.cell.querySelector('.e-treecell').innerHTML;
            cellValue.setAttribute('style', 'display:inline-block;padding-left:6px');
            args.cell.querySelector('.e-treecell').innerHTML = '';
            args.cell.querySelector('.e-treecell').appendChild(div);
            args.cell.querySelector('.e-treecell').appendChild(cellValue);
        }
    }

    populationValue(field: string, data: Object): number {
        return data[field] / 1000000;
    }

}
