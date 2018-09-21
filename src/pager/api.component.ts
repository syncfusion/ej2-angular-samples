import { Component, ViewChild, OnInit } from '@angular/core';
import { PagerComponent } from '@syncfusion/ej2-angular-grids';
@Component({
    templateUrl: 'api.html'
})
export class ApiComponent implements OnInit {
    public pagesize: number;
    public pagecount: number;
    public recordscount: number;
    public pageSize: HTMLInputElement;
    public pageCount: HTMLInputElement;
    public currentPage: HTMLInputElement;
    public totalrec: HTMLInputElement;
    @ViewChild('pager')
    public pager: PagerComponent;

    ngOnInit(): void {
        this.pagesize = 1;
        this.pagecount = 5;
        this.recordscount = 20;
        this.pageSize = document.getElementById('pagesize') as HTMLInputElement;
        this.pageCount = document.getElementById('pagecount') as HTMLInputElement;
        this.currentPage = document.getElementById('pageno') as HTMLInputElement;
        this.totalrec = document.getElementById('totalrecords') as HTMLInputElement;
    }


    public click(args: any): void {
        if (args.currentPage != null && args.currentPage !== 'undefined') {
            this.currentPage.value = args.currentPage;
        }
    }
    public count(args: any): void {
        if (args.target.value < 10) {
            this.pager.pageCount = parseInt(this.pageCount.value, 10);
        } else {
            this.pager.pageCount = 10;
            this.pageCount.max = '10';
        }
    };
    public cpage(): void {
        this.pager.currentPage = parseInt(this.currentPage.value, 10);
        this.calc(this.pager.totalRecordsCount, this.pager.pageSize, this.currentPage);
        this.pager.currentPage = parseInt(this.currentPage.value, 10);
    };
    public size(): void {
        this.pager.pageSize = parseInt(this.pageSize.value, 10);
        this.calc(this.pager.totalRecordsCount, this.pager.pageSize, this.currentPage);
        this.pager.currentPage = parseInt(this.currentPage.value, 10);
        this.calc(this.pager.totalRecordsCount, this.pager.pageSize, this.pageCount);
        this.pager.pageCount = parseInt(this.pageCount.value, 10);
    };
    public totalrecords(): void {
        this.pager.totalRecordsCount = parseInt(((<HTMLInputElement>document.querySelector('#totalrecords')).value), 10);
        this.calc(this.pager.totalRecordsCount, this.pager.pageSize, this.currentPage);
        this.pager.currentPage = parseInt(this.currentPage.value, 10);
        this.calc(this.pager.totalRecordsCount, this.pager.pageSize, this.pageCount);
        this.pager.pageCount = parseInt(this.pageCount.value, 10);
    };
    public calc(tot: number, size: number, ele: HTMLInputElement): void {
        let totalPages: number = Math.ceil(tot % size) === 0 ? Math.ceil(tot / size) : Math.ceil(tot / size) + 1;
        ele.max = totalPages.toString();
        ele.value = parseInt(ele.value, 10) > parseInt(ele.max, 10) ? ele.max : ele.value;
    }
}
