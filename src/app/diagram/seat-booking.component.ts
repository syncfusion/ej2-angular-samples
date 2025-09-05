// src/app/diagram/seat-booking.component.ts
import { Component, ViewEncapsulation, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel,
    Node,
    SnapConstraints,
    DiagramTools,
    NodeConstraints,
    AnnotationConstraints,
    SnapSettingsModel,
    DiagramConstraints
} from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonPropsModel, DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups'; 

function getTimingSpecificBookedSeats(): { [key: number]: string[] } {
    return {
        1: [
            "seatD9", "seatD10", "seatE9", "seatE10", "seatF8", "seatF9", "seatF10", "seatF11",
            "seatG7", "seatG8", "seatG9", "seatG10", "seatH6", "seatH7", "seatH8",
            "seatC9", "seatC10", "seatB9", "seatB10", "seatA9", "seatA10",
            "seatD8", "seatD11", "seatE8", "seatE11", "seatF7", "seatF12",
            "seatC8", "seatC11", "seatB8", "seatB11", "seatA8", "seatA11",
            "seatG6", "seatG11", "seatH5", "seatH9",
            "seatI8", "seatI9", "seatJ8", "seatJ9", "seatK7", "seatK8", "seatK9", "seatK10",
            "seatL6", "seatL7", "seatL8", "seatL9", "seatM5", "seatM6", "seatM7", "seatM8",
            "seatI7", "seatI10", "seatJ7", "seatJ10", "seatK6", "seatK11",
            "seatL5", "seatL10", "seatM4",
            "seatN8", "seatN9", "seatO8", "seatO9", "seatP8", "seatP9",
            "seatN7", "seatN10", "seatO7", "seatO10", "seatP7", "seatP10",
            "seatN6", "seatO6", "seatP6"
        ],
        2: [
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
            "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
            "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13", "seatH14",
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
            "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5", "seatP6", "seatP7", "seatP8", "seatP9", "seatP10", "seatP11", "seatP12", "seatP13", "seatP14", "seatP15", "seatP16"
        ],
        3: [
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
            "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
            "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13",
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
            "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
        ],
        4: [
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10",
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
        ]
    };
}

// Define interfaces for better type safety
interface SeatInfo {
    seatNumber: string;
    row: string;
    column: number;
    price: number;
    tierCategory: string;
    booked: boolean;
}

interface SeatSelection {
    seatNumbers: string[];
    ticketCount: number;
    amount: number;
    category: string;
}

interface ShowTiming {
    id: number;
    time: string;
    type: string;
    status: string;
}

@Component({
    selector: 'app-seat-booking',
    templateUrl: './seat-booking.html',
    styleUrls: ['seat-booking.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        DiagramModule,
        SBDescriptionComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule
    ]
})
export class SeatBookingComponent implements OnInit {
    @ViewChild('diagram')
    public diagram!: DiagramComponent;
    constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;

    @ViewChild('bookingSuccessDialog')
    public bookingSuccessDialogComponent!: DialogComponent;

    public nodes: NodeModel[] = [];
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public tool: DiagramTools = DiagramTools.ZoomPan | DiagramTools.SingleSelect;

    public selectedTimingId: number = 1;
    public seatSelection: SeatSelection = {
        seatNumbers: [],
        ticketCount: 0,
        amount: 0.0,
        category: ""
    };
    public selectedSeatsArray: string[] = [];

    public timingSpecificBookedSeats: { [key: number]: string[] } = getTimingSpecificBookedSeats();

    public showTimings: ShowTiming[] = [
        { id: 1, time: "11:50 AM", type: "4K DOLBY ATMOS", status: "available" },
        { id: 2, time: "02:15 PM", type: "4K DOLBY ATMOS", status: "sold-out" },
        { id: 3, time: "06:20 PM", type: "4K DOLBY ATMOS", status: "filling-fast" },
        { id: 4, time: "09:15 PM", type: "4K DOLBY ATMOS", status: "filling-fast" }
    ];

    public movieTimingText: string = '';
    public dateLabelText: string = '';
    public notificationMessage: string = '';
    public showNotificationFlag: boolean = false;

    ngOnInit(): void {
        this.updateDateTime(this.selectedTimingId - 1); // Set initial time display
        this.initializeLayout();
    }

    diagramCreated: boolean = false;
    public onDiagramCreated(): void {
        if (this.diagram) {
            this.diagramCreated = true;
            this.diagram.nodes = this.nodes; // Assign the pre-created nodes to the diagram
            this.diagram.dataBind();
            this.diagram.fitToPage({ canZoomOut: true });
            this.refreshSeatingLayout(); // Perform initial layout refresh
            this.updateBookingSummary();
            this.updateBookingSummaryUI();
        }
    }

    load(): void {
        if(this.diagramCreated){
             this.diagram.fitToPage({ canZoomOut: true });
        }
    }

    private getBookedSeatsForTiming(timingId: number): string[] {
        return this.timingSpecificBookedSeats[timingId] || [];
    }

    private refreshSeatingLayout(): void {
        const bookedSet: Set<string> = new Set(this.getBookedSeatsForTiming(this.selectedTimingId));

        this.diagram.nodes.forEach((node: NodeModel) => {
            // Check if it's a seat node (has addInfo and a SeatNumber property)
            if (node.addInfo && (node.addInfo as SeatInfo).seatNumber) {
                const currentSeatInfo = node.addInfo as SeatInfo;

                // --- RESET ALL STYLES TO DEFAULT AVAILABLE STATE ---
                (node.style as any).fill = 'transparent';
                (node.style as any).strokeColor = '#9CA3AF';
                 if (node.annotations && node.annotations[0] && node.annotations[0].style) { // Ensure style exists
                    node.annotations[0].style!.color = "#374151"; // Default annotation color
                }
                currentSeatInfo.booked = false; // Reset Booked status for refresh

                // --- APPLY BOOKED STATUS AND STYLING FOR THE CURRENT TIMING ---
                if (bookedSet.has(node.id!)) {
                    (node.style as any).fill = '#E5E7EB'; // Booked fill color
                    (node.style as any).strokeColor = '#E5E7EB';
                    if (node.annotations && node.annotations[0] && node.annotations[0].style) {
                        node.annotations[0].style!.color = "#9CA3AF"; // Booked annotation color
                    }
                    currentSeatInfo.booked = true; // Set Booked status
                }

                // --- APPLY SELECTED STATUS AND STYLING (OVERRIDES BOOKED/AVAILABLE) ---
                if (this.selectedSeatsArray.includes(node.id!)) {
                    (node.style as any).fill = "#15803D"; // Selected fill color
                    (node.style as any).strokeColor = "#15803D";
                    if (node.annotations && node.annotations[0] && node.annotations[0].style) {
                        node.annotations[0].style!.color = "white"; // Selected annotation color
                    }
                }
                
                // Update tooltip content based on the final state
                node.tooltip.content = this.getSeatTooltipTemplate(currentSeatInfo, node);
            }
        });
        this.diagram.dataBind();
    }

    public getSeatTooltipTemplate(addInfoData: SeatInfo, currentNode?: NodeModel): string {
        let addInfo: SeatInfo = addInfoData;
        let seatNumber: string = addInfo.seatNumber || "N/A";
        let row: string = addInfo.row || "N/A";
        let tier: string = addInfo.tierCategory || "N/A";
        let price: number | string = addInfo.price !== undefined ? addInfo.price : "N/A";

        // Determine if selected based on the component's selectedSeatsArray, not just node's intrinsic state
        let isSelectedForTooltip: boolean = this.selectedSeatsArray.includes(currentNode?.id || ''); 
        
        // Use addInfo.Booked for intrinsic booked status
        let isBookedForTooltip: boolean = !!addInfo.booked;

        let status: string = isSelectedForTooltip ? "Selected" : isBookedForTooltip ? "Booked" : "Available";
        let statusBg: string = (isSelectedForTooltip ? "#28a745" : isBookedForTooltip ? "#6c757d" : "#17a2b8");

        return `
            <div class="seat-tooltip" style="margin:0;padding:10px;font-family:Arial,sans-serif;min-width:150px;">
                <div style="font-weight:bold;margin-bottom:5px;font-size:14px;">
                    Seat ${seatNumber}
                </div>
                <div style="font-size:12px;margin-bottom:3px;">
                    <strong>Row:</strong> ${row}
                </div>
                <div style="font-size:12px;margin-bottom:3px;">
                    <strong>Category:</strong> ${tier}
                </div>
                <div style="font-size:12px;margin-bottom:3px;">
                    <strong>Price:</strong> $${price}
                </div>
                <div style="font-size:12px;margin-top:5px;">
                    <span style="padding:2px 6px;border-radius:3px;font-weight:bold;background-color:${statusBg};color:white;font-size:11px;">
                        ${status}
                    </span>
                </div>
            </div>
        `;
    }

    private createTierLabel(tierName: string, price: number, y: number): void {
        this.nodes.push({
            id: `tier-${tierName}`,
            width: 200,
            height: 25,
            offsetX: 585,
            offsetY: y,
            shape: { type: 'Text', content: `${tierName} - $${price}` },
            style: { fontSize: 16, bold: true },
            constraints: NodeConstraints.ReadOnly
        });
    }

    private createRowLabel(row: string, y: number): void {
        this.nodes.push({
            id: `row-${row}`,
            width: 30,
            height: 32,
            offsetX: 80,
            offsetY: y,
            shape: { type: 'Text', content: row },
            style: { fontSize: 14, bold: true },
            constraints: NodeConstraints.ReadOnly
        });
    }

    private createSeatNode(seatId: string, seatNumber: string, row: string, column: number, price: number, tier: string, x: number, y: number): void {
        let addInfoData: SeatInfo = {
            seatNumber: seatNumber,
            row: row,
            column: column,
            price: price,
            tierCategory: tier,
            booked: false // Initial state is not booked
        };
        this.nodes.push({
            id: seatId,
            width: 32,
            height: 32,
            offsetX: x,
            offsetY: y,
            shape: { cornerRadius: 4 },
            style: { strokeColor: '#9CA3AF', strokeWidth: 2 },
            annotations: [{ content: column.toString(), style: { color: "#374151" } }], // Default annotation color
            addInfo: addInfoData,
            tooltip: { content: this.getSeatTooltipTemplate(addInfoData), relativeMode: 'Object' },
            constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) & ~NodeConstraints.Select
        });
    }

    private createSplitSeats(row: string, seatCount: number, price: number, tier: string, y: number): void {
        const center: number = 600;
        const seatWidth: number = 32;
        const spacing: number = 10;
        const aisle: number = 82;
        const leftSeats: number = Math.floor(seatCount / 2);
        const rightSeats: number = seatCount - leftSeats;
        const leftStartX: number = center - (aisle / 2) - (leftSeats * (seatWidth + spacing) - spacing);
        const rightStartX: number = center + (aisle / 2);

        for (let i = 1; i <= leftSeats; i++) {
            const x: number = leftStartX + (i - 1) * (seatWidth + spacing);
            this.createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
        }
        for (let i = leftSeats + 1; i <= seatCount; i++) {
            const x: number = rightStartX + (i - leftSeats - 1) * (seatWidth + spacing);
            this.createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
        }
    }

    private createTierSeats(tier: string, price: number, startY: number, rows: { row: string, count: number }[]): number {
        let y: number = startY;
        this.createTierLabel(tier, price, y - 50);
        rows.forEach(({ row, count }) => {
            this.createRowLabel(row, y);
            this.createSplitSeats(row, count, price, tier, y);
            y += 48;
        });
        return y;
    }

    private createScreen(y: number): void {
        this.nodes.push({
            id: 'screen',
            width: 600,
            height: 80,
            offsetX: 580,
            offsetY: y,
            constraints: NodeConstraints.ReadOnly,
            shape: {
                type: 'Native', content: `<svg width="394" height="56" viewBox="0 0 394 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" stroke="#818CF8" stroke-width="2" stroke-linejoin="round" />
                                    <path d="M2 45.666C124.157 60.0821 312.899 51.6727 392 45.666" stroke="#818CF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" fill="#E0E7FF" />
                                </svg>` },
            annotations: [{
                content: 'Screen This Way',
                offset: { x: 0.5, y: 1.5 },
                constraints: AnnotationConstraints.ReadOnly,
                style: { fontSize: 14, color: '#818CF8' }
            }]
        });
    }

    private initializeLayout(): void {
        let y: number = 50;
        y = this.createTierSeats("Executive", 25, y, [
            { row: "A", count: 18 }, { row: "B", count: 18 }, { row: "C", count: 18 },
            { row: "D", count: 18 }, { row: "E", count: 18 }, { row: "F", count: 18 },
            { row: "G", count: 16 }, { row: "H", count: 14 }
        ]);
        y += 92;
        y = this.createTierSeats("Corporate", 16, y, [
            { row: "I", count: 16 }, { row: "J", count: 16 }, { row: "K", count: 16 },
            { row: "L", count: 14 }, { row: "M", count: 12 }
        ]);
        y += 92;
        y = this.createTierSeats("Budget", 8, y, [
            { row: "N", count: 16 }, { row: "O", count: 16 }, { row: "P", count: 16 }
        ]);
        y += 92;
        this.createScreen(y);
    }

    private unSelectSeat(seatNode: NodeModel): void{
        // Logic for DESELECTING a seat
        const idx: number = this.selectedSeatsArray.indexOf(seatNode.id!);
        if (idx !== -1) {
            this.selectedSeatsArray.splice(idx, 1);
        }
        // Reset styling for previously selected seats
        (seatNode.style as any).fill = "transparent";
        (seatNode.style as any).strokeColor = "#9CA3AF";
        if (seatNode.annotations && seatNode.annotations[0] && seatNode.annotations[0].style) {
            seatNode.annotations[0].style!.color = "#374151"; // Reset annotation color
        }
    }
    public onDiagramClick(args: any): void {
        if (args?.element instanceof Node && args.element.addInfo) {
            let currentNode: NodeModel = args.element;
            const currentSeatInfo = currentNode.addInfo as SeatInfo;

            if (currentSeatInfo.booked) {
                // If it's booked, just update tooltip and return
                currentNode.tooltip.content = this.getSeatTooltipTemplate(currentSeatInfo, currentNode);
                this.diagram.dataBind();
                return;
            }

            if (!this.selectedSeatsArray.includes(currentNode.id!)) {
                // Logic for SELECTING a seat
                const newTier: string = currentSeatInfo.tierCategory || "";
                const selectedNodeInfos: SeatInfo[] = this.selectedSeatsArray.map(seatId => {
                    const nodeFromDiagram: NodeModel | undefined = this.diagram.getObject(seatId) as NodeModel;
                      return nodeFromDiagram?.addInfo as SeatInfo;
                }).filter(info => info !== undefined && info !== null);

                const currentTier: string | null = selectedNodeInfos.length > 0
                    ? selectedNodeInfos[0].tierCategory || ""
                    : null;

                const differentTier: boolean = Boolean(currentTier && newTier !== currentTier);
                if (differentTier) {
                    //Iterate backwards to avoid skipping elements after splicing
                    for (let i: number = this.selectedSeatsArray.length - 1; i >= 0; i--) {
                        const seatNode = this.diagram.getObject(this.selectedSeatsArray[i]) as NodeModel;
                        if (seatNode) {
                            this.unSelectSeat(seatNode);
                            // Update tooltip for these deselected original seats
                            seatNode.tooltip.content = this.getSeatTooltipTemplate(seatNode.addInfo as SeatInfo, seatNode);
                        }
                    }
                    this.hideNotification();
                } else if (this.selectedSeatsArray.length >= 10) {
                    this.showNotification("Maximum 10 tickets can be selected");
                    return; 
                }

                // Add the new seat to selection (client-side array)
                this.selectedSeatsArray.push(currentNode.id!);
                
                // Apply SELECTED styling to the current node
                (currentNode.style as any).fill = "#15803D";
                (currentNode.style as any).strokeColor = "#15803D";
                if (currentNode.annotations && currentNode.annotations[0] && currentNode.annotations[0].style) {
                    currentNode.annotations[0].style!.color = "white"; // Annotation color for selected
                }
                this.diagram.dataBind();
                this.hideNotification();

            } else {
                this.unSelectSeat(currentNode);
                this.hideNotification(); // Clear notification on deselect
            }
            // Update tooltip of the *current* node being clicked based on its new state
            currentNode.tooltip.content = this.getSeatTooltipTemplate(currentSeatInfo, currentNode);
            // Trigger a single dataBind to refresh all affected nodes (especially for tier changes)
            this.diagram.dataBind(); 
            this.updateBookingSummary();
            this.updateBookingSummaryUI();
        }
    }

    public onTimingSelected(timing: ShowTiming): void {
        if (timing.status === 'sold-out') {
            return;
        }

        this.selectedTimingId = timing.id;
        this.selectedSeatsArray = []; // Clear current selection when timing changes
        this.updateBookingSummary(); // Update summary based on cleared selection
        this.updateBookingSummaryUI(); // Re-render summary UI
        this.refreshSeatingLayout(); // Critical: Re-render diagram based on new timing's booked seats
        this.hideNotification();
        this.updateDateTime(timing.id - 1);
        // Update selected timing item in UI (visual highlight)
        const timingItems = document.querySelectorAll('.timing-item');
        timingItems.forEach(item => {
            if (parseInt(item.getAttribute('data-timing') || '0') === timing.id) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    public showNotification(message: string): void {
        this.notificationMessage = message;
        this.showNotificationFlag = true;
    }

    public hideNotification(): void {
        this.showNotificationFlag = false;
        this.notificationMessage = '';
    }

    private updateBookingSummary(): void {
        if (this.selectedSeatsArray.length > 0) {
            let selectedSeatsDetailed: { seatNumber: string; row: string; price: number; tier: string; }[] =
                this.selectedSeatsArray.map(seatId => {
                    const nodeFromDiagram: NodeModel | undefined = this.diagram.getObject(seatId) as NodeModel;
                    const seatInfo = nodeFromDiagram?.addInfo as SeatInfo;
                    if (nodeFromDiagram && seatInfo) {
                        return {
                            seatNumber: seatInfo.seatNumber || "",
                            row: seatInfo.row || "",
                            price: seatInfo.price || 0,
                            tier: seatInfo.tierCategory || ""
                        };
                    }
                    return null;
                }).filter(Boolean) as { seatNumber: string; row: string; price: number; tier: string; }[];

            this.seatSelection.seatNumbers = selectedSeatsDetailed.map(s => s.seatNumber);
            this.seatSelection.ticketCount = selectedSeatsDetailed.length;
            const totalAmount: number = selectedSeatsDetailed.reduce((sum, s) => sum + (Number(s.price) || 0), 0);
            this.seatSelection.amount = totalAmount;
            this.seatSelection.category = selectedSeatsDetailed.length > 0 ? selectedSeatsDetailed[0].tier.toUpperCase() : "";
        } else {
            this.seatSelection.seatNumbers = [];
            this.seatSelection.ticketCount = 0;
            this.seatSelection.amount = 0.0;
            this.seatSelection.category = "";
        }
    }

    public updateBookingSummaryUI(): void {
        const ticketCountElem: HTMLElement | null = document.getElementById('ticketCount');
        const totalAmountElem: HTMLElement | null = document.getElementById('totalAmount');
        const priceHintElem: HTMLElement | null = document.getElementById('priceHint');
        const ticketAmountElem: HTMLElement | null = document.getElementById('ticketAmount');
        const feesAmountElem: HTMLElement | null = document.getElementById('feesAmount');
        const proceedButton: HTMLButtonElement | null = document.getElementById('proceedButton') as HTMLButtonElement;


        if (this.seatSelection.ticketCount > 0) {
            if (ticketCountElem) ticketCountElem.innerText = this.seatSelection.ticketCount + " Tickets Selected";
            if (totalAmountElem) totalAmountElem.innerText = this.seatSelection.amount === null ? '$0' : "$" + (this.seatSelection.amount + 6);
            if (priceHintElem) priceHintElem.style.display = 'block';
            if (ticketAmountElem) ticketAmountElem.innerText = "Tickets: $" + (this.seatSelection.amount);
            if (feesAmountElem) feesAmountElem.innerText = " + Fees: $" + 6;
        } else {
            if (ticketCountElem) ticketCountElem.innerText = "0 Tickets Selected";
            if (totalAmountElem) totalAmountElem.innerText = "$0";
            if (priceHintElem) priceHintElem.style.display = 'none';
            if (ticketAmountElem) ticketAmountElem.innerText = "";
            if (feesAmountElem) feesAmountElem.innerText = "";
        }
        if (proceedButton) proceedButton.disabled = this.seatSelection.ticketCount === 0;
    }

    private updateDateTime(id: number): void {
        const showtiming: ShowTiming = this.showTimings[id];
        const now: Date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: '2-digit',
            month: 'short'
        };
        const formatted: string = now.toLocaleString('en-IN', options);
        this.movieTimingText = `${formatted}, ${showtiming.time}`;
        const day: string = now.toLocaleDateString('en-IN', { weekday: 'short' });
        const date: string = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        this.dateLabelText = `${day}<br>${date}`;
    }

    private bookSeatsForTiming(timingId: number, bookingSeatIds: string[]): void {
        if (!this.timingSpecificBookedSeats[timingId]) {
            this.timingSpecificBookedSeats[timingId] = [];
        }
        // Ensure no duplicates are added
        bookingSeatIds.forEach(seatId => {
            if (!this.timingSpecificBookedSeats[timingId].includes(seatId)) {
                this.timingSpecificBookedSeats[timingId].push(seatId);
            }
        });
    }

    public onProceedToBook(): void {
        if (this.seatSelection.ticketCount === 0) {
            return;
        }

        // 1. Mark seats as booked in our data model
        this.bookSeatsForTiming(this.selectedTimingId, this.selectedSeatsArray);

        // 2. Prepare data for the success dialog
        const movieTitle: string = "F1: The Movie";
        const theater: string = "Velvet Aurora Cinematheque";
        const showTime: string = this.movieTimingText;
        const seats: string = this.seatSelection.seatNumbers.join(", ");
        const totalAmount: string = (this.seatSelection.amount + 6).toFixed(2);
        const bookingId: string = 'VAC' + Date.now().toString().slice(-8);
        setTimeout(() => {            
            if (this.bookingSuccessDialogComponent) {
                this.bookingSuccessDialogComponent.content = this.buildBookingSuccessHtml(movieTitle, theater, showTime, seats, totalAmount, bookingId);
                this.bookingSuccessDialogComponent.dataBind();
                this.bookingSuccessDialogComponent.show();
            }
        }, 0);
        this.selectedSeatsArray = []; // Clear actual selection array
        this.updateBookingSummary(); // Recalculate summary (will be empty)
        this.updateBookingSummaryUI(); // Update UI for empty summary
        this.refreshSeatingLayout(); // Re-render the diagram to reflect new booked seats and clear selected styles
        this.hideNotification();
    }

    public closeBookingSuccessDialog(): void {
        if (this.bookingSuccessDialogComponent) {
            this.bookingSuccessDialogComponent.hide();
        }
    }
    public dlgButtons: ButtonPropsModel[] = [{ click: this.closeBookingSuccessDialog.bind(this), buttonModel: { content: 'Close',cssClass: 'btn2 btn2-proceed', isPrimary: true } }];
    private buildBookingSuccessHtml(movieTitle: string, theater: string, showTime: string, seats: string, totalAmount: string, bookingId: string): string {
        return `
            <div class="notification-header">
                <div class="success-icon">&#10003;</div>
                <div class="success-title">Booking Confirmed!</div>
                <div class="success-message">
                    Your tickets have been successfully booked.
                </div>
            </div>
            <div class="booking-details">
                <h4>Booking Details:</h4>
                <p><strong>Movie:</strong> ${movieTitle}</p>
                <p><strong>Theater:</strong> ${theater}</p>
                <p><strong>Show Time:</strong> ${showTime}</p>
                <p><strong>Seats:</strong> ${seats}</p>
                <p><strong>Total Amount:</strong> $${totalAmount}</p>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
            </div>
        `;
    }
}