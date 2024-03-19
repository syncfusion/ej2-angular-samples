/**
 * ListView Virtualization Sample
 */

import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListView, ScrolledEventArgs } from '@syncfusion/ej2-lists';
import { foodData, foodItems } from './dataSource';
import { Rating } from '@syncfusion/ej2-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'scrolling.html',
    styleUrls: ['scrolling.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ListViewAllModule, NgIf, SBDescriptionComponent]
})

export class ScrollingListViewComponent {
    @ViewChild('listviewInstance')
    public listviewInstance: ListView;
    public dataSource: object = foodData;
    public cssClass: string = 'e-list-template';
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['scrolling.css'];
    }
    isMobile: boolean;
    count: number = 0;
    public ngOnInit() {
        this.isMobile = window.matchMedia('(max-width:550px)').matches;
    }

    onListScroll(args: ScrolledEventArgs): void {
        var newData = [];
        if (args.scrollDirection === "Bottom") {
            if (args.distanceY < 100) {
                for (var i = 0; i <= foodItems .length - 1; i++) {
                   var newId = (this.listviewInstance as any).getUniqueID('list');
                   newData.push({ text: foodItems[i].text, id: newId, price: foodItems[i].price, src: foodItems[i].src, description: foodItems[i].description, type: foodItems[i].type });
                }
                this.listviewInstance.addItem(newData);
                let newElements = this.listviewInstance.element.querySelectorAll('.ratings');
                for (let i = this.count; i < newElements.length; i++) {
                    newElements[i].setAttribute('id', 'rating' + i);
                    let ratingObj_1: Rating = new Rating({
                        value: foodItems[i - this.count].rating as number,
                        showTooltip: false,
                        readOnly: true
                    });
                    ratingObj_1.appendTo('#' + newElements[i].id);
                }
                this.count = newElements.length;
            }
        }
    }
    onActionComplete(args) {
      if(!this.isMobile){
        let ratingElements = this.listviewInstance.element.querySelectorAll('.ratings');
        for (let i = 0; i < args.data.length; i++) {
            ratingElements[i].setAttribute('id', 'rating' + i);
            let ratingObj: Rating = new Rating({
                value: args.data[i].rating as number,
                showTooltip: false,
                readOnly: true
            });
            ratingObj.appendTo('#' + ratingElements[i].id);
        }
        this.count=args.data.length;
      }
    }
}
