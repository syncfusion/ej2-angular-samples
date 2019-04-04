/**
 * Maps selection sample
 */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MapsTheme, Maps, MapsTooltip, ISelectionEventArgs, Selection, Highlight, ILoadEventArgs } from '@syncfusion/ej2-angular-maps';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(MapsTooltip, Selection, Highlight);

interface PopulationData {
    State?: string;
    Candidate?: string; 
    Trump?: string;
    Clinton?: string;
}
declare var require: any;
let usMap: object[] = require('./usa.json');
let election: object[] = require('./election-data.json');
@Component({
    selector: 'control-content',
    templateUrl: 'selection.html',
    encapsulation: ViewEncapsulation.None
})
export class MapsSelectionComponent {
    public zoomSettings: object = {
        enable: false
    };
    public titleSettings: object = {
        text: 'USA Election Results - 2016',
        titleStyle: {
            size: '16px'
        }
    }
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
    }
    // custom code end
    public legendSettings: object = {
        visible: true,
        mode: 'Interactive',
        position: 'Top',
        width: '80%',
        textStyle: {
            fontWeight: '400',
            size: '14px'
        }
    };
    public itemSelection = (args: ISelectionEventArgs) => {
        if (args.shapeData !== isNullOrUndefined) {
            let matched: string = navigator.userAgent;
            let browser: string = matched.toLowerCase();
            let isIE11: boolean = !!navigator.userAgent.match(/Trident\/7\./);
            if (isIE11) {
                browser = 'msie';
            }
            let object: object = args.data;
            let popup: HTMLElement = document.getElementById('closepopup');
            let closebutton: HTMLElement = document.getElementById('closebutton');
            let winner: HTMLElement = document.getElementById('winner');
            let state: HTMLElement = document.getElementById('state');
            let trumpvote: HTMLElement = document.getElementById('trumpvotes');
            let clintonvote: HTMLElement = document.getElementById('clintonvotes');
            popup.style.display = 'block';
            closebutton.style.display = 'block';
            closebutton.onclick = () => {
                let popup: HTMLElement = document.getElementById('closepopup');
                let closebutton: HTMLElement = document.getElementById('closebutton');
                popup.style.display = 'none';
                closebutton.style.display = 'none';
            };

            if (browser !== 'mozilla') {
                state.innerText = (args.data as PopulationData).State;
                winner.innerText = (args.data as PopulationData).Candidate;
                trumpvote.innerText = (args.data as PopulationData).Trump + '%';
                clintonvote.innerText = (args.data as PopulationData).Clinton + '%';
            } else {
                state.textContent = (args.data as PopulationData).State;
                winner.textContent = (args.data as PopulationData).Candidate;
                trumpvote.textContent = (args.data as PopulationData).Trump + '%';
                clintonvote.textContent = (args.data as PopulationData).Clinton + '%';
            }
        }
    };

    public layers: object[] = [
        {
            shapeData: usMap,
            shapePropertyPath: 'name',
            shapeDataPath: 'State',
            dataSource: election,
            tooltipSettings: {
                visible: true,
                valuePath: 'State'
            },
            highlightSettings: {
                enable: true,
                fill: '#A3B0D0'
            },
            selectionSettings: {
                enable: true,
                fill: '#4C515B ',
                opacity: 1
            },
            shapeSettings: {
                colorValuePath: 'Candidate',
                colorMapping: [
                    {
                        value: 'Trump', color: '#D84444'
                    },
                    {
                        value: 'Clinton', color: '#316DB5'
                    }
                ]
            }
        }
    ];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [  'election-data.json', 'usa.json'];
    };
}