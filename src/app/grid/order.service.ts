import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataStateChangeEventArgs, Sorts, DataResult } from '@syncfusion/ej2-angular-grids'
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdersService extends Subject<DataStateChangeEventArgs> {
    private BASE_URL = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders'; 

    constructor(private http: Http) {
        super();
    }

    public execute(state: any): void {
        this.getData(state).subscribe(x => super.next(x));
    }

    protected getData(state: DataStateChangeEventArgs): Observable<DataStateChangeEventArgs> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';

        if ((state.sorted || []).length) {
            sortQuery = `&$orderby=` + state.sorted.map((obj: Sorts) => {
                return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
            }).reverse().join(',');
        }

        return this.http 
           .get(`${this.BASE_URL}?${pageQuery}${sortQuery}&$inlinecount=allpages&$format=json`) 
           .pipe(map((response: any) => response.json()))
           .pipe(map((response: any) => (<DataResult>{
                result: response['d']['results'],
                count: parseInt(response['d']['__count'], 10)
        })))
        .pipe((data: any) => data);
    }
}
