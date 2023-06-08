import { Component, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
/**
 * Default ListBox sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateListBoxComponent {
    // dataSource definition
    public data: { [key: string]: Object }[];
    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit():void{
            this.cdr.detectChanges();
            this.data = [
                { text: 'JavaScript', pic: 'javascript', description: 'It is a lightweight interpreted or JIT-compiled programming language.' },
                { text: 'TypeScript', pic: 'typescript', description: 'It is a typed superset of Javascript that compiles to plain JavaScript.' },
                { text: 'Angular', pic: 'angular', description: 'It is a TypeScript-based open-source web application framework.' },
                { text: 'React', pic: 'react', description: 'A JavaScript library for building user interfaces. It can also render on the server using Node.' },
                { text: 'Vue', pic: 'vue', description: 'A progressive framework for building user interfaces. it is incrementally adoptable.' }
            ];
        
    }
}