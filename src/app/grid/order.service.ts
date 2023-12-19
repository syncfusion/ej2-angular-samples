import { Injectable } from '@angular/core';
import { Sorts, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrdersService extends Subject<DataStateChangeEventArgs> {
    private BASE_URL =
        'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';

    constructor() {
        super();
    }

    public execute(state: any): void {
        this.getData(state).subscribe((x) => super.next(x));
    }

    protected getData(
        state: DataStateChangeEventArgs
    ): Observable<DataStateChangeEventArgs> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';

        if ((state.sorted || []).length) {
            sortQuery =
                `&$orderby=` +
                state.sorted
                    .map((obj: Sorts) => {
                        return obj.direction === 'descending'
                            ? `${obj.name} desc`
                            : obj.name;
                    })
                    .reverse()
                    .join(',');
        }

        return this.fetchData(
            `${this.BASE_URL}?${pageQuery}${sortQuery}&$count=true`
        ).pipe(
            map((response: any) => {
                const result = response['value'];
                const count = response['@odata.count'];
                return { result, count } as DataStateChangeEventArgs;
            })
        );
    }

    private fetchData(url: string): Observable<any> {
        return new Observable((observer) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    observer.next(data);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }
}
