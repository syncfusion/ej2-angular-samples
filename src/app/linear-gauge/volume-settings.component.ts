import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, LinearGaugeTheme } from '@syncfusion/ej2-lineargauge';
import { LinearGaugeModule, AnnotationsService } from '@syncfusion/ej2-angular-lineargauge';

@Component({
    selector: 'control-content',
    templateUrl: 'volume-settings.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [LinearGaugeModule],
    providers: [AnnotationsService]
})

export class VolumeSettingsComponent {
    public textColor: string = '#000000';
    public axesMusicIcon: Object[] = [{
        minimum: 0,
        maximum: 100,
        line: {
            width: 0
        },
        pointers: [{
            value: 100,
            width: 30,
            color: '#0074E3',
            type: 'Bar',
            position: 'Cross',
            roundedCornerRadius: 15,
            offset: -15
        }],
        majorTicks: {
            interval: 20,
            height: 0
        },
        minorTicks: {
            interval: 10, height: 0
        },
        labelStyle: {
            format:'Music {value} %' ,
            font: { size: '0px'}
        }
    }];

    public axesBellIcon: Object[] = [{
        minimum: 0,
        maximum: 100,
        line: {
            width: 0
        },
        pointers: [{
            value: 85,
            width: 30,
            color: '#0074E3',
            type: 'Bar',
            position: 'Cross',
            roundedCornerRadius: 15,
            offset: -15
        }],
        majorTicks: {
            interval: 20,
            height: 0
        },
        minorTicks: {
            interval: 10, height: 0
        },
        labelStyle: {
            format:'Bell {value} %',
            font: { size: '0px' }
        }
    }];

    public axesClockIcon: Object[] = [{
        minimum: 0,
        maximum: 100,
        line: {
            width: 0
        },
        pointers: [{
            value: 65,
            width: 30,
            color: '#0074E3',
            type: 'Bar',
            position: 'Cross',
            roundedCornerRadius: 15,
            offset: -15
        }],
        majorTicks: {
            interval: 20,
            height: 0
        },
        minorTicks: {
            interval: 10, height: 0
        },
        labelStyle: {
            format: 'Clock {value} %',
            font: { size: '0px' }
        }
    }];

    public annotationMusicIcon: Object = [{
        axisIndex: 0,
        axisValue: 100,
        x: 1,
        y: 0, zIndex: '1',
    }, {
        content: '<div class="sf-icon-music" style="width:16px"></div>',
        axisIndex: 0,
        axisValue: 11,
        x: 9,
        y: 1, zIndex: '1',
    }
    ];

    public annotationBellIcon: Object = [{
        axisIndex: 0,
        axisValue: 100,
        x: 1,
        y: 0, zIndex: '1',
    }, {
        content: '<div class="sf-icon-bell" style="width:16px"></div>',
        axisIndex: 0,
        axisValue: 11,
        x: 9,
        y: 1, zIndex: '1',
    }];

    public annotationClockIcon: Object = [{
        axisIndex: 0,
        axisValue: 100,
        x: 0,
        y: 0, zIndex: '1',
    }, {
        content: '<div class="sf-icon-clock" style="width:16px"></div>',
        axisIndex: 0,
        axisValue: 11,
        x: 9,
        y: 1, zIndex: '1',
    }];

    public container: Object = {
        width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent'
    };

    public musicIconLoad(args: ILoadedEventArgs): void {
        // custom code start
        this.themeChanges(args);
        // custom code end
        args.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left:64px;margin-top: -31px;color:${this.textColor};font-family:inherit">100%</div>`;
    }

    public bellIconLoad(args: ILoadedEventArgs): void {
        // custom code start
        this.themeChanges(args);
        // custom code end
        args.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left:73px;margin-top: -31px;color:${this.textColor};font-family:inherit"> 85%</div>`;
    }

    public clockIconLoad(args: ILoadedEventArgs): void {
        // custom code start
        this.themeChanges(args);
        // custom code end
        args.gauge.annotations[0].content = `<div style="width: 70px;font-size: 16px;margin-left: 71px;margin-top: -31px;color:${this.textColor};font-family:inherit">65%</div>`;        
    }

    public themeChanges(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = <LinearGaugeTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
        // custom code end
        this.textColor = args.gauge.theme.indexOf('Dark') > -1 || args.gauge.theme.indexOf('HighContrast') > -1 ? '#FFFFFF' : '#000000';
    }

    constructor() {
        // code
    };
}