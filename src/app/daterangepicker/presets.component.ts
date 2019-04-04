import { Component, ViewEncapsulation, Inject } from '@angular/core';
@Component({
    selector: 'control-content',
    styleUrls: ['presets-style.css'],
    templateUrl: 'presets.html',
    encapsulation: ViewEncapsulation.None
})
export class PresetsComponent {
	
    public today: Date = new Date(new Date().toDateString());
    public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
        ;
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd: Date = this.today;
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd: Date = this.today;
    public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
    public yearEnd: Date = this.today;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['presets-style.css'];
    }

}