import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Service to handle data operations for the Tree Grid.
 * It extends Subject to act as an observable for data state changes.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService extends Subject<DataStateChangeEventArgs> {
  private BASE_URL =
    'https://services.syncfusion.com/angular/production/api/SupportTicketData';
  constructor() {
    super();
  }


  // Executes the data operation based on the provided grid state.
  public execute(state: any): void {
    if (state.requestType === 'expand') {
      this.getChildData(state).subscribe((childRecords: any) => {
        state.childData = childRecords.result;
        state.childDataBind();
      });
    } else {
      this.getData(state).subscribe((x) => super.next(x));
    }

  }

  // Fetches child records for a given parent record when a row is expanded.
  public getChildData(state: any): Observable<DataStateChangeEventArgs> {
    return this.fetchData(
      `${this.BASE_URL}?$filter=ParentTicketID%20eq%20${state.data.TicketID}`
    ).pipe(
      map((response: any) => {
        const parentId = state.data.id;
        const result = response['result'];
        const count = response['count'];
        return { result, count } as DataStateChangeEventArgs;
      })
    );
  }

  // Fetches the main data based on the provided treegrid state (paging, sorting, filtering).
  protected getData(state: any): Observable<DataStateChangeEventArgs> {
    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    let sortQuery: string = '';
    let filterQuery: string = '';
    if (state.where) {
      filterQuery = this.buildFilterQuery(state.where);
    } else {
      filterQuery = "$filter=ParentTicketID eq null";
    }
    if (state.search) {
      filterQuery += this.buildSearchQuery(state.search);
    }
    if ((state.sorted || []).length) {
      sortQuery =
        `&$orderby=` +
        state.sorted
          .map((obj: any) => {
            return obj.direction === 'descending'
              ? `${obj.name} desc`
              : obj.name;
          })
          .reverse()
          .join(',');
    }

    return this.fetchData(
      `${this.BASE_URL}?$inlinecount=allpages&${pageQuery}&${filterQuery}&${sortQuery}`
    ).pipe(
      map((response: any) => {
        const result = response['result'];
        const count = response['count'];
        return { result, count } as DataStateChangeEventArgs;
      })
    );
  }

  // Builds the filter query string from the treegrid's filter settings.
  private buildFilterQuery(where: any[]): string {
    if (!where || where.length === 0) return "$filter=ParentTicketID eq null";
    const andConds: string[] = [];
    for (const cond of where) {
      if (cond.predicates?.length) {
        const groupFilters = cond.predicates.map((pred: any) => this.predicateToString(pred));
        andConds.push(`(${groupFilters.join(` ${cond.condition ?? "and"} `)})`);
      } else {
        andConds.push(this.predicateToString(cond));
      }
    }
    if (andConds.length > 0) {
      return `$filter=ParentTicketID eq null and ${andConds.join(" and ")}`;
    }
    return "$filter=ParentTicketID eq null";
  }

  // Builds the OData search query string from the grid's search settings.
  private buildSearchQuery(search: any[]): string {
    if (!search || !search.length) return "";
    const s = search[0];
    const searchStr = (s.key as string).toLowerCase();
    const fields = s.fields || [];
    const orConds: string[] = [];

    fields.forEach((field: string) => {
      orConds.push(`substringof('${searchStr}',tolower(cast(${field}, 'Edm.String')))`);
    });
    if (!orConds.length) return "";
    return ` and (${orConds.join(" or ")})`;
  }

  // Converts a single filter predicate object to the filter string.
  private predicateToString(pred: any): string {
    let field = pred.field;
    let value = pred.value;
    let ignoreCase = pred.ignoreCase;
    let valStr = typeof value === "string" ? `'${value}'` : value;

    switch (pred.operator) {
      case "equal":
        if (ignoreCase && typeof value === "string") {
          return `(tolower(${field}) eq '${value.toLowerCase()}')`;
        }
        return `${field} eq ${valStr}`;
      case "contains":
        if (ignoreCase && typeof value === "string") {
          return `contains(tolower(${field}), '${value.toLowerCase()}')`;
        }
        return `contains(${field}, ${valStr})`;
      case "startswith":
        if (ignoreCase && typeof value === "string") {
          return `startswith(tolower(${field}), '${value.toLowerCase()}')`;
        }
        return `startswith(${field}, ${valStr})`;
      default:
        return "";
    }
  }

  // Fetches data from the specified URL using the Fetch API and wraps it in an Observable.
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

  // Deletes a record from the database.
  deleteRecord(state: any): Observable<any> {
    const id = state.data[0]?.TicketID || state.data[0]?.id;
    const url = `${this.BASE_URL}/${id}`;
    return new Observable((observer) => {
      fetch(url, { method: 'DELETE' })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Updates an existing record in the database.
  updateRecord(state: any): Observable<any> {
    const url = `${this.BASE_URL}`;
    const data1 = state.data;
    return new Observable((observer) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
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

  // Adds a new record to the database.
  addRecord(state: any): Observable<any> {
    const url = `${this.BASE_URL}`;
    const data1 = state.data;
    return new Observable((observer) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
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
