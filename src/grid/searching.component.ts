import { Component, OnInit, Inject } from '@angular/core';
import { categoryData } from './data';

@Component({
    selector: 'ej-gridsearch',
    templateUrl: 'searching.html',
    styleUrls: ['search.style.css']
})
export class SearchComponent implements OnInit {
    public data: Object[];

    public ngOnInit(): void {
        this.data = categoryData;
    }
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['search.style.css'];
    }

}