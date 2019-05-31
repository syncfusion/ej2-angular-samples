import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { compile, detach } from '@syncfusion/ej2-base';
import { cardBook } from './data-source';
import { MultiSelect, SelectEventArgs, RemoveEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
/**
 * Default Card Component
 */
// tslint:disable:max-line-length
interface FilterKey {
    Code: string;
}
let card: NodeList; let cardEle: HTMLElement; let cardObj: JSON[] = cardBook as JSON[]; let data: Object[] = []; let multiSelectData: Object[] = []; let searchData: Object[] = [];
let searchValCount: number = 0; let filterCategory: { [key: string]: Object; }[] = [{ Name: 'Client-Side', Code: 'client' }, { Name: 'Server-Side', Code: 'server' }, { Name: 'Front-End', Code: 'ui' }];
let emptyData: boolean = true;

/*  Initialize MultiSelect component */
let multiselectComp: MultiSelect;

@Component({
    selector: 'control-content',
    templateUrl: 'tile.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TileViewCardComponent {
    public DataList: any = [];
    public ngOnInit(): void {
        this.DataList = cardBook;  
    }
    ngAfterViewInit(): void {
        multiselectComp = new MultiSelect({
            // set the local data to dataSource property
            dataSource: filterCategory,
            // map the appropriate columns to fields property
            fields: { text: 'Name', value: 'Code' },
            // set the placeholder to MultiSelect input element
            placeholder: 'Search by categories',
            select: this.multiSelectFun.bind(this),
            removed: this.multiSelectRemove.bind(this),
        });
        multiselectComp.appendTo('#local');
        this.cardRendering(cardObj);
        document.getElementById('search_Card').onkeyup = (e: KeyboardEvent) => {
            if (e.code === 'Tab' || e.code === 'Escape' || e.code === 'ShiftLeft' || (e.code === 'Backspace' && emptyData)) {
                return;
            }
            let inputVal: string = (e.target as HTMLInputElement).value;
            inputVal.length === 0 ? emptyData = true : emptyData = false;
            this.searchFilter(inputVal);
        };
    }
    /* Remove event function for multiSelect component */
    public multiSelectRemove(e: RemoveEventArgs): void {
        let cardDa: Object[] = searchData.length > 0 ? searchData : (multiSelectData.length > 0 ? multiSelectData : cardObj);
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = cardDa; 
            this.cardRendering(cardObj);
        } else if (multiselectComp.value.length === 0 && searchValCount > 0) {
            this.searchFilter((document.getElementById('search_Card') as HTMLInputElement).value);
        } else if (multiselectComp.value.length === 0) {
            multiSelectData = cardDa;
            this.cardRendering(cardDa);
        } else {
            let keywords: string[] = (e.itemData as FilterKey).Code.split(',');
            let dublicate: Object[];
            keywords.forEach((key: string): void => {
                dublicate = new DataManager(cardObj as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
                dublicate.forEach((da: Object): void => {
                    if (cardDa.indexOf(da) !== -1) {
                        cardDa.splice(cardDa.indexOf(da), 1);
                    }
                });
                multiSelectData = cardDa;
            });
            this.cardRendering(multiSelectData);
        }
    }

    public multiSelectFun(e: SelectEventArgs): void {
        let keywords: string[] = (e.itemData as FilterKey).Code.split(','); let dublicate: Object[];
        let cardDa: Object[] = searchData.length > 0 ? searchData : cardObj;
        if (multiselectComp.value && multiselectComp.value.length === 0 && searchValCount === 0) {
            multiSelectData = [];
        }
        keywords.forEach((key: string): void => {
            dublicate = new DataManager(cardDa as JSON[]).executeLocal(new Query().where('cardImage.tag', 'Contains', key, true));
            if (dublicate.length === 0) {
                multiSelectData = [];
                return;
            }
            dublicate.forEach((da: Object): void => {
                if (multiSelectData.indexOf(da) === -1) {
                    multiSelectData.push(da);
                }
            });
        });
        this.cardRendering(multiSelectData);
    }
    /* Function for Filtering Cards */
    public searchFilter(key: string): void {
        searchValCount = key.length;
        let predicate: Predicate = new Predicate('cardContent', 'Contains', key, true);
        predicate = predicate.or('cardImage.title', 'Contains', key, true).or('header_title', 'Contains', key, true).or('header_subtitle', 'Contains', key, true);
        let cardDa: Object[] = (multiSelectData.length > 0 && multiselectComp.value.length > 0) ? multiSelectData : cardObj;
        searchData = data = new DataManager(cardDa as JSON[]).executeLocal(new Query().where(predicate)); 
        this.cardRendering(data);
    }
    public cardRendering(cardObj: Object[]): void {
        let errorContent: HTMLElement = document.querySelector('.tile_layout .row.error') as HTMLElement;
        if (cardObj.length > 0) {
            errorContent.style.display = 'none';
            this.DataList = cardObj;
        } else {
            this.DataList = [];
            errorContent.style.display = 'flex';
        }
    }
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}