import { Component, OnInit } from '@angular/core';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { columnSpanData, ColumnSpanDataType } from './data';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'row-spanning.html'
})
export class RowSpanningComponent implements OnInit {
    public data: Object[];
    public height: string | number;
    public width: string | number;
    public gridLines: string;
    public textWrap: boolean;
    public queryCellInfoEvent: EmitType<QueryCellInfoEventArgs> = (args: QueryCellInfoEventArgs) => {
        let data: ColumnSpanDataType = args.data as ColumnSpanDataType;
        switch (data.EmployeeID) {
            case 10001:
                if (args.column.field === '9:00' || args.column.field === '2:30') {
                    args.colSpan = 2;
                } else if (args.column.field === '11:00') {
                    args.colSpan = 3;
                } else if (args.column.field === '1:00') {
                    args.colSpan = 3;
                    args.rowSpan = 10;
                } else if (args.column.field === '4:30') {
                    args.colSpan = 2;
                    args.rowSpan = 2;
                } else if (args.column.field === 'EmployeeName') {
                     args.rowSpan = 2;
                 }
                break;
            case 10002:
                if (args.column.field === '9:30') {
                    args.colSpan = 3;
                } else if (args.column.field === '11:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '2:30') {
                    args.colSpan = 2;
                    args.rowSpan = 5;
                } else if (args.column.field === '3:30') {
                    args.colSpan = 2;
                }
                break;
            case 10003:
                if (args.column.field === '9:00') {
                    args.colSpan = 3;
                    args.rowSpan = 2;
                } else if (args.column.field === '10:30' || args.column.field === '3:30' || args.column.field === '4:30') {
                    args.colSpan = 2;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                }
                break;
            case 10004:
                if (args.column.field === '11:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '4:00') {
                    args.colSpan = 2;
                }
                break;
            case 10005:
                if (args.column.field === '9:00') {
                    args.colSpan = 4;
                } else if (args.column.field === '11:30') {
                    args.colSpan = 3;
                } else if (args.column.field === '3:30') {
                    args.colSpan = 2;
                    args.rowSpan = 2;
                } else if (args.column.field === '4:30') {
                    args.colSpan = 2;
                }
                break;
        default: this.rowSpanIteration(args, data.EmployeeID);
        }
    };
    public rowSpanIteration: EmitType<QueryCellInfoEventArgs> = (args: QueryCellInfoEventArgs, value: number) => {
        switch (value) {
            case 10006:
                    if (args.column.field === '9:00' || args.column.field === '4:30') {
                        args.colSpan = 2;
                    } else if (args.column.field === '10:00') {
                        args.colSpan = 3;
                    } else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                    }
                    break;
            case 10007:
                    if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '3:00') {
                        args.colSpan = 2;
                    } else if (args.column.field === '11:30' || args.column.field === '4:00') {
                        args.colSpan = 3;
                    }
                    break;
                case 10008:
                    if (args.column.field === '9:00' || args.column.field === '10:30') {
                        args.colSpan = 3;
                    } else if (args.column.field === '2:30') {
                        args.colSpan = 3;
                        args.rowSpan = 2;
                    } else if (args.column.field === '4:00') {
                        args.colSpan = 2;
                    }
                    break;
                case 10009:
                    if (args.column.field === '9:00') {
                        args.colSpan = 3;
                    } else if (args.column.field === '11:30') {
                        args.colSpan = 3;
                        args.rowSpan = 2;
                    } else if (args.column.field === '4:30') {
                        args.colSpan = 2;
                    }
                    break;
                case 10010:
                    if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:00') {
                        args.colSpan = 3;
                    } else if (args.column.field === '10:30') {
                        args.colSpan = 2;
                    }
                    break;
                }
    };
    ngOnInit(): void {
        this.data = columnSpanData;
        this.gridLines = 'Both';
        this.height = 'auto';
        this.width = 'auto';
        this.textWrap = true
    }
}