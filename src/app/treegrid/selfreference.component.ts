import { Component, OnInit } from '@angular/core';
import { projectData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'selfreference.html'
})
export class SelfReferenceComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = projectData;
    }
}