/**
 * Seat Selection sample
 */
import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MapsTheme, Maps, ISelectionEventArgs, Selection, ILoadEventArgs, MapsModule } from '@syncfusion/ej2-angular-maps';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
Maps.Inject(Selection);
interface SeatInfo {
    seatno?: number;
    fill?: string;
}
declare var require: any;
let seat_selection: object[] = require('./seat-data.json');
@Component({
    selector: 'control-content',
    templateUrl: 'seat-selection.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MapsModule, SBDescriptionComponent]
})
export class MapsSeatSelectionComponent {
    @ViewChild('maps')
    public maps: Maps;
    public zoomSettings: object = {
        enable: false
    };
    public seatInfo: HTMLDivElement;
    // custom code start
    public load = (args: ILoadEventArgs) => {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() +
        theme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-high/i, 'High').replace(/5.3/i, '5');
    }
    // custom code end
    public itemSelection = (args: ISelectionEventArgs) => {
        if ((args.shapeData as SeatInfo).fill === 'Orange') {
            args.fill = 'Orange';
            document.getElementById(args.target).setAttribute('class', 'ShapeselectionMapStyle');
            return;
        }
        args.fill = 'green';
        let seat: number = (args.shapeData as SeatInfo).seatno;
        let connector: string = ' ';
        if (this.seatInfo.innerHTML === '') {
            this.seatInfo.innerHTML = '<span id="seat-info">Seats Selected -</span>';
        } else {
            connector = ', ';
        }
        let seatString: string = '<span class="seats">' + connector + seat + '</span>';
        let seatString1: string = ' ' + seat + '</span><span class="seats">,'; // 15</span><span class="seats">,
        let lastString: string = '<span id="seat-info">Seats Selected -</span><span class="seats"> ' + seat + '</span>';
        if (this.seatInfo.innerHTML.indexOf(seatString) === -1 && this.seatInfo.innerHTML.indexOf(seatString1) === -1 &&
            this.seatInfo.innerHTML.indexOf(lastString) === -1) {
            this.seatInfo.innerHTML += '<span class="seats">' + connector + seat + '</span>';
        } else {
            this.seatInfo.innerHTML = this.seatInfo.innerHTML.replace(seatString, '');
            this.seatInfo.innerHTML = this.seatInfo.innerHTML.replace(seatString1, '');
            if (this.seatInfo.innerHTML === lastString) {
                this.seatInfo.innerHTML = '';
            }
        }
    };

    public layers: object[] = [
        {
            geometryType: 'Normal',
            shapeData: seat_selection,
            shapeSettings: {
                colorValuePath: 'fill'
            },
            selectionSettings: {
                enable: true,
                opacity: 1,
                enableMultiSelect: true,
                fill : 'green'
            }
        }
    ];
    ngAfterViewInit() {
        this.seatInfo = <HTMLDivElement>document.getElementById('selectedseats');
        document.getElementById('clear-btn').onclick = () => {
            if (this.seatInfo.innerHTML === '') { return; }
            let seats: any[] = this.seatInfo.innerText.split('-')[1].trim().split(',').map(num => Number(num.trim()));
            for (let i: number = 0, length: number = seats.length; i < length; i++) {
                this.maps.shapeSelection(0, 'seatno', seats[i], false);
            }
            this.seatInfo.innerHTML = '';
        };
    }
    // custom code start
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [ 'seat-data.json'];
    };
    // custom code end

}