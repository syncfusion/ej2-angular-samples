import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Browser } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { loadChartTheme } from './theme-color';

import {
    ScheduleComponent,
    ScheduleModule,
    TimelineMonth,
    Resize,
    DragAndDrop
} from '@syncfusion/ej2-angular-schedule';

import {
    ChartComponent,
    ChartModule,
    ColumnSeries,
    Category,
    Legend,
    Tooltip,
    Highlight,
    ITooltipRenderEventArgs,
} from '@syncfusion/ej2-angular-charts';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

ScheduleComponent.Inject(TimelineMonth, Resize, DragAndDrop);
ChartComponent.Inject(ColumnSeries, Category, Legend, Tooltip, Highlight);

@Component({
    selector: 'control-content',
    standalone: true,
    imports: [
        CommonModule,
        ScheduleModule,
        ChartModule,
        DropDownListModule
    ],
    templateUrl: './integration-with-chart.html',
    styleUrls: ['./integration-with-chart.style.css']
})
export class IntegrationWithChartComponent implements OnInit {

    @ViewChild('scheduler', { static: true })
    public scheduler!: ScheduleComponent;
    @ViewChild('chart', { static: true })
    public chart!: ChartComponent;
    public allowOverlap: boolean = false;
    public chartXName: string = 'Driver';

    public Browser = Browser;
    public selectedDate = new Date(2026, 0, 12);

    /* ===== Resource master ===== */
    public driversMaster = [
        { driver: 'Ben Smith', id: 1, color: '#ea7a57', truck: 'Volvo FH16', capacity: '325 t' },
        { driver: 'Sarah Johnson', id: 2, color: '#7fa900', truck: 'Scania R730', capacity: '310 t' },
        { driver: 'Mike Chen', id: 3, color: '#5978ee', truck: 'Mercedes Actros', capacity: '290 t' },
        { driver: 'Emma Davis', id: 4, color: '#fec200', truck: 'MAN TGX', capacity: '280 t' },
        { driver: 'Carlos Rodriguez', id: 5, color: '#df5286', truck: 'DAF XF', capacity: '300 t' },
        { driver: 'Olivia Wilson', id: 6, color: '#00bdae', truck: 'Kenworth T680', capacity: '315 t' },
        { driver: 'James Taylor', id: 7, color: '#865fcf', truck: 'Peterbilt 579', capacity: '305 t' },
        { driver: 'Sophia Martinez', id: 8, color: '#1aaa55', truck: 'Freightliner Cascadia', capacity: '295 t' },
        { driver: 'Daniel Lee', id: 9, color: '#df5286', truck: 'Mack Anthem', capacity: '285 t' },
        { driver: 'Ava Thompson', id: 10, color: '#710193', truck: 'International LT', capacity: '275 t' }
    ];

    /* ===== Scheduler ===== */
    public truckEvents: any[] = [];
    public views = ['TimelineMonth'];
    public currentView = 'TimelineMonth';
    public timeScale = { enable: false };
    public group = { resources: ['TruckDetails'] };
    public eventSettings: any;

    /* ===== Chart ===== */
    public currentMode = 'tripcount';
    public chartTitle = 'Trip Count';
    public chartDataSet: any[] = [];

    public ddlData = [
        { text: 'Trip Count', value: 'tripcount' },
        { text: 'Truck Capacity', value: 'capacity' },
        { text: 'Longest Trips', value: 'longest' }
    ];
    public fields = { text: 'text', value: 'value' };
    public primaryXAxis = {
        valueType: 'Category',
        labelRotation: -45,
        labelIntersectAction: 'None',
        edgeLabelPlacement: 'Shift',
    };
    public primaryYAxis = {
        interval: 1,
    };
    ngOnInit(): void {
        this.createEvents();
        this.updateChart();
    }

    private createEvents(): void {

        this.truckEvents = [
            {
                Id: 1,
                Subject: 'Long haul trip',
                StartTime: new Date('2026-01-14T21:00:00Z'),
                EndTime: new Date('2026-01-16T02:00:00Z'),
                Driver: 'Ben Smith',
                DriverID: 1
            },
            {
                Id: 2,
                Subject: 'Delivery to New York',
                StartTime: new Date('2026-01-13T13:00:00Z'),
                EndTime: new Date('2026-01-17T01:00:00Z'),
                Driver: 'Sarah Johnson',
                DriverID: 2
            },
            {
                Id: 3,
                Subject: 'Cross-country route',
                StartTime: new Date('2026-01-12T19:10:00Z'),
                EndTime: new Date('2026-01-14T23:00:00Z'),
                Driver: 'Mike Chen',
                DriverID: 3
            },
            {
                Id: 4,
                Subject: 'Refrigerated goods',
                StartTime: new Date('2026-01-13T03:00:00Z'),
                EndTime: new Date('2026-01-16T14:00:00Z'),
                Driver: 'Emma Davis',
                DriverID: 4
            },
            {
                Id: 5,
                Subject: 'Container transport',
                StartTime: new Date('2026-01-12T15:00:00Z'),
                EndTime: new Date('2026-01-14T22:00:00Z'),
                Driver: 'Carlos Rodriguez',
                DriverID: 5
            },
            {
                Id: 6,
                Subject: 'Furniture delivery',
                StartTime: new Date('2026-01-16T20:00:00Z'),
                EndTime: new Date('2026-01-17T03:00:00Z'),
                Driver: 'Olivia Wilson',
                DriverID: 6
            },
            {
                Id: 7,
                Subject: 'Food products',
                StartTime: new Date('2026-01-12T07:00:00Z'),
                EndTime: new Date('2026-01-16T04:00:00Z'),
                Driver: 'James Taylor',
                DriverID: 7
            },
            {
                Id: 8,
                Subject: 'Construction materials',
                StartTime: new Date('2026-01-15T11:00:00Z'),
                EndTime: new Date('2026-01-16T20:00:00Z'),
                Driver: 'Sophia Martinez',
                DriverID: 8
            },
            {
                Id: 9,
                Subject: 'Medical supplies',
                StartTime: new Date('2026-01-12T20:00:00Z'),
                EndTime: new Date('2026-01-17T02:00:00Z'),
                Driver: 'Daniel Lee',
                DriverID: 9
            },
            {
                Id: 10,
                Subject: 'Retail goods',
                StartTime: new Date('2026-01-20T14:00:00Z'),
                EndTime: new Date('2026-01-23T03:00:00Z'),
                Driver: 'Ava Thompson',
                DriverID: 10
            },

            {
                Id: 11,
                Subject: 'Steel materials',
                StartTime: new Date('2026-01-18T08:00:00Z'),
                EndTime: new Date('2026-01-18T14:00:00Z'),
                DriverID: 4
            },
            {
                Id: 12,
                Subject: 'Emergency equipment',
                StartTime: new Date('2026-01-19T07:00:00Z'),
                EndTime: new Date('2026-01-19T13:00:00Z'),
                DriverID: 9
            },
            {
                Id: 13,
                Subject: 'Warehouse pickup',
                StartTime: new Date('2026-01-18T08:00:00Z'),
                EndTime: new Date('2026-01-18T14:00:00Z'),
                DriverID: 2
            },
            {
                Id: 14,
                Subject: 'Express highway delivery',
                StartTime: new Date('2026-01-18T06:00:00Z'),
                EndTime: new Date('2026-01-18T12:00:00Z'),
                DriverID: 3
            },
            {
                Id: 15,
                Subject: 'Frozen food transport',
                StartTime: new Date('2026-01-20T07:00:00Z'),
                EndTime: new Date('2026-01-21T13:00:00Z'),
                DriverID: 4
            },
            {
                Id: 16,
                Subject: 'Industrial machinery',
                StartTime: new Date('2026-01-18T06:00:00Z'),
                EndTime: new Date('2026-01-18T14:00:00Z'),
                DriverID: 6
            },
            {
                Id: 17,
                Subject: 'Cement delivery',
                StartTime: new Date('2026-01-20T08:00:00Z'),
                EndTime: new Date('2026-01-20T14:00:00Z'),
                DriverID: 8
            },
            {
                Id: 18,
                Subject: 'Equipment relocation',
                StartTime: new Date('2026-01-24T09:00:00Z'),
                EndTime: new Date('2026-01-24T17:00:00Z'),
                DriverID: 8
            }
        ];

        this.eventSettings = { dataSource: this.truckEvents };
    }


    onModeChange(args: any): void {
        this.currentMode = args.value;
        this.chartTitle = args.itemData.text;
        this.updateChart();
    }

    updateChart(): void {
        if (!this.chart) return;

        if (!this.chart.primaryYAxis) {
            this.chart.primaryYAxis = {} as any;
        }
        if (this.currentMode === 'tripcount') {
            this.chart.primaryYAxis.interval = 2;
            this.chart.primaryYAxis.title = 'Count';
        } else if (this.currentMode === 'capacity') {
            this.chart.primaryYAxis.interval = null;
            this.chart.primaryYAxis.title = 'Capacity (t)';
        } else {
            this.chart.primaryYAxis.interval = null;
            this.chart.primaryYAxis.title = 'Duration (hours)';
        }
        const ds = this.scheduler?.eventSettings?.dataSource;
        let events: any[] = [];

        if (Array.isArray(ds)) {
            events = ds;
        } else if (ds instanceof DataManager) {
            events = ds.dataSource?.json ?? [];
        }
        if (this.currentMode === 'capacity') {

            this.chartXName = 'Truck';

            this.chartDataSet = this.driversMaster.map(d => ({
                Truck: d.truck,
                Driver: d.driver,
                Value: parseInt(d.capacity, 10)
            }));

            this.chart.refresh();
            return;
        }


        const map: Record<number, number> = {};

        events.forEach(e => {
            if (!e.DriverID || !e.StartTime || !e.EndTime) return;

            if (this.currentMode === 'tripcount') {
                map[e.DriverID] = (map[e.DriverID] || 0) + 1;
            } else {
                const hrs =
                    (new Date(e.EndTime).getTime() -
                        new Date(e.StartTime).getTime()) / 36e5;

                if (!map[e.DriverID] || hrs > map[e.DriverID]) {
                    map[e.DriverID] = hrs;
                }
            }

        });

        this.chartDataSet = Object.keys(map).map(id => ({
            Driver: this.driversMaster.find(d => d.id === +id)?.driver,
            Value: +map[+id].toFixed(1)
        }));
        this.chartXName = 'Driver';
        this.chart.refresh();

    }

    onScheduleActionComplete(): void {
        this.updateChart();
    }
    public load(args: ILoadedEventArgs): void {
       loadChartTheme(args);
    };

    onPointRender(args: any): void {
        if (!args.point) return;
        let resource;
        if (this.currentMode === 'capacity') {
            resource = this.driversMaster.find(d => d.truck === args.point.x);
        }
        else {
            resource = this.driversMaster.find(d => d.driver === args.point.x);
        }

        if (resource?.color) {
            args.fill = resource.color;
        }
    }

    onTooltipRender(args: ITooltipRenderEventArgs): void {
        if (!args.point) return;
        const unit =
            this.currentMode === 'capacity' ? ' t' :
                this.currentMode === 'longest' ? ' hours' : '';
        args.text = `<b>${args.point.x}</b><br/>${args.point.y}${unit}`;
    }
}