import { Component, Inject } from '@angular/core';

/**
 * 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls:['listview.css']
})
export class RTLListViewComponent {

    public rtl: Boolean = true;

    public data: Object[] = [
        { text: 'الجیریا' },
        { text: 'ارمینیا' },
        { text: 'بنگلا دیش' },
        { text: 'کیوبا' },
        { text: 'فن لینڈ' },
        { text: 'بھارت' },
        { text: 'مصر' },
        { text: 'ڈنمارک' },
        { text: 'ملائیشیا' },
        { text: 'نیوزی لینڈ' },
        { text: 'ناروے' }
    ];
    
    public headerTitle: string = 'اسم الدولة';
    
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }
}