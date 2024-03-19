import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { SkeletonModule } from '@syncfusion/ej2-angular-notifications';
import { NgIf, NgFor } from '@angular/common';

/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'animation.html',
    styleUrls: ['animation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, SkeletonModule, NgFor, ListViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class AnimationController {
 
    ngOnInit() {
        this.loadData();
    }

    public profileimage:string ="image e-avatar";
    public postimage:string ="image";
    public cardname: string ="";
    public time: string = "";
    public listData:  { [key: string]: string; }[] = [];

    public isDataLoading = true;
    
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['animation.css'];
    }

    public getData():Promise<{ [key: string]: any; }> {
        return new Promise(resolve => setTimeout(() => {
            let data: { [key: string]: any; }={};
            data['list-data'] = [
                { text: "Jenifer", contact: "(206) 555-985774", id: "1", avatar: "", pic: "pic01" },
                { text: "Amenda", contact: "(206) 555-3412", id: "2", avatar: "A", pic: "" },
                { text: "Isabella", contact: "(206) 555-8122", id: "4", avatar: "", pic: "pic02" },
                { text: "William ", contact: "(206) 555-9482", id: "5", avatar: "W", pic: "" },
                { text: "Jacob", contact: "(71) 555-4848", id: "6", avatar: "", pic: "pic04" },
                { text: "Matthew", contact: "(71) 555-7773", id: "7", avatar: "M", pic: "" },
                { text: "Oliver", contact: "(71) 555-5598", id: "8", avatar: "", pic: "pic03" },
                { text: "Charlotte", contact: "(206) 555-1189", id: "9", avatar: "C", pic: "" }
            ];
            data['profileImg'] = "image profile-image e-avatar";
            data['postImg']  = "image post-image";
            data['postName'] = "Laura Callahan";
            data['postDate'] = new Date().toLocaleString();
            resolve(data)
        }, 3000));
    }
 
    public loadData():void {
        this.getData().then((data:{ [key: string]: any; }) => {
            this.profileimage = data['profileImg'] as string; ;
            this.postimage=data['postImg'] as string; ;
            this.cardname=data['postName'] as string;;
            this.time=data['postDate'] as string;
            this.listData = data['list-data'] as { [key: string]: string; }[];
            this.isDataLoading = false;
        });
    }

    // Reload button click event handler.
    public reload():void {
        if (!this.isDataLoading) {
            this.isDataLoading = true;
            this.profileimage = "image e-avatar" ;
            this.postimage="image"  ;
            this.cardname="";
            this.time="";
            this.listData =[];
            this.loadData();
        }
    };

}
