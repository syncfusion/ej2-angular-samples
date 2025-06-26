import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { PdfViewerComponent, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, HighlightSettings, UnderlineSettings, StrikethroughSettings, SquigglySettings, LineSettings, ArrowSettings, RectangleSettings, CircleSettings, PolygonSettings, DistanceSettings, PerimeterSettings, AreaSettings, RadiusSettings, VolumeSettings, FreeTextSettings, DynamicStampItem, SignStampItem, StandardBusinessStampItem, CustomStampSettings, InkAnnotationSettings, StickyNotesSettings, StampSettings, LoadEventArgs, PdfViewerModule, AnnotationMoveEventArgs, AnnotationResizeEventArgs, DecoratorShapes, AnnotationSelectEventArgs } from '@syncfusion/ej2-angular-pdfviewer';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChangeEventArgs, CheckBoxSelectionService, DropDownListComponent, DropDownListModule, MultiSelectComponent, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule, RemovingEventArgs, SuccessEventArgs } from '@syncfusion/ej2-angular-inputs';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ContextMenu, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { NumberFormat } from '@syncfusion/ej2-base/src/intl/number-formatter';
import { ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';

export class Comment {
    id: string;
    author: string;
    note: string;
    modifiedDate: string;
    state: string;
}

interface VertexPoint {
    x: number;
    y: number;
    version?: any;
}
export class AnnotationBase {
    AnnotationType: string = "Rectangle";
    bounds: any[] = [];
    pageNumber: number = 1;
    x: number = 100;
    y: number = 100;
    width: number = 100;
    height: number = 100;
    opacity: number = 100;
    thickness: number = 1;
    fillColor: string = "rgba(0, 0, 0, 0)";
    strokeColor: string = "#FF0000";
    author: string = "Guest";
    setState: string = "None";
    comment: string = "";
    replyAuthor: string = "Guest";
    replyState: string = "None";
    replyComment: string = "";
    modifiedDate: string = new Date().toDateString();
    replyModifiedDate: string = new Date().toDateString();
    vertexPoints: VertexPoint[] = [];
    allowedInteractions: string[] = ["None"];
    lineHeadStartStyle: string = "None";
    lineHeadEndStyle: string = "None";
    leaderLength: number = 0;
    fontFamily: string = "Helvetica";
    fontStyle: string = "None";
    alignment: string = "Left";
    defaultText: string = "Free Text";
    fontSize: number = 16;
    fontColor: string = "#000000";
    vertexX1: number = 100;
    vertexY1: number = 100;
    vertexX2: number = 200;
    vertexY2: number = 100;
    stampType: string = "Dynamic";
    stampComment: string = "Approved";
    inkAnnotationType: string = "Syncfusion"
    color: string = '#FFDF56'
    path: string;
    customStampImageSource: string;
    customStampName: string = "Image";
    borderColor: string;
    annotationSelected: boolean = false;
    isInputChange: boolean = false;
    replyComments: Comment[] = [];
    isLocked: boolean = false;
    isPrint: boolean = true;


    public replyMenuItems: MenuItemModel[] = [
        {
            text: 'Edit',

        },
        {
            text: 'Delete',
        }
    ];
    dynamicStamps: DynamicStampItem[] = [
        DynamicStampItem.Approved,
        DynamicStampItem.Confidential,
        DynamicStampItem.NotApproved,
        DynamicStampItem.Received,
        DynamicStampItem.Reviewed,
        DynamicStampItem.Revised
    ];
    signStamps: SignStampItem[] =
        [
            SignStampItem.Accepted,
            SignStampItem.InitialHere,
            SignStampItem.Rejected,
            SignStampItem.SignHere,
            SignStampItem.Witness
        ]
    standardBusinessStamps: StandardBusinessStampItem[] =
        [
            StandardBusinessStampItem.Approved,
            StandardBusinessStampItem.Completed,
            StandardBusinessStampItem.Confidential,
            StandardBusinessStampItem.Draft,
            StandardBusinessStampItem.Final,
            StandardBusinessStampItem.ForComment,
            StandardBusinessStampItem.ForPublicRelease,
            StandardBusinessStampItem.InformationOnly,
            StandardBusinessStampItem.NotApproved,
            StandardBusinessStampItem.NotForPublicRelease,
            StandardBusinessStampItem.PreliminaryResults,
            StandardBusinessStampItem.Void,
        ]
}

/**
 * Default PdfViewer Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'programmatic-operations.html',
    encapsulation: ViewEncapsulation.None,
    // tslint:disable-next-line:max-line-length
    providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService,
        TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService, PageOrganizerService, CheckBoxSelectionService],
    styleUrls: ['pdfviewer.component.css'],
    standalone: true,
    imports: [
        SBActionDescriptionComponent,
        SwitchModule,
        PdfViewerModule,
        SBDescriptionComponent,
        DropDownListModule,
        NumericTextBoxModule,
        TextBoxModule,
        ColorPickerModule,
        ContextMenuModule,
        CheckBoxModule,
        ButtonModule,
        DropDownTreeModule,
        UploaderModule,
        ButtonModule,
        DialogModule,
        FileManagerModule,
        MultiSelectModule
    ],
})

export class ProgrammaticOperationsComponent implements OnInit {
    @ViewChild('pdfviewer')
    public pdfviewerControl: PdfViewerComponent;
    @ViewChild('switch')
    public switch: SwitchComponent;
    @ViewChild('sample')
    public dropDownList: DropDownListComponent;
    @ViewChild('defaultupload')
    public uploadObj: UploaderComponent;
    @ViewChild('contextMenuObj') 
    public contextMenu: ContextMenu;
    @ViewChild('interactionsMultiSelect')
    public interactionsMultiSelect: MultiSelectComponent;
    public document: string = 'https://cdn.syncfusion.com/content/pdf/annotations-v3.pdf';
    public resource: string = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib";

    public toolbarSettings: object = { 
        showTooltip: true,
        toolbarItems: [
            "OpenOption",
            "UndoRedoTool",
            "PageNavigationTool",
            "MagnificationTool",
            "PanTool",
            "SelectionTool",
            "CommentTool",
            "SubmitForm",
            "FormDesignerEditTool",
            "FreeTextAnnotationOption",
            "InkAnnotationOption",
            "ShapeAnnotationOption",
            "StampAnnotation",
            "SignatureOption",
            "SearchOption",
            "PrintOption",
            "DownloadOption"
        ],
        formDesignerToolbarItems: [
            "TextboxTool",
            "PasswordTool",
            "CheckBoxTool",
            "RadioButtonTool",
            "DropdownTool",
            "ListboxTool",
            "DrawSignatureTool",
            "DeleteTool"
        ]
    }
    public isDeleteBoundsDisabled: boolean = false;
    public isDeleteVertexDisabled: boolean = false;
    public vertexTableNumberFormat = NumberFormat.numberFormatter(undefined, {maximumFractionDigits: 0}, undefined); 
    public selectedAnnotation: AnnotationBase = new AnnotationBase();
    public dropImageElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
    public pageCount: number = 1;
    public annotationListFields: Object = { text: 'Text', value: 'ID' };
    public showDeleteAddBoundsButtons: boolean = true;
    public showStrokeProperties: boolean = false;
    public showXYPositionRow: boolean = false;
    public showHeightWidthRow: boolean = false;
    public showX1Y1PositionRow: boolean = true;
    public showX2Y2PositionRow: boolean = true;
    public isLineShape: boolean = true;
    public showAddDeleteVertexButtons: boolean = true;
    public isDistanceAnnotation: boolean = true;
    public showFillColor: boolean = false;
    public isInkAnnotation: boolean = true;
    public isStampClicked: boolean = false;
    public showFreeTextProperties: boolean = true;
    public showFileUploader: boolean = false;
    public commentStatusListfields: object = { text: 'Status' };
    public currentCommentStatus: string = 'None';
    public lineHeadstatusfield: object = { text: 'Type', value: 'Value' };
    public inkAnnotationfield: object = { text: 'Type' };
    public ischeckedReplybox: boolean = false;
    public allowPrint: boolean = true;
    public allowInteractions: boolean = false;
    public currentUpdateAnnotationID: string;
    public currentEditCommentID: string;
    public isEditing: boolean = false;
    public annotationsList: Object[] = [
        { ID: 'Highlight', Text: 'Highlight' },
        { ID: 'Underline', Text: 'Underline' },
        { ID: 'Strikethrough', Text: 'Strikethrough' },
        { ID: 'Squiggly', Text: 'Squiggly' },
        { ID: 'Line', Text: 'Line' },
        { ID: 'Arrow', Text: 'Arrow' },
        { ID: 'Rectangle', Text: 'Rectangle' },
        { ID: 'Circle', Text: 'Circle' },
        { ID: 'Polygon', Text: 'Polygon' },
        { ID: 'Distance', Text: 'Distance' },
        { ID: 'Perimeter', Text: 'Perimeter' },
        { ID: 'Area', Text: 'Area' },
        { ID: 'Radius', Text: 'Radius' },
        { ID: 'Volume', Text: 'Volume' },
        { ID: 'StickyNotes', Text: 'Sticky Notes' },
        { ID: 'Ink', Text: 'Ink' },
        { ID: 'Stamp', Text: 'Stamp' },
        { ID: 'CustomStamp', Text: 'Custom Stamp' },
        { ID: 'FreeText', Text: 'Free Text' },
    ];
    public commentStatusList: object[] = [
        { Status: 'None' },
        { Status: 'Accepted' },
        { Status: 'Cancelled' },
        { Status: 'Completed' },
        { Status: 'Rejected' }
    ];
    public lineHeadstatusList: object[] = [
        { Type: 'None', Value: "None" },
        { Type: 'Closed Arrow', Value: "Arrow" },
        { Type: 'Open Arrow', Value: "OpenArrow" },
        { Type: 'Square', Value: "Square" },
        { Type: 'Diamond', Value: "Diamond" },
        { Type: 'Round', Value: "Circle" }
    ];
    public inkAnnotationDataList: object[] =
        [
            { Type: 'Syncfusion' },
            { Type: 'PdfViewer' },
            { Type: 'Star' }
        ];
    public stampTypeDataList: object[] =
        [
            { Type: 'Dynamic' },
            { Type: 'Sign Here' },
            { Type: 'Standard Business' },
        ];
    public stampTypeDatafields: object = { text: 'Type' }
    public currentstampType: string = 'Dynamic';
    public dynamicstampCommentsList: object[] =
        [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Not Approved', Value: "NotApproved" },
            { Type: 'Received', Value: "Received" },
            { Type: 'Reviewed', Value: "Reviewed" },
            { Type: 'Revised', Value: "Revised" },
        ];
    public sighhereCommentsList: object[] =
        [
            { Type: 'Accepted', Value: "Accepted" },
            { Type: 'Initial Here', Value: "InitialHere" },
            { Type: 'Rejected', Value: "Rejected" },
            { Type: 'Sign Here', Value: "SignHere" },
            { Type: 'Witness', Value: "Witness" },
        ];
    public standardBusinessStampsList: object[] =
        [
            { Type: 'Approved', Value: "Approved" },
            { Type: 'Not Approved', Value: 'NotApproved' },
            { Type: 'Completed', Value: "Completed" },
            { Type: 'Confidential', Value: "Confidential" },
            { Type: 'Draft', Value: "Draft" },
            { Type: 'Final', Value: "Final" },
            { Type: 'For Public Release', Value: "ForPublicRelease" },
            { Type: 'Information Only', Value: "InformationOnly" },
            { Type: 'Not For Public Release', Value: "NotForPublicRelease" },
            { Type: 'Preliminary Results', Value: "PreliminaryResults" },
            { Type: 'Void', Value: "Void" },
            { Type: 'For Comment', Value: "ForComment" }
        ];
    public stampCommentsTypeDatafields: object = { text: 'Type', value: 'Value' }
    public currentCommentsList: object[] = this.dynamicstampCommentsList;
    public freeTextFontFamilyList: object[] =
        [
            { Type: 'Helvetica', Value: 'Helvetica' },
            { Type: 'Courier', Value: 'Courier' },
            { Type: 'Symbol', Value: 'Symbol' },
            { Type: 'Times New Roman', Value: 'TimesNewRoman' }
        ];
    public freetextFontFamilyFields: object = { text: 'Type', value: 'Value' }
    public freeTextAlignmentList: object[] =
        [
            { Type: 'Center', Value: 'Center' },
            { Type: 'Right', Value: 'Right' },
            { Type: 'Left', Value: 'Left' },
            { Type: 'Justify', Value: 'Justify' }
        ];
    public freeTextAlignmentField: object = { text: 'Type', value: 'Value' }
    public freeTextFontStyleList: object[] =
        [
            { Type: 'None', Value: 'None' },
            { Type: 'Bold', Value: 'Bold' },
            { Type: 'Underline', Value: 'Underline' },
            { Type: 'Italic', Value: 'Italic' },
            { Type: 'Strike through', Value: 'Strikethrough' }
        ];
    public freeTextFontStyleFields: object = { text: 'Type', value: 'Value' }
    public showCheckBoxdropdown: boolean;
    public intractionsList: object[] =
        [
            { Type: 'None', Value: "None" },
            { Type: 'Delete', Value: "Delete" },
            { Type: 'Property Change', Value: "PropertyChange" },
            { Type: 'Move', Value: "Move" },
            { Type: 'Select', Value: "Select" },
            { Type: 'Resize', Value: "Resize" },
        ];
    public intractionsListfield: Object = { value: 'Value', text: 'Type' };
    public currentstrokeColor = this.selectedAnnotation.strokeColor;
    public ctrlSwitch: boolean = true;
    public pdfviewerApiPath: Object = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };
    public syncfusionLogo: string = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADJCAMAAABYMS1zAAAAllBMVEX///8rNXz2kh7b3OXQ0d8jLnlMU4wfK3hYXpH5+fvz8/bv7/SRlbYAAGyLj7GMkLBGToqdoLt4fKS1t8vIydoAGHEXJXUMHnP1hAD1jAD9483+9u7707L4sXSDh6s0PoL3oE76xpr4qV/97d/5vov96NYADW/2m0b7zaX2mTv4t3v5uYT83cL4rms+R4YAAGX2kjBubpsmc7m7AAAEKUlEQVR4nO3c6VbiQBAF4Dai7AiikCbIjuyK7/9ykziTCJLuVLUcu5O5938d8x2kUr0chEAQBEEQpBgJbD/A9RLMVnPbz3C1LHw5Gdh+iCtl7Xue3AxtP8ZVMpReGOlNC/DF2Xt/I+U295rlRHoxZ5ZzzXyWWELNZGn7eX6SYHdiidrA3vYT/SBT3zuPXNt+JOOsv1tCzSKnX5y9vLB4nr/N5TQw8NIwnjzksA3MV6mWqKnlrg0EM4UlmgbyNtu8KC2fs43tx2NlobFEnDzNNmst5bMN5EYzzLKEmlVOmtpgo/8n+/fFyUVTW6ob2ZlG5qCpBbpGdhbf/QXbjmoJNTvHZ5sp3ZI521S7oxY93biqwSga3Wr+/ppjyZptaq3XMjm9Rox569Or3p/Ufz51UtZqdPs2tYf+DTl3CaZdplc11Zj5kWnxtAs2q5hANSlr4+9UTc0mRjMp6zWqfRubmK2ZJdRs0lu0RQyrKX/TTBzDEKZLVeQxfWPdGoY0XSosqpnTFka55KdgVK8aSxizpvzPolxEW8LMLvf7qPHVS2hrn4ypRreAttYADF8y2qMBe615aoTRHgxYfGkOjwYfjnbpbHOc2U/YCwD9EYfVqZm4lZHE32ktttczW05T818yNjTsYkRwcVim+R+bZG1nWMakHpcpLJvMPU3rGLGXtC+OzL6CYh8jlqT5mbKf6QDm/PRfFcq5swsYEewyLaRTZycwYVPLOGyiHc+4gYkW0bpzwMym7BZG7DUaSdwvdwYTzjaqN45PvRfoDkbMD+kan3zI5BBGBIs0jU8/N3cJk3rqLDMmZXcxlws21pm5Y5jvCzY54xz8uYYRy8PpzcbsSdlpjAhO9m2OvLN/9zDRbBNzmLcaHcQks41cMOucxIh91NTkjFvmJkYMVlJKdpWjmOi8k3+3xFWMCAxuljiLMUmxMKP3Z3JeWzFm3KRX6a6bXDfVpw4jyWNxihq6i0BX1rBiVPVrFgRBkIKkVmekZlSV9OaAEwNLtfvxSE9ye7bFKPpIXpovjBxMBs1Ws0dOPxln3p7pVV/jjGSEvCd7ivnNQZNzUA4MMMAAAwwwwAADDDDAAAMMMMAAAwwwwAADDDDAAAMMMMAAAwwwwPzvmOcCYVoFwlRLXUZKcRmnqJtcBBoysnb+lxkRBEEQSuq3jNTjKk6RYVUt/Xl1qXbuK/R04qpHRlE7mQAYRZV2SfHEmtQajN+e7T/GmArnt2fjC8TipnedX6xVYxhTc3mUYIxms/GdSRUHwxg0gQEGGGCAAQYYYIABBhhggAEGGGCAAQYYYIABBhhggAEGGGCAAaaImELdA3i9I6f3henTq5pfNzTK9CqjGxqdt3ty2g8x5qNNrxonmAq96H5sgBH1EiPJPdhbTlVyq4lTVDK41YQgCIIgCIIgSFr+AKg+KPUzaG6DAAAAAElFTkSuQmCC";
    public indexValue: number = 0;
    public multiSelectMode: string;
    ngOnInit(): void {
        this.multiSelectMode = "CheckBox";
        this.selectedAnnotation.customStampImageSource = this.syncfusionLogo;
    }
    public change(e: any): void {
        if (e.checked) {
            this.pdfviewerControl.serviceUrl = '';
        }
        else {
            this.pdfviewerControl.serviceUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
        }
        this.pdfviewerControl.dataBind();
        this.pdfviewerControl.load(this.pdfviewerControl.documentPath, null);
    }
    public onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }
    public removeFile() {
        this.selectedAnnotation.customStampImageSource = this.syncfusionLogo;
        this.uploadObj.remove();
    }
    public async onFileSuccess(args: SuccessEventArgs): Promise<void> {
        const fileData = args.file.rawFile;
        if (fileData instanceof Blob) {
            if (args.operation === "remove") {
                this.selectedAnnotation.customStampImageSource = this.syncfusionLogo;
            }
            else {
                this.selectedAnnotation.customStampImageSource = await this.convertBlobToBase64(fileData);
            }
        } else {
            console.error('Unexpected file data type:', typeof fileData);
        }
    }
    private convertBlobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    public onAnnotationChange(args: any): void {
        this.selectedAnnotation.AnnotationType = this.dropDownList.value.toString();   
        switch (this.selectedAnnotation.AnnotationType) {
            case 'Highlight':
            case 'Underline':
            case 'Strikethrough':
            case 'Squiggly':
                {
                    this.showStrokeProperties = true;
                    this.showDeleteAddBoundsButtons = false;
                    this.showFillColor = false;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.showAddDeleteVertexButtons = true;
                    this.isInkAnnotation = true;
                    this.showFreeTextProperties = true;
                    if(this.selectedAnnotation.AnnotationType === 'Highlight')
                    {
                        this.selectedAnnotation.fillColor = "#FFDF56";
                    }
                    else if(this.selectedAnnotation.AnnotationType === 'Strikethrough')
                    {
                        this.selectedAnnotation.fillColor = "#FF0000";
                    }
                    else if(this.selectedAnnotation.AnnotationType === 'Underline')
                    {
                        this.selectedAnnotation.fillColor = "#00FF00";
                    }
                    else if(this.selectedAnnotation.AnnotationType === 'Squiggly')
                    {
                        this.selectedAnnotation.fillColor = "#FF0000";
                    }

                    break;
                }
            case 'Line':
            case 'Arrow':
                {
                    this.showStrokeProperties = false;
                    this.showDeleteAddBoundsButtons = true;
                    this.showFillColor = false;
                    this.showXYPositionRow = true;
                    this.showHeightWidthRow = true;
                    this.showX1Y1PositionRow = false;
                    this.showX2Y2PositionRow = false;
                    this.isLineShape = false;
                    this.isDistanceAnnotation = true;
                    this.showAddDeleteVertexButtons = true;
                    this.isInkAnnotation = true;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'Rectangle':
            case 'Circle':
            case 'Radius':
                {
                    this.showStrokeProperties = false;
                    this.showDeleteAddBoundsButtons = true;
                    this.showFillColor = false;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.isInkAnnotation = true;
                    this.showAddDeleteVertexButtons = true;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'Polygon':
            case 'Perimeter':
            case 'Area':
            case 'Volume':
                {
                    this.showAddDeleteVertexButtons = false;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = true;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.showDeleteAddBoundsButtons = true;
                    this.showStrokeProperties = false;
                    this.showFillColor = false;
                    this.isInkAnnotation = true;
                    this.isLineShape = true;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'Distance':
                {
                    this.showStrokeProperties = false;
                    this.showDeleteAddBoundsButtons = true;
                    this.showFillColor = false;
                    this.showXYPositionRow = true;
                    this.showHeightWidthRow = true;
                    this.showX1Y1PositionRow = false;
                    this.showX2Y2PositionRow = false;
                    this.isLineShape = false;
                    this.isDistanceAnnotation = false;
                    this.showAddDeleteVertexButtons = true;
                    this.isInkAnnotation = true;
                    this.showFreeTextProperties = true;
                    this.selectedAnnotation.vertexPoints.push({ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                        { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 });
                    break;
                }
            case 'StickyNotes':
                {
                    this.showFillColor = true;
                    this.showStrokeProperties = true;
                    this.showDeleteAddBoundsButtons = true;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.isDistanceAnnotation = true;
                    this.isInkAnnotation = true;
                    this.showAddDeleteVertexButtons = true;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'Ink':
                {
                    this.showStrokeProperties = false;
                    this.showDeleteAddBoundsButtons = true;
                    this.showFillColor = false;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.showAddDeleteVertexButtons = true;
                    this.isInkAnnotation = false;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'Stamp':
                {
                    this.showFillColor = true;
                    this.showStrokeProperties = true;
                    this.showDeleteAddBoundsButtons = true;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.isDistanceAnnotation = true;
                    this.isInkAnnotation = true
                    this.showAddDeleteVertexButtons = true;
                    this.showFreeTextProperties = true;
                    break;
                }
            case 'FreeText':
                {
                    this.showStrokeProperties = false;
                    this.showDeleteAddBoundsButtons = true;
                    this.showFillColor = false;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.isInkAnnotation = true;
                    this.showAddDeleteVertexButtons = true;
                    this.showFreeTextProperties = false;
                    break;
                }
            case 'CustomStamp':
                {
                    this.showFillColor = true;
                    this.showStrokeProperties = true;
                    this.showDeleteAddBoundsButtons = true;
                    this.showXYPositionRow = false;
                    this.showHeightWidthRow = false;
                    this.showX1Y1PositionRow = true;
                    this.showX2Y2PositionRow = true;
                    this.isLineShape = true;
                    this.isDistanceAnnotation = true;
                    this.isInkAnnotation = true;
                    this.showAddDeleteVertexButtons = true;
                    this.showFreeTextProperties = true;
                    break;
                }
        }
        if (!isNullOrUndefined(args.e)) {
            this.resetAnnotationProperties();
        }
    }
    public addBounds() {
        this.selectedAnnotation.bounds.push({
            X: this.selectedAnnotation.x,
            Y: this.selectedAnnotation.y,
            Width: this.selectedAnnotation.width,
            Height: this.selectedAnnotation.height
        });
        if (this.selectedAnnotation.bounds.length > 1) {
            this.isDeleteBoundsDisabled = false;
        }
        this.selectedAnnotation.isInputChange = true;      
    }
    public OnBoundsDelete() {
        if (this.selectedAnnotation.bounds.length > 1) {
            this.selectedAnnotation.bounds = this.selectedAnnotation.bounds.slice(0, this.selectedAnnotation.bounds.length - 1);
            this.selectedAnnotation.isInputChange = true;
        }
        if (this.selectedAnnotation.bounds.length <= 1) {
            this.isDeleteBoundsDisabled = true;
        }
        if (this.selectedAnnotation.bounds.length < 1) {
            this.selectedAnnotation.isInputChange = false;
        }
    }
    public addVertex() {
        const newVertex = { x: this.selectedAnnotation.x, y: this.selectedAnnotation.y };
        this.selectedAnnotation.vertexPoints.push(newVertex);
        if (this.selectedAnnotation.vertexPoints.length > 1) {
            this.isDeleteVertexDisabled = false;
        }
        this.selectedAnnotation.isInputChange = true;
    };

    public onintractionvaluechange(event: any) {
        this.selectedAnnotation.allowedInteractions = [];
        this.onpropertiesvaluechanges("allowedInteractions", event);
    }
    public onVertexDelete() {
        if (this.selectedAnnotation.vertexPoints.length > 1) {
            this.selectedAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints.slice(0, this.selectedAnnotation.vertexPoints.length - 1);
            this.selectedAnnotation.isInputChange = true;
        }
        if (this.selectedAnnotation.vertexPoints.length <= 1) {
            this.isDeleteVertexDisabled = true;
            this.selectedAnnotation.isInputChange = false;
        }
    }
    public clearTable() {
        this.selectedAnnotation.vertexPoints = [];
        this.selectedAnnotation.bounds = [];
    }
    public onStampTypeChange(event: ChangeEventArgs) {
        const selectedValue = event.value as string;
        switch (selectedValue) {
            case 'Dynamic':
                this.currentCommentsList = this.dynamicstampCommentsList;
                this.selectedAnnotation.stampType = "Dynamic";
                this.selectedAnnotation.stampComment = "Approved";
                break;
            case 'Sign Here':
                this.currentCommentsList = this.sighhereCommentsList;
                this.selectedAnnotation.stampType = "Sign Here";
                this.selectedAnnotation.stampComment = "Accepted";
                break;
            case 'Standard Business':
                this.currentCommentsList = this.standardBusinessStampsList;
                this.selectedAnnotation.stampType = "Standard Business";
                this.selectedAnnotation.stampComment = "Approved";
                break;
            default:
                this.currentCommentsList = [];
        }
    }
    public onCheckboxChangeReplyBox(event) {
        this.ischeckedReplybox = event.checked
    }
    public onCheckboxChangeIntractionBox(event) {
        this.allowInteractions = event.checked;
        (event as any).value = event.checked;
        if (this.selectedAnnotation.annotationSelected) {
            this.onpropertiesvaluechanges("isLocked", event);
        }
    }
    public onCheckBoxChangePrint(event) {
        this.allowPrint = event.checked;
        (event as any).value = event.checked;
        if (this.selectedAnnotation.annotationSelected) {
            this.onpropertiesvaluechanges("isPrint", event);
        }
    }
    public onpropertiesvaluechanges
        (property: 'stampType' | 'stampComment' | 'pageNumber' | 'x' | 'y' | 'width' | 'height' | 'vertexX1' | 'vertexY1' | 'vertexX2' | 'vertexY2' | 'opacity' | 'thickness' | 'lineHeadStartStyle' | 'lineHeadEndStyle' | 'leaderLength' | 'inkAnnotationType' |
            'defaultText' | 'fontFamily' | 'alignment' | 'fontStyle' | 'fontSize' | 'author' | 'comment' | 'setState' | 'replyAuthor' | 'replyComment' | 'replyState' | 'strokeColor' | 'fillColor' | 'fontColor' | 'color' | 'allowedInteractions' | 'isLocked' | 
            'isPrint' | '', event: any) {
        
        if (!this.selectedAnnotation.isInputChange) {
            if (!isNullOrUndefined(event.isInteracted) && event.isInteracted) {
                this.selectedAnnotation.isInputChange = true;
            }
            // color picker change event
            else if(!isNullOrUndefined(event.event)) {
                this.selectedAnnotation.isInputChange = true;
            }
            else {
                this.selectedAnnotation.isInputChange = false;
            }
            let shapeAnnotation: string = this.selectedAnnotation.AnnotationType;
            if (((property === "x") || (property === "y") || (property === "height") || (property === "width")) && ((shapeAnnotation === "Underline") || (shapeAnnotation === "Strikethrough") || (shapeAnnotation === "Highlight") || (shapeAnnotation === "Squiggly"))) {
                this.selectedAnnotation.isInputChange = false;
            }
            if (((property === "x") || (property === "y")) && ((shapeAnnotation === "Polygon") || (shapeAnnotation === "Area") || (shapeAnnotation === "Perimeter") || (shapeAnnotation === "Volume"))) {
                this.selectedAnnotation.isInputChange = false;
            }
        }
        if(!isNullOrUndefined(event.value)) {
            this.selectedAnnotation[property] = event.value;
        }
        // color picker change event
        else if(!isNullOrUndefined(event.name)) { 
            this.selectedAnnotation[property] = event.name;
        }
        if (event && event.isInteracted && (property === "stampComment" || property === "stampType")) {
            this.resetAnnotationProperties();
        }
    }
    public annotationSettings = () => ({
        offset: { x: this.selectedAnnotation.x, y: this.selectedAnnotation.y },
        isLock: this.allowInteractions,
        isPrint: this.allowPrint,
        pageNumber: this.selectedAnnotation.pageNumber,
        width: this.selectedAnnotation.width,
        height: this.selectedAnnotation.height,
        opacity: Number(this.selectedAnnotation.opacity) / 100,
        thickness: this.selectedAnnotation.thickness,
        strokeColor: this.selectedAnnotation.strokeColor,
        fillColor: this.selectedAnnotation.fillColor,
        bounds: (this.selectedAnnotation.bounds && this.selectedAnnotation.bounds.length > 0) ? this.selectedAnnotation.bounds.map(function (item) { return { x: item.X, y: item.Y, width: item.Width, height: item.Height }; }) :
            [{
                x: this.selectedAnnotation.x,
                y: this.selectedAnnotation.y,
                width: this.selectedAnnotation.width,
                height: this.selectedAnnotation.height
            }],
        vertexPoints: this.selectedAnnotation.vertexPoints,
        fontFamily: this.selectedAnnotation.fontFamily,
        fontStyle: this.selectedAnnotation.fontStyle,
        fontSize: this.selectedAnnotation.fontSize,
        defaultText: this.selectedAnnotation.defaultText,
        alignment: this.selectedAnnotation.alignment,
        author: this.selectedAnnotation.author,
        setState: this.selectedAnnotation.setState,
        note: this.selectedAnnotation.comment,
        notes: this.selectedAnnotation.comment,
        comments: this.selectedAnnotation.replyComments,
        replyAuthor: this.selectedAnnotation.replyAuthor,
        replyState: this.selectedAnnotation.replyState,
        replyComment: this.selectedAnnotation.replyComment,
        modifiedDate: this.selectedAnnotation.modifiedDate,
        replyModifiedDate: this.selectedAnnotation.replyModifiedDate,
        lineHeadEndStyle: this.pdfviewerControl.annotation.getArrowString(this.selectedAnnotation.lineHeadEndStyle as DecoratorShapes),
        lineHeadStartStyle: this.pdfviewerControl.annotation.getArrowString(this.selectedAnnotation.lineHeadStartStyle as DecoratorShapes),
        leaderLength: this.selectedAnnotation.leaderLength,
        inkAnnotationType: this.selectedAnnotation.inkAnnotationType,
        color: this.selectedAnnotation.fillColor,
        allowedInteractions: this.selectedAnnotation.allowedInteractions,
        dynamicStamps: this.selectedAnnotation.dynamicStamps,
        signStamps: this.selectedAnnotation.signStamps,
        standardBusinessStamps: this.selectedAnnotation.standardBusinessStamps,
        path: this.selectedAnnotation.path,
        fontColor: this.selectedAnnotation.fontColor,
        borderColor: this.selectedAnnotation.strokeColor,
        customStamps: [{
            customStampImageSource: this.selectedAnnotation.customStampImageSource,
            customStampName: this.selectedAnnotation.customStampName,
        }]
    });
    public addNewAnnotation(): void {
        let currentannotationSettings: any;
        currentannotationSettings = this.annotationSettings();
        if (this.selectedAnnotation.AnnotationType === "Highlight") {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Underline') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Strikethrough') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Squiggly') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Line') {
            this.selectedAnnotation.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings = this.annotationSettings();
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.AnnotationType === 'Arrow') {
            this.selectedAnnotation.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings = this.annotationSettings();
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.AnnotationType === 'Rectangle') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'Circle') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'Polygon') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = [{ x: 100, y: 39 }, { x: 142, y: 10 }, { x: 189, y: 38 }, { x: 178, y: 81 }, { x: 111, y: 81 }, { x: 100, y: 39 }];
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = this.selectedAnnotation.vertexPoints[0];
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Distance') {
            this.selectedAnnotation.vertexPoints = [{ x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1 },
                { x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2 }];
            currentannotationSettings = this.annotationSettings();
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
            this.selectedAnnotation.vertexPoints = [];
        }
        else if (this.selectedAnnotation.AnnotationType === 'Perimeter') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = [{ x: 100, y: 100 }, { x: 185, y: 100 }, { x: 186, y: 162 }];
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = this.selectedAnnotation.vertexPoints[0];
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Area') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = [{ x: 100, y: 100 }, { x: 188, y: 99 }, { x: 189, y: 153 }, { x: 100, y: 100 }];
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = this.selectedAnnotation.vertexPoints[0];
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'Radius') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'Volume') {
            if (this.selectedAnnotation.vertexPoints.length === 0) {
                this.selectedAnnotation.vertexPoints = [{ x: 100, y: 100 }, { x: 100, y: 209 }, { x: 220, y: 209 }, { x: 220, y: 99 }, { x: 100, y: 100 }];
                currentannotationSettings = this.annotationSettings();
            }
            currentannotationSettings.offset = this.selectedAnnotation.vertexPoints[0];
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings);
        }
        else if (this.selectedAnnotation.AnnotationType === 'FreeText') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'Stamp') {
            currentannotationSettings.customStamps = null;
            if (this.selectedAnnotation.stampType === 'Dynamic') {
                if (this.selectedAnnotation.dynamicStamps) {
                    const selectedStampItem = this.selectedAnnotation.dynamicStamps.find((stamp: DynamicStampItem) => stamp === this.selectedAnnotation.stampComment);

                    if (selectedStampItem) {
                        this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType,currentannotationSettings, selectedStampItem)
                    }
                }
            }
            else if (this.selectedAnnotation.stampType === "Sign Here") {
                if (this.selectedAnnotation.signStamps) {
                    const selectedStampItem = this.selectedAnnotation.signStamps.find(
                        (stamp: SignStampItem) => stamp === this.selectedAnnotation.stampComment);

                    if (selectedStampItem) {
                        this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings, null, selectedStampItem);
                    }
                }
            }
            else if (this.selectedAnnotation.stampType === "Standard Business") {
                if (this.selectedAnnotation.signStamps) {
                    const selectedStampItem = this.selectedAnnotation.standardBusinessStamps.find((stamp: StandardBusinessStampItem) => stamp === this.selectedAnnotation.stampComment);

                    if (selectedStampItem) {
                        this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings, null, null, selectedStampItem);
                    }
                }
            }
        }
        else if (this.selectedAnnotation.AnnotationType === 'Ink') {
            if (this.selectedAnnotation.inkAnnotationType === "Syncfusion") {
                this.selectedAnnotation.path = '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'

            }
            else if (this.selectedAnnotation.inkAnnotationType === "PdfViewer") {
                this.selectedAnnotation.path = `M10,50 L10,65 M10,50 L25,50 L25,57.5 L10,57.5
                M40,50 L40,65 M40,50 L43,50 L55,55 L55,60 L43,65 L40,65
                M80,50 L80,65 M80,50 L95,50 M80,57.5 L95,57.5
                M110,50 L125,65 L140,50
                M160,50 L160,65 M155,50 L165,50 M155,65 L165,65
                M182,50 L182,65 M182,50 L197,50 M182,57.5 L197,57.5 M182,65 L197,65 
                M205,50 L215,65 L225,50 L235,65 L245,50
                M255,50 L255,65 M255,50 L270,50 M255,57.5 L270,57.5 M255,65 L270,65
                M295,50 L295,65 M295,50 L305,50 L305,57.5 L295,57.5 M295,57.5 L305,65`;
            }
            else if (this.selectedAnnotation.inkAnnotationType === "Star") {
                this.selectedAnnotation.path = '[{\"command\":\"M\",\"x\":72,\"y\":200},{\"command\":\"L\",\"x\":79,\"y\":65},{\"command\":\"L\",\"x\":92,\"y\":200},{\"command\":\"L\",\"x\":65,\"y\":110},{\"command\":\"L\",\"x\":95,\"y\":110},{\"command\":\"L\",\"x\":72,\"y\":200}]';
            }
            currentannotationSettings = this.annotationSettings();
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'StickyNotes') {
            this.pdfviewerControl.annotation.addAnnotation(this.selectedAnnotation.AnnotationType, currentannotationSettings)
        }
        else if (this.selectedAnnotation.AnnotationType === 'CustomStamp') {
            this.pdfviewerControl.annotation.addAnnotation("Stamp", currentannotationSettings)
        }

        let newlyAddedAnnotation = this.pdfviewerControl.annotationCollection[this.pdfviewerControl.annotationCollection?.length - 1];
        if (newlyAddedAnnotation) {
            this.updateAnnotationComments(newlyAddedAnnotation);
            this.pdfviewerControl.annotation.editAnnotation(newlyAddedAnnotation);           
        }
        this.selectedAnnotation.annotationSelected = false;
        this.selectedAnnotation.replyComments = [];
    }
    public AnnotationSelectedEvent(annotationSelectEventArgs: AnnotationSelectEventArgs) {
        this.pdfviewerControl.enableCommentPanel = true;
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationSelectEventArgs.annotationId;
        let currentAnnotation = this.getAnnotationByID(this.currentUpdateAnnotationID);
        if (!isNullOrUndefined(currentAnnotation)) {
            this.updatePropertiesToPanel(currentAnnotation);
        }
    }
    public annotationUnSelectedEvent() {
        this.pdfviewerControl.enableCommentPanel = false;
        this.selectedAnnotation.annotationSelected = false;
        this.resetAnnotationProperties();
    }
    private updatePropertiesToPanel(currentannotation: any) {

        this.selectedAnnotation.pageNumber = currentannotation.pageNumber + 1;
        this.selectedAnnotation.fillColor = currentannotation.fillColor;
        this.selectedAnnotation.strokeColor = currentannotation.strokeColor;

        if (currentannotation.textMarkupAnnotationType === "Highlight" || currentannotation.textMarkupAnnotationType === "Underline" || currentannotation.textMarkupAnnotationType === "Strikethrough" || currentannotation.textMarkupAnnotationType === "Squiggly") {
            this.selectedAnnotation.AnnotationType = currentannotation.textMarkupAnnotationType;
        }

        else if (currentannotation.shapeAnnotationType === "Square" && currentannotation.subject === "Rectangle") {
            this.selectedAnnotation.AnnotationType = "Rectangle";
        }
        else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.subject === "Arrow") {
            this.selectedAnnotation.AnnotationType = "Arrow";
        }
        else if (currentannotation.shapeAnnotationType === "sticky") {
            this.selectedAnnotation.AnnotationType = "StickyNotes";
        }
        else if (currentannotation.shapeAnnotationType === 'stamp') {
            if (currentannotation.stampAnnotationType) {
                if (currentannotation.stampAnnotationType === 'image') {
                    this.selectedAnnotation.AnnotationType = "CustomStamp";
                    this.showFileUploader = true;
                }
                else if(currentannotation.stampAnnotationType === 'path') {
                    this.selectedAnnotation.AnnotationType = 'Stamp';
                }
            }
            else {
                this.selectedAnnotation.AnnotationType = 'Stamp';
            }
            this.isStampClicked = true;
        }

        else if (currentannotation.shapeAnnotationType === "Line" || currentannotation.shapeAnnotationType === "Polyline" || currentannotation.shapeAnnotationType === "Square" || currentannotation.shapeAnnotationType === "Circle" || currentannotation.shapeAnnotationType === "Polygon" && currentannotation.indent) {
            this.selectedAnnotation.vertexPoints = currentannotation.vertexPoints
            if (currentannotation.indent === "LineDimension") {
                this.selectedAnnotation.AnnotationType = "Distance";
            }
            else if (currentannotation.indent === "PolyLineDimension") {
                this.selectedAnnotation.AnnotationType = "Perimeter";
            }
            else if (currentannotation.indent === "PolyLineDimension" && currentannotation.subject === "Arrow") {
                this.selectedAnnotation.AnnotationType = "Arrow";
            }
            else if (currentannotation.indent === "PolygonDimension") {
                this.selectedAnnotation.AnnotationType = "Area";
            }
            else if (currentannotation.indent === "PolygonRadius") {
                this.selectedAnnotation.AnnotationType = "Radius";
            }
            else if (currentannotation.indent === "PolygonVolume") {
                this.selectedAnnotation.AnnotationType = "Volume";
            }
            else if (currentannotation.shapeAnnotationType === "Line" && currentannotation.shapeAnnotationType === currentannotation.subject){
                this.selectedAnnotation.AnnotationType = "Line";
            }
            else if (currentannotation.shapeAnnotationType === "Circle" && currentannotation.shapeAnnotationType === currentannotation.subject){
                this.selectedAnnotation.AnnotationType = "Circle";
            }
        }
        else {
            this.selectedAnnotation.AnnotationType = currentannotation.shapeAnnotationType;

            if (currentannotation.shapeAnnotationType === "Polygon") {
                this.selectedAnnotation.vertexPoints = currentannotation.vertexPoints;
            }
        }
        
        if (currentannotation.fillColor) {
            this.selectedAnnotation.fillColor = currentannotation.fillColor;
        }
        if (this.selectedAnnotation.AnnotationType === "Highlight" || this.selectedAnnotation.AnnotationType === "Underline" || this.selectedAnnotation.AnnotationType === "Strikethrough" || this.selectedAnnotation.AnnotationType === "Squiggly") {
            if (currentannotation.bounds[0] && currentannotation.bounds[0].X && currentannotation.bounds[0].Y && currentannotation.bounds[0].Width && currentannotation.bounds[0].Height) {
                this.selectedAnnotation.bounds = currentannotation.bounds;
                this.selectedAnnotation.width = currentannotation.bounds[0].Width;
                this.selectedAnnotation.height = currentannotation.bounds[0].Height;
                this.selectedAnnotation.x = currentannotation.bounds[0].X;
                this.selectedAnnotation.y = currentannotation.bounds[0].Y;
            }
            else if (currentannotation.annotationAddMode && currentannotation.annotationAddMode === "UI Drawn Annotation") {
                this.selectedAnnotation.fillColor = currentannotation.color;
                let annotBounds = currentannotation.bounds;
                this.selectedAnnotation.bounds = [];
                let totalWidth = 0, startX = 0, startY = 0;
                if (annotBounds?.length > 1) {
                    this.selectedAnnotation.x = annotBounds[0].left;
                    this.selectedAnnotation.y = annotBounds[0].top;
                    this.selectedAnnotation.height = annotBounds[0].height;
                    let isFirstBound = true;
                    let left = annotBounds[0].left, top = annotBounds[0].top;
                    startX = annotBounds[0].left, startY = annotBounds[0].top;
                    let width = annotBounds[0].width, height = annotBounds[0].height;
                    annotBounds.forEach((element, index, array) => {
                        left = element.left;
                        width = element.width;
                        height = element.height;
                        if (top !== element.top) {
                            if (isFirstBound) {
                                this.selectedAnnotation.width = totalWidth;
                                isFirstBound = false;
                            }
                            this.selectedAnnotation.bounds.push({
                                X: startX,
                                Y: startY,
                                Width: totalWidth,
                                Height: height
                            });
                            totalWidth = 0;
                            top = element.top;
                            startX = element.left;
                            startY = element.top;
                        }
                        totalWidth += element.width;
                    });
                    if (totalWidth > 0) {
                        this.selectedAnnotation.bounds.push({
                            X: startX,
                            Y: startY,
                            Width: totalWidth,
                            Height: annotBounds[annotBounds.length - 1].height
                        });
                        if (isFirstBound) {
                            this.selectedAnnotation.width = totalWidth;
                            isFirstBound = false;
                        }
                    }
                }
                else {
                    this.selectedAnnotation.bounds = {
                        X: currentannotation.bounds[0].left,
                        Y: currentannotation.bounds[0].top,
                        Height: currentannotation.bounds[0].height,
                        Width: currentannotation.bounds[0].width
                    } as any;
                    this.selectedAnnotation.width = currentannotation.bounds[0].width;
                    this.selectedAnnotation.height = currentannotation.bounds[0].height;
                    this.selectedAnnotation.x = currentannotation.bounds[0].left;
                    this.selectedAnnotation.y = currentannotation.bounds[0].top;
                }
            }
            else {
                this.selectedAnnotation.bounds = currentannotation.bounds;
                this.selectedAnnotation.width = currentannotation.bounds[0].Width;
                this.selectedAnnotation.height = currentannotation.bounds[0].Height;
                this.selectedAnnotation.x = currentannotation.bounds[0].X;
                this.selectedAnnotation.y = currentannotation.bounds[0].Y;
            }
            this.selectedAnnotation.fillColor = currentannotation.color;
            if (this.selectedAnnotation.bounds.length > 1) {
                this.isDeleteBoundsDisabled = false;
            }
        }
        else if (this.selectedAnnotation.AnnotationType === "Line" || this.selectedAnnotation.AnnotationType === "Arrow" || this.selectedAnnotation.AnnotationType === "Distance") {
            this.selectedAnnotation.vertexX1 = currentannotation.vertexPoints[0].x;
            this.selectedAnnotation.vertexY1 = currentannotation.vertexPoints[0].y;
            this.selectedAnnotation.vertexX2 = currentannotation.vertexPoints[1].x;
            this.selectedAnnotation.vertexY2 = currentannotation.vertexPoints[1].y;
            this.selectedAnnotation.vertexPoints = [] as VertexPoint[];
            if (this.selectedAnnotation.AnnotationType === "Distance") {
                this.selectedAnnotation.leaderLength = currentannotation.leaderLength as number;
            } 
        }
        else if (this.selectedAnnotation.AnnotationType === "Ink") {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.x;
            this.selectedAnnotation.y = currentannotation.bounds.y;
        }
        else if (this.selectedAnnotation.AnnotationType === "FreeText") {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.left;
            this.selectedAnnotation.y = currentannotation.bounds.top;
            this.selectedAnnotation.defaultText = currentannotation.dynamicText;
            this.selectedAnnotation.fontFamily = currentannotation.fontFamily;
            this.selectedAnnotation.alignment = currentannotation.textAlign;
            this.selectedAnnotation.fontSize = currentannotation.fontSize;
            this.selectedAnnotation.fontColor = currentannotation.fontColor;
            if (currentannotation.font) {
                if (currentannotation.font.isBold) {
                    this.selectedAnnotation.fontStyle = "Bold";
                }
                else if (currentannotation.font.isItalic) {
                    this.selectedAnnotation.fontStyle = "Italic";    
                }
                else if (currentannotation.font.isUnderline) {
                    this.selectedAnnotation.fontStyle = "Underline";
                }
                else if (currentannotation.font.isStrikeout) {
                    this.selectedAnnotation.fontStyle = "Strikethrough";
                }
                else {
                    this.selectedAnnotation.fontStyle = "None";
                }
            }
            else {
                this.selectedAnnotation.fontStyle = "None";
            }
        }
        else {
            this.selectedAnnotation.width = currentannotation.bounds.width;
            this.selectedAnnotation.height = currentannotation.bounds.height;
            this.selectedAnnotation.x = currentannotation.bounds.left;
            this.selectedAnnotation.y = currentannotation.bounds.top;
        }
        this.selectedAnnotation.isPrint = currentannotation.isPrint ?? false;
        if (currentannotation.isLocked) {
            this.selectedAnnotation.isLocked = currentannotation.isLocked;
            this.selectedAnnotation.allowedInteractions = currentannotation.allowedInteractions;
        }
        else {
            this.selectedAnnotation.isLocked = false;
            this.selectedAnnotation.allowedInteractions = ["None"];
        }
        if (currentannotation.lineHeadStartStyle && currentannotation.lineHeadEndStyle) {
            this.selectedAnnotation.lineHeadStartStyle = currentannotation.lineHeadStartStyle;
            this.selectedAnnotation.lineHeadEndStyle = currentannotation.lineHeadEndStyle;
        }
        else if (currentannotation.lineHeadStart && currentannotation.lineHeadEnd) {
            this.selectedAnnotation.lineHeadStartStyle = this.pdfviewerControl.annotation.getArrowType(currentannotation.lineHeadStart);
            this.selectedAnnotation.lineHeadEndStyle = this.pdfviewerControl.annotation.getArrowType(currentannotation.lineHeadEnd);
        }
        else {
            if (this.selectedAnnotation.AnnotationType === "Line") {
                this.selectedAnnotation.lineHeadStartStyle = "None";
                this.selectedAnnotation.lineHeadEndStyle = "None";
            }
            else {
                this.selectedAnnotation.lineHeadStartStyle = "Arrow";
                this.selectedAnnotation.lineHeadEndStyle = "Arrow";
            }
        }
        this.selectedAnnotation.opacity = (Number(currentannotation.opacity) < 0 || Number(currentannotation.opacity) >= 1) ? 100 : Number(currentannotation.opacity) * 100;
        this.selectedAnnotation.thickness = currentannotation.thickness;
        this.selectedAnnotation.strokeColor = currentannotation.strokeColor;
        if (this.selectedAnnotation.AnnotationType === "Polygon" || this.selectedAnnotation.AnnotationType === "Perimeter" ||
            this.selectedAnnotation.AnnotationType === "Area" || this.selectedAnnotation.AnnotationType === "Volume") {
            this.selectedAnnotation.vertexPoints = currentannotation.vertexPoints;
        }
        this.selectedAnnotation.isInputChange = false;
        if (!isNullOrUndefined(currentannotation.note)) {
            this.selectedAnnotation.comment = currentannotation.note;
        }
        else if(!isNullOrUndefined(currentannotation.notes)) {
            this.selectedAnnotation.comment = currentannotation.notes;
        }
        else {
            this.selectedAnnotation.comment = "";
        }
        this.selectedAnnotation.author = currentannotation.review.author;
        this.selectedAnnotation.modifiedDate = currentannotation.modifiedDate;
        this.selectedAnnotation.setState = currentannotation.state;
        
        this.selectedAnnotation.replyComments = [] as Comment[];
        if (this.selectedAnnotation.replyComments.length === 0 && currentannotation.comments) {
            if (currentannotation.comments.length > 0) {
                currentannotation.comments.forEach(element => {
                    let reply = new Comment();
                    reply.id = element.annotName,
                    reply.author = element.author,
                    reply.note = element.note,
                    reply.modifiedDate = element.modifiedDate,
                    reply.state = element.state
                    this.selectedAnnotation.replyComments.push(reply);
                });
            }
        }
        if (this.selectedAnnotation.replyComments.length === 0 && currentannotation.replyComment) {
            if (currentannotation.replyComment.length > 0) {
                currentannotation.replyComment.forEach(element => {
                    let reply = new Comment();
                    reply.id = this.generateUniqueId();
                    reply.author = this.selectedAnnotation.replyAuthor;
                    reply.note = element;
                    reply.modifiedDate = new Date().toDateString();
                    reply.state = 'None';
                    this.selectedAnnotation.replyComments.push(reply);
                });
            }
        }
        if (!isNullOrUndefined(this.selectedAnnotation.vertexPoints) && this.selectedAnnotation.vertexPoints.length > 1) {
            this.isDeleteVertexDisabled = false;
        }        
    }
    public onAnnotationMoved(annotationMoveEventArgs: AnnotationMoveEventArgs) {
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationMoveEventArgs.annotationId;
        let currentAnnotation = this.getAnnotationByID(this.currentUpdateAnnotationID);
        if (!isNullOrUndefined(currentAnnotation)) {
            currentAnnotation.bounds = annotationMoveEventArgs.currentPosition;
            this.updatePropertiesToPanel(currentAnnotation);
        }
    }
    public onAnnotationResized(annotationResizeEventArgs: AnnotationResizeEventArgs) {
        this.selectedAnnotation.annotationSelected = true;
        this.currentUpdateAnnotationID = annotationResizeEventArgs.annotationId;
        let currentAnnotation = this.getAnnotationByID(this.currentUpdateAnnotationID);
        if (!isNullOrUndefined(currentAnnotation)) {
            currentAnnotation.bounds = annotationResizeEventArgs.annotationBound;
            this.updatePropertiesToPanel(currentAnnotation);
        }
    }
    public reset() {
        this.resetAnnotationProperties();
        if (this.selectedAnnotation.annotationSelected) {
            this.showFileUploader = false;
            this.isStampClicked = false;
        }
    }
    public resetAnnotationProperties() {
        const selectedAnnotation = this.selectedAnnotation;
        const ShapeAnnotation: string = selectedAnnotation.AnnotationType;
        selectedAnnotation.x = 100;
        selectedAnnotation.y = 100;
        selectedAnnotation.fillColor = "#FFFFFF00";
        selectedAnnotation.strokeColor = "#FF0000FF";
        if (ShapeAnnotation == "Perimeter") {
            selectedAnnotation.lineHeadStartStyle = "OpenArrow";
            selectedAnnotation.lineHeadEndStyle = "OpenArrow";
        }

        if (ShapeAnnotation == "Rectangle" || ShapeAnnotation == "Circle" || ShapeAnnotation == "Radius") {
            selectedAnnotation.width = 100;
            selectedAnnotation.height = 100;
        }
        else if (ShapeAnnotation == "Ink") {
            selectedAnnotation.width = 150;
            selectedAnnotation.height = 60;
        }
        else if (ShapeAnnotation == "FreeText") {
            selectedAnnotation.width = 150;
            selectedAnnotation.height = 26.5;
            selectedAnnotation.fontFamily = "Helvetica";
            selectedAnnotation.fontStyle = "None";
            selectedAnnotation.alignment = "Left";
            selectedAnnotation.defaultText = "Free Text";
            selectedAnnotation.fontSize = 16;
            selectedAnnotation.fontColor = "#000000FF";
        }
        else if (ShapeAnnotation == "StickyNotes") {
            selectedAnnotation.width = 30;
            selectedAnnotation.height = 30;
        }
        else if (ShapeAnnotation == "Stamp") {
            if (selectedAnnotation.stampType == "Dynamic") {
                selectedAnnotation.width = 140;
                selectedAnnotation.height = 55;
            }
            else if (selectedAnnotation.stampType === "Sign Here") {
                switch (selectedAnnotation.stampComment) {
                    case "SignHere" : {
                        selectedAnnotation.width = 110;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "Witness" : {
                        selectedAnnotation.width = 130;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "InitialHere" : {
                        selectedAnnotation.width = 90;
                        selectedAnnotation.height = 30;
                        break;
                    }
                    case "Accepted" :
                    case "Rejected" : {
                        selectedAnnotation.width = 35;
                        selectedAnnotation.height = 35;
                        break;
                    }
                }
            }
            else if (selectedAnnotation.stampType === "Standard Business") {
                selectedAnnotation.height = 30;
                switch (selectedAnnotation.stampComment) {
                    case "Final" :
                    case "Draft" : {
                        selectedAnnotation.width = 110;
                        break;
                    }
                    case "Void" : {
                        selectedAnnotation.width = 100;
                        break;
                    }
                    default : {
                        selectedAnnotation.width = 130;
                        break;
                    }
                } 
            }
        }
        else if (ShapeAnnotation == "CustomStamp") {
            selectedAnnotation.width = 100;
            selectedAnnotation.height = 100;
        }
        else if ((ShapeAnnotation === "Highlight") || (ShapeAnnotation === "Underline") || (ShapeAnnotation === "Strikethrough") || (ShapeAnnotation === "Squiggly")) {

            selectedAnnotation.width = 100;
            selectedAnnotation.height = 14;
        }
        else if ((ShapeAnnotation == "Line")) {
            selectedAnnotation.lineHeadStartStyle = "None";
            selectedAnnotation.lineHeadEndStyle = "None";
        }
        else if (ShapeAnnotation == "Arrow") {
            selectedAnnotation.lineHeadStartStyle = "Arrow";
            selectedAnnotation.lineHeadEndStyle = "Arrow";
        }
        else if (ShapeAnnotation == 'Distance') {
            selectedAnnotation.leaderLength = 0;
            selectedAnnotation.lineHeadStartStyle = "Arrow";
            selectedAnnotation.lineHeadEndStyle = "Arrow";
        }
        else {
            selectedAnnotation.width = 0;
            selectedAnnotation.height = 0;
        }
        if (ShapeAnnotation === "Distance") {
            selectedAnnotation.leaderLength = 0;
        }
        if ((ShapeAnnotation === "Highlight") || (ShapeAnnotation === "Underline") || (ShapeAnnotation === "Strikethrough") || (ShapeAnnotation === "Squiggly") || (ShapeAnnotation === "FreeText")) {
            selectedAnnotation.x = 10;
            selectedAnnotation.y = 10;
            if (ShapeAnnotation === 'Highlight') {
                selectedAnnotation.fillColor = "#FFDF56FF";
            }
            else if (ShapeAnnotation === 'Underline') {
                selectedAnnotation.fillColor = "#00FF00FF";
            }
            else if (ShapeAnnotation === 'Strikethrough') {
                selectedAnnotation.fillColor = "#FF0000FF";
            }
            else if (ShapeAnnotation === 'Squiggly') {
                selectedAnnotation.fillColor = "#FF0000FF";
            }
            else {
                selectedAnnotation.fillColor = "#FFFFFF00";
            }
            selectedAnnotation.strokeColor = "#FFFFFF00";
        }
        selectedAnnotation.opacity = 100;
        selectedAnnotation.thickness = 1;
        selectedAnnotation.author = "Guest";
        selectedAnnotation.setState = "None";
        selectedAnnotation.comment = "";
        selectedAnnotation.replyAuthor = "Guest";
        selectedAnnotation.replyState = "None";
        selectedAnnotation.replyComment = "";
        selectedAnnotation.vertexX1 = 100;
        selectedAnnotation.vertexX2 = 200;
        selectedAnnotation.vertexY1 = 100;
        selectedAnnotation.vertexY2 = 100;
        selectedAnnotation.vertexPoints = [];
        selectedAnnotation.bounds = [];
        selectedAnnotation.replyComments = [];
        selectedAnnotation.isPrint = true;
        selectedAnnotation.isLocked = false;
        selectedAnnotation.allowedInteractions = ["None"];
        selectedAnnotation.customStampImageSource = this.syncfusionLogo;
        this.uploadObj.clearAll();
        this.allowInteractions = false;
        this.allowPrint = true;
        this.ischeckedReplybox = false;
        this.isStampClicked = false;
        this.showFileUploader = false;
    }
    public updateChangesAnnotation() {
        let annotation = this.getAnnotationByID(this.currentUpdateAnnotationID);
        if (!isNullOrUndefined(annotation)) {
            let updatedValues = this.annotationUpdate(annotation)
            this.pdfviewerControl.annotation.editAnnotation(updatedValues);
            this.selectedAnnotation.isInputChange = false;
        }
    }
    public annotationUpdate(annotation: any) {
        let currentAnnotation = annotation;
        if (currentAnnotation.textMarkupAnnotationType === "Highlight" || currentAnnotation.textMarkupAnnotationType === "Underline" || currentAnnotation.textMarkupAnnotationType === "Strikethrough" || currentAnnotation.textMarkupAnnotationType === "Squiggly") {
            currentAnnotation.bounds = [];
            currentAnnotation.color = this.selectedAnnotation.fillColor;
            if (this.selectedAnnotation.bounds?.length == 0) {
                currentAnnotation.bounds.push({
                    X: this.selectedAnnotation.x,
                    Y: this.selectedAnnotation.y,
                    Height: this.selectedAnnotation.height,
                    Width: this.selectedAnnotation.width,
                    Top: this.selectedAnnotation.y,
                    Left: this.selectedAnnotation.x
                });
            }
            else if (this.selectedAnnotation.bounds.length >= 1) {
                this.selectedAnnotation.bounds.forEach((value, index: number, array) => {
                    currentAnnotation.bounds.push({
                        X: this.selectedAnnotation.bounds[index].X,
                        Y: this.selectedAnnotation.bounds[index].Y,
                        Height: this.selectedAnnotation.bounds[index].Height,
                        Width: this.selectedAnnotation.bounds[index].Width,
                        Top: this.selectedAnnotation.bounds[index].Y,
                        Left: this.selectedAnnotation.bounds[index].X
                    });
                })
            }
        }
        else if (this.selectedAnnotation.AnnotationType === "Ink") {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.x = this.selectedAnnotation.x;
            currentAnnotation.bounds.y = this.selectedAnnotation.y;
        }

        else if (this.selectedAnnotation.AnnotationType === "FreeText")
        {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.left = this.selectedAnnotation.x;
            currentAnnotation.bounds.top = this.selectedAnnotation.y;
            currentAnnotation.bounds.x = this.selectedAnnotation.x;
            currentAnnotation.bounds.y = this.selectedAnnotation.y;
            currentAnnotation.dynamicText = this.selectedAnnotation.defaultText;
            currentAnnotation.textAlign = this.selectedAnnotation.alignment;
            currentAnnotation.fontFamily = this.selectedAnnotation.fontFamily;
            currentAnnotation.fontSize = this.selectedAnnotation.fontSize;
            currentAnnotation.fontColor = this.selectedAnnotation.fontColor;
            currentAnnotation.font.isBold = false;
            currentAnnotation.font.isUnderline = false;
            currentAnnotation.font.isItalic = false;
            currentAnnotation.font.isStrikeout = false;
            switch(this.selectedAnnotation.fontStyle) {
                case "Bold" : {
                    currentAnnotation.font.isBold = true;
                    break;
                }
                case "Underline" : {
                    currentAnnotation.font.isUnderline = true;
                    break;
                }
                case "Italic" : {
                    currentAnnotation.font.isItalic = true;
                    break;
                }
                case "Strikethrough" : {
                    currentAnnotation.font.isStrikeout = true;
                    break;
                }
            }
        }
        else if (this.selectedAnnotation.AnnotationType === "Line" || this.selectedAnnotation.AnnotationType === "Arrow" || this.selectedAnnotation.AnnotationType === "Distance" ) {
            currentAnnotation.vertexPoints[0] = {x: this.selectedAnnotation.vertexX1, y: this.selectedAnnotation.vertexY1};
            currentAnnotation.vertexPoints[1] = {x: this.selectedAnnotation.vertexX2, y: this.selectedAnnotation.vertexY2};
            
            currentAnnotation.lineHeadStartStyle = this.selectedAnnotation.lineHeadStartStyle as DecoratorShapes;
            currentAnnotation.lineHeadEndStyle = this.selectedAnnotation.lineHeadEndStyle as DecoratorShapes;
            currentAnnotation.offset = { x: currentAnnotation.vertexPoints[0].x, y: currentAnnotation.vertexPoints[0].y };
            if (this.selectedAnnotation.AnnotationType === "Line") {
                currentAnnotation.subType = 'Line';
            }
            else if (this.selectedAnnotation.AnnotationType === "Arrow") {
                currentAnnotation.subType = 'Arrow';
            }
            else if (this.selectedAnnotation.AnnotationType === "Distance") {
                currentAnnotation.subType = "Distance";
            }
        }
        else {
            currentAnnotation.bounds.width = this.selectedAnnotation.width;
            currentAnnotation.bounds.height = this.selectedAnnotation.height;
            currentAnnotation.bounds.left = this.selectedAnnotation.x;
            currentAnnotation.bounds.top = this.selectedAnnotation.y;
            if (!isNullOrUndefined(currentAnnotation.bounds.x) && !isNullOrUndefined(currentAnnotation.bounds.y)) {
                currentAnnotation.bounds.x = this.selectedAnnotation.x;
                currentAnnotation.bounds.y = this.selectedAnnotation.y;
            }
        }
        if (this.selectedAnnotation.AnnotationType === "Distance") {
            currentAnnotation.leaderLength = this.selectedAnnotation.leaderLength;
        }
        else {
            currentAnnotation.leaderLength = 0;
        }
        if (this.selectedAnnotation.AnnotationType === "Polygon" || this.selectedAnnotation.AnnotationType === "Perimeter" ||
            this.selectedAnnotation.AnnotationType === "Area" || this.selectedAnnotation.AnnotationType === "Volume") {
            currentAnnotation.vertexPoints = this.selectedAnnotation.vertexPoints;
        }
        currentAnnotation.fillColor = this.selectedAnnotation.fillColor;            
        currentAnnotation.opacity = Number(this.selectedAnnotation.opacity) / 100;
        currentAnnotation.thickness = this.selectedAnnotation.thickness;
        currentAnnotation.strokeColor = this.selectedAnnotation.strokeColor;
        currentAnnotation.isPrint = this.selectedAnnotation.isPrint;
        if (this.selectedAnnotation.isLocked) {
            currentAnnotation.isLocked = true;
            currentAnnotation.annotationSettings.isLock = true;
            currentAnnotation.allowedInteractions = this.selectedAnnotation.allowedInteractions;
            if (currentAnnotation.allowedInteractions.length === 0) {
                currentAnnotation.allowedInteractions = ["None"];
            }
        }
        else {
            currentAnnotation.isLocked = false;
            currentAnnotation.annotationSettings.isLock = false;
        }
        this.updateAnnotationComments(currentAnnotation);
                
        return currentAnnotation
    }

    private updateAnnotationComments(currentAnnotation) {
        let isReplyChanged = false;
        currentAnnotation.commentType = 'add';
        if (((!isNullOrUndefined(currentAnnotation.note) && (currentAnnotation.note !== this.selectedAnnotation.comment)) || (!isNullOrUndefined(currentAnnotation.notes) && (currentAnnotation.notes !== this.selectedAnnotation.comment))) && (currentAnnotation.comments && (currentAnnotation.comments.length > 0) )) {
            currentAnnotation.commentType = 'edit';
        }
        let shapeType = currentAnnotation.indent ?? "";
        if (shapeType !== "LineDimension" && shapeType !== "PolyLineDimension" && shapeType !== "PolygonDimension" && shapeType !== "PolygonRadius" && shapeType !== "PolygonVolume") {
            if (!isNullOrUndefined(currentAnnotation.note) || (currentAnnotation.shapeAnnotationType === "Ink" && !currentAnnotation.note)) {
                currentAnnotation.note = this.selectedAnnotation.comment;
            }
            else if (!isNullOrUndefined(currentAnnotation.notes)) {
                currentAnnotation.notes = this.selectedAnnotation.comment;
            }
        }
        currentAnnotation.replyComment = [];
        if (!isNullOrUndefined(this.selectedAnnotation.replyComments) && this.selectedAnnotation.replyComments.length > 0) {
            if (this.selectedAnnotation.replyComments.length > (currentAnnotation.comments as any[]).length) {
                let diff: number = (this.selectedAnnotation.replyComments.length - currentAnnotation.comments.length) as number;
                currentAnnotation.commentType = "add";
                for (let index = (this.selectedAnnotation.replyComments.length - diff); index < (this.selectedAnnotation.replyComments.length); index++) {
                    currentAnnotation.replyComment.push(this.selectedAnnotation.replyComments[index].note);
                }
            }
            else if (this.selectedAnnotation.replyComments.length === currentAnnotation.comments.length) {
                this.selectedAnnotation.replyComments.forEach((value, index) => {
                    if (currentAnnotation.comments[index] && (value.note !== currentAnnotation.comments[index].note)) {
                        isReplyChanged = true;
                        currentAnnotation.commentType = 'edit';
                        currentAnnotation.commentId = currentAnnotation.comments[index].annotName;
                        currentAnnotation.editComment = value.note;
                    }
                });
            }
        }
        if (!isReplyChanged) {
            currentAnnotation.commentId = null;
            currentAnnotation.editComment = null;
        }        
    }

    public updateReply() {
        let currentReplyComment: Comment = new Comment();

        currentReplyComment.id = this.generateUniqueId();
        currentReplyComment.author = this.selectedAnnotation.replyAuthor,
        currentReplyComment.note = this.selectedAnnotation.replyComment,
        currentReplyComment.modifiedDate = new Date().toDateString(),
        currentReplyComment.state = this.selectedAnnotation.replyState,

        this.selectedAnnotation.replyComments.push(currentReplyComment);
        this.selectedAnnotation.replyAuthor = 'Guest';
        this.selectedAnnotation.replyComment = '';
        this.selectedAnnotation.replyState = 'None';


    }
    public getAnnotationByID(annotationID: string): any {
        if (this.pdfviewerControl) {
            for (let i = 0; i < this.pdfviewerControl.annotationCollection.length; i++) {
                if (this.pdfviewerControl.annotationCollection[i].annotationId === annotationID) {
                    return this.pdfviewerControl.annotationCollection[i];
                }
            }
        }
        return null;
    }

    public generateUniqueId(): string {
        return crypto.randomUUID();
    }
    public openContextMenu(e: MouseEvent) {
        this.contextMenu.open(e.clientY, e.clientX);
    }

    public getCommentID(commentID: string) {
        this.currentEditCommentID = commentID;
    }
    public contextMenuItemSelected(args: MenuEventArgs) {
        switch (args.item.text) {
            case 'Edit':
                this.onEditButtonClick(this.currentEditCommentID);
                break;
            case 'Delete':
                this.onreplycommentdelete(this.currentEditCommentID);
                break;
        }
    }
    public onEditButtonClick(commentId: string) {
        this.isEditing = true;
        const comment = this.selectedAnnotation.replyComments.find(comment => comment.id === commentId);
        if (comment) {

            this.selectedAnnotation.replyAuthor = comment.author;
            this.selectedAnnotation.replyComment = comment.note;
            this.selectedAnnotation.replyState = comment.state;
            this.currentEditCommentID = commentId;
        }
    }
    public onreplycommentdelete(commentId: string) {
        const commentIndex = this.selectedAnnotation.replyComments.findIndex(comment => comment.id === commentId);
        if (commentIndex !== -1) {
            this.selectedAnnotation.replyComments.splice(commentIndex, 1);
        }
        this.onpropertiesvaluechanges('', {isInteracted: true});
    }
    public updateEditReply() {
        let currentReplyComment: Comment;
        if (this.isEditing && this.currentEditCommentID) {
            currentReplyComment = this.selectedAnnotation.replyComments.find(comment => comment.id === this.currentEditCommentID);
            if (currentReplyComment) {
                currentReplyComment.author = this.selectedAnnotation.replyAuthor;
                currentReplyComment.note = this.selectedAnnotation.replyComment;
                currentReplyComment.state = this.selectedAnnotation.replyState;
                currentReplyComment.modifiedDate = new Date().toDateString();
            } else {
                console.error(`Comment with ID ${this.currentEditCommentID} not found.`);
            }
            this.currentEditCommentID = null;
        }
        this.isEditing = false;
    }

    public openColorPicker(e: any) {
        let colorElement = e.element.parentElement as HTMLDivElement;
        if (colorElement) {
            let elements = colorElement.getElementsByClassName('e-container e-color-palette')[0].getBoundingClientRect();
            if (elements.left + elements.width > window.innerWidth) {
                colorElement.style.left = (elements.left - elements.width) + 'px';
            }
        }
    }

    public documentLoaded(e: LoadEventArgs): void {
        if (this.pdfviewerControl) {
            this.pageCount = this.pdfviewerControl.pageCount
        }
        if (e.documentName === 'annotations-v3.pdf') {
            this.pdfviewerControl.annotation.addAnnotation("Highlight", {
                bounds: [{ x: 97, y: 610, width: 340, height: 14 }],
                pageNumber: 1
            } as HighlightSettings);
            this.pdfviewerControl.annotation.addAnnotation("Underline", {
                bounds: [{ x: 97, y: 705, width: 346, height: 14 }],
                pageNumber: 1
            } as UnderlineSettings);
            this.pdfviewerControl.annotation.addAnnotation("Strikethrough", {
                bounds: [{ x: 97, y: 800, width: 367, height: 14 }],
                pageNumber: 1
            } as StrikethroughSettings);
            this.pdfviewerControl.annotation.addAnnotation("Squiggly", {
                bounds: [{ x: 97, y: 895.5, width: 336, height: 14 }],
                pageNumber: 1
            } as SquigglySettings);
            this.pdfviewerControl.annotation.addAnnotation("Line", {
                offset: { x: 200, y: 230 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as LineSettings);
            this.pdfviewerControl.annotation.addAnnotation("Arrow", {
                offset: { x: 200, y: 370 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 370 }, { x: 350, y: 370 }]
            } as ArrowSettings);
            this.pdfviewerControl.annotation.addAnnotation("Rectangle", {
                offset: { x: 200, y: 480 },
                pageNumber: 2,
                width: 150,
                height: 75
            } as RectangleSettings);
            this.pdfviewerControl.annotation.addAnnotation("Circle", {
                offset: { x: 200, y: 620 },
                pageNumber: 2,
                width: 90,
                height: 90
            } as CircleSettings);
            this.pdfviewerControl.annotation.addAnnotation("Polygon", {
                offset: { x: 200, y: 800 },
                pageNumber: 2,
                vertexPoints: [{ x: 200, y: 800 }, { x: 242, y: 771 }, { x: 289, y: 799 }, { x: 278, y: 842 }, { x: 211, y: 842 }, { x: 200, y: 800 }]
            } as PolygonSettings);
            this.pdfviewerControl.annotation.addAnnotation("Distance", {
                offset: { x: 200, y: 230 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 230 }, { x: 350, y: 230 }]
            } as DistanceSettings);
            this.pdfviewerControl.annotation.addAnnotation("Perimeter", {
                offset: { x: 200, y: 350 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 350 }, { x: 285, y: 350 }, { x: 286, y: 412 }]
            } as PerimeterSettings);
            this.pdfviewerControl.annotation.addAnnotation("Area", {
                offset: { x: 200, y: 500 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 500 }, { x: 288, y: 499 }, { x: 289, y: 553 }, { x: 200, y: 500 }]
            } as AreaSettings);
            this.pdfviewerControl.annotation.addAnnotation("Radius", {
                offset: { x: 200, y: 630 },
                pageNumber: 3,
                width: 90,
                height: 90
            } as RadiusSettings);
            this.pdfviewerControl.annotation.addAnnotation("Volume", {
                offset: { x: 200, y: 810 },
                pageNumber: 3,
                vertexPoints: [{ x: 200, y: 810 }, { x: 200, y: 919 }, { x: 320, y: 919 }, { x: 320, y: 809 }, { x: 200, y: 810 }]
            } as VolumeSettings);
            this.pdfviewerControl.annotation.addAnnotation("FreeText", {
                offset: { x: 250, y: 150 },
                fontSize: 16,
                fontFamily: "Helvetica",
                pageNumber: 4,
                width: 200,
                height: 40,
                isLock: false,
                defaultText: "Syncfusion"
            } as FreeTextSettings);
            this.pdfviewerControl.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 240 },
                pageNumber: 4
            } as StampSettings, DynamicStampItem.Approved);
            this.pdfviewerControl.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 350 },
                pageNumber: 4
            } as StampSettings, null, SignStampItem.SignHere);
            this.pdfviewerControl.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 460 },
                pageNumber: 4
            } as StampSettings, null, null, StandardBusinessStampItem.Confidential);
            //The customStampImageSource property contains the stamp image as a base64 string
            this.pdfviewerControl.annotation.addAnnotation("Stamp", {
                offset: { x: 200, y: 530 },
                pageNumber: 4,
                customStamps: [
                    {
                        customStampName: "Image",
                        customStampImageSource:
                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIIAqwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAEEQAAEDAwIEAwYDBAYLAAAAAAECAwQABREGIRIxQVETYXEHFCIygZEVQmIjUnKCJCUzU6HRFhc1c5KisbKzwvD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APcaUpQKUpQKUpQKUpQKUpQKVzXGdFtsN2ZPfbYjNJ4nHHDgJFfEK5Q5ttbuUaQhcNxvxUPcklPfflQdlYJxURpe/salthuMNpxEYvuNtKc28VKVcPGB2JB577Vyz7pNuUxy26eWlCml8Mu4OI4kR/0oB2Wvp2T17EJK43qDbloakOqL7m6I7TanHVjOMhCQTjzxgVut89i4Mqdj8Y4VlC0OIKFIUOYKTuOn0INRZZtWkrVLuDpIIHHJlPK4nX1dOJR5kk4A5DYDArVoWbHuVgTPjvF5Ul5xx5zhIBc4jkJyBlI+UHqE0FjpSlApSlApSlApSlApSlApSlApSlArClAczgVmqr7QZLptkezxHi1KvD4ihxKsFprBU6v6IB+pFBTdUKf1uUuFa0WpyUIVoYBx706chchXdKEhZSPLNXXVTsOw6NdjNxkvJS0iLEidHnDhLaPME4z5ZzVHk6kTHu1vTpyE1Jf8L3Oww1ZDaGc4XJXjklXDhP6UlWd63ybrL1rq1mNa1hLcAKEeQgcTbbvyuScHnw5KGweZJPIVRYoDT6okfSlnfWhmCwlu43FGAUKxu2j9atyT+UHvirZBixLZBaiQ2kR4zCMIQnZKRWuz2yLZ7czBgo4GWh13KidypR6qJJJPevOvaFqCXqC4HSGmzxlxQbmvJJAPXwwe2M8R9R3FQc1xde9qOqEW+C44jTFuVxPvtnHvCvI+e4HYZPavV4sdmLGajxmktMtJCENpGAkDkBUbpixRNO2dm3Q0/Cj4lrPNazzUf/uWKlkkEZByKDNKUoFKUoFKUoFKUoFKwahZ2p7dFfMZhTs+ZnHu0FHirB/VjZHqogUE3WOIYzUApzUlwBKUxLOwQCFL/bv467DCEn6qr5i6btk5ht+ZOlXlCxlLkiTxtr8whGG8fy0HdK1FZorymHbjH8dPNlC+NY/lTk1XNTe0m12SCXBFnrkOpX7uh6ItkKUBzPGEnhzjcA1bokKLAZS1BjMx20jAQy2EjHoK85i6PuOovaFNv+pWPDt8J/ggMKUCXktq+BX8HNXmT2G9HLF1trSyW2GrUFgbluT3eCIRIS26tS/iSjwgCcDl35Z3qBlSb/edVcN58e4tojKafiW2MfDQpRBXF8X5UnZPGsq5ZAr0TV2j52oL9Anx7wqCxHYWypLbeXAFH4lNqz8KiNs8x0qy2e1QrNbmYFuZDUdkYSkHOT1JPUk7k0HhsG6u3SHPeisLFwnucE95hOPdmc8DUNhR/OrCR5Ak9NvX9F6cRp20IZIR706AX1I5DA2Qn9KRsPvzJqGmXG0N6pfk3KTEhW2ykBsLKUh2Y4nKlY6lKCAOuVmuafry5T5rFs0vaHQ5JSVIm3FBaQhvq7wfNwjurAPnQZ9pms1WtlVmtDqRcnxwrdK+ERknqT0Vj7DftUN7OA1BilywWx65TnU8PjOAtMsJJzlbhBypXMhPFgADbrF6B0sNSagkzrk+5cbTDeUQ5IHwy3T+bHbYE/y9yK9sabQ02lDSAhCRhKUjAAoIaFaZ8gh++zg8vIKYsUFphB+/Ev8AmONuVTYGBgcqzSoFKUoFKUoFKUoFcV4mOW+2yJbEN6Y40gqTHYGVuHsK7awRmg8rd/1gameJn2n8Ptv5YQn+78f+8cSFLI57AJ8/Oy2eyalhxkRo79htEVI2YgQ1uEH+JSgD68NW/FQ2r7yqxWCTNZR4knZqM1/ePLPChP3IoKRc4l91FqJ3TkfUst2Aygfiz7TDTaEA8mkEAnjPXfAH2NohaPehR2Y8bVF9QwygNttJMcJSkDAAAZru0hY02CyMxFK8SWv9rMfPN55W6lE9d9vQCpughmrLNZVxI1Fc19kupYUn/wAYP+NdQVMjD+khEhsfM40nhUPMp3z9D9K76xQRN/uNxjWj3qwW9F0krKfDa8YISUn83F25VVocf2kXdR/EJlrskZQxiM14ryR5ZJA9c/SrHo973m2SFjPhCfKSzn9wPLCceXbyxUpPmRrdDemTHUMx2UFbjizgJAoPGrbpyJBRPvEi53STfhc34MRCVMrckLSvCT8aFEEjBUQdhUlfbHcrcItuYvc+VqbUBDcpf7PgDSfnJPBxBCQcDBGcnlUn7Om4kly+aonhbPBPkeGiRsIqCEqUcHkSMZ9K5bRqqMbjJ1E5FkTrndFe72m2sAF1MVBI4iD8iVKyoqO2w7VRbrJpRdkt7MGDe56GGhgJ8Njn1P8AZ9fPNd5gXNKQEXt0q7uRmz/0AqFja29znGFq2EmxuqaLzDrkhK2XUj5gF7YUNvhqsX+66nvtqlarsrsmDa7aUvQIqQULuCUqHiLdGPk4c8I686g9BMK8/lu7IxyzCB/9q4bpJkWeP7xd9TQojGeHjdipRk9hlW5/yrF21raoEGM/HcM+TMSDEhwyFuv55YA5DfcnYVx2fTD9wm/jeskMS7goYYhY42IKeyQeajtlR68tqCUjtXWVHakQL/FejupC23PcwsLSeoKVgEVsLWomsFMm1yAM5C2HGir6hSsfY1B6ILViuV50utSWkRpHvNvQTgGO6OLCe/CviB7bVMXjVMC2vCG0VTrk4MtQIeHHleZHJCf1KwKDTcNSqskB2XqSCYjTQ3fYcDzSj0SOSgSdhlP1r50FqherbM5cVQVQwmQtkNlfFxBON8/XB8wa4JNsfUzJ1Jq/wXFQWnH4tvbPEzFCUk8RyPjd2+bkOQ7nHs0iSLRY7dBkKUoy4gnYV8yHFEFxPoCtOPU+VBdaUpQKUpQKqF4H4xry027YxrYyq4yB3cPwND/vV9BVvNVTRf8ATrhqC9KIUJU4x2T2aZHAB/xcZ+tBa6UpQKr+r7lIjRWrdaz/AFrcleBF2z4W3xOq8kDf1wOtSV5ukSz216fOc4GGhk4GSo9EpHVROwHU1DaWtst2S9qG+N8Nzlp4WWSc+6R85S0P1dVHqfSgm7Rb2bTbItvjcXhR2g2kqOVKx1J6k8zVbfP+leoSxkGx2h7LxztJlD8h6FCOZ/VjtXdq25ymWY9ptSv61uSi2yr+4Rj43T5JHLzIrRfHIujtCy/dthFiqQyD8zrqhgZ7qUo/40FJsbL2q7W/YYchUdqdMlXC5SEDJQhbq/CbHTKuEEj90edXfRWi4Gk4yvAUqTMdADsp35ikckj91I7Vn2e6bTpnTUaG5hUtweLJcHVw9PQch6VZ6Dhudot12aQ1dIEWa2hXEhEllLgSe4Cga7OBPBwYHDjGMbYr6pQRNp03ZrM669arVChuu/OphkJJ8tunlUt0pSgjLxYLVew2LtAYleEctqcT8SPRXMfevq0WO12VtTdpgRoiVHKy02AVnuo8z9akaUEBr2O9L0beI8dtx1xyMpIQ2kqUodQANycZrk07JVeLyq4R2HmrZCiiJFW62UF9SilS1AHfhHAgA7b8XlVqIzWMb0GaUpQKUpQc9wkCJAkyVcmWlOH6AmoL2bsqZ0LZi4SXHowfcUeZU58ZP3VUpqNlcjT1zYaGVuRHUJA6koIFcuiZDcnR9lea+RcFkgdvgG1BN1omS48GM7JluoZYaSVuOLOEpSOZJrXdLjEtUF2bcJLceM0MrccOAP8AP0qqR4czWk1qfd2HItgZWFxLe6MLlKHJ14dE9kH1NBttDEjVVzYvtxaUza4547ZCdThSz0kLHQ4+UdAc86tcmQzDjOyJLiW2WUFxxxWwSkDJJ+lbQAOVVPU6vx29xdLsqPgBKZdzIG3ghWEtE9CtX/Kk0GzSTDlwekamnNlL08BMNCs5ZijdAweRVniPqB0qsarce1XrezWlghVsiTCp3B/tFtDicPok8CP4lq7VedSzXYFr8OBwpmyVCPEyPhStQPxEfupAKj5JNVz2eW9t2RIvLJWqGlsQbetXN1pCsuPerjmVZ6gCqLyBis0pUClKUClKUClKUClKUClKUClKUGCMjFVNqw36yeOxpmbb/wAPdcU43GntLPuqlHJCFJO6ckkJI2zzq20oKtE0iZE5q46mnKu8to8TLSmwiMwe6G99/wBSiTVoGwrNcV4uUez2yTcJiiGY7ZWrAyT2AHUk7D1oMXq6R7PapNxlk+FHQVkAZKj0SB1JOAPWozRtqfhW5ybcf9qXJz3qZk54FEbNg9kDCfoT1qGi++alvEGJdGwlq2hE+e0FApTKVu0we4Qk8R7nhNXkcqCs6q0zK1DcIWbkqNbW23ESmWk4ceCsZAV+UEAgnngnvViix2okZqPHbS2y0kIbQkYCUjYAVtpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKouv7mwi7W2HJBdZiJNxXHSd5DoUER2gOpU4rI/gq9VxO2i3PXRu6OwmFz2m/DbkKQCtKck4B+p+9BxaTtblqtQEvhM+UtUqatO4U8vdW/YbJHkkVNVgDFZoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoFKUoP//Z"
                    }
                ]
            } as CustomStampSettings);
            //The pathData property holds the value of the signature drawn using the ink annotation
            this.pdfviewerControl.annotation.addAnnotation("Ink", {
                offset: { x: 250, y: 860 },
                pageNumber: 4,
                width: 200,
                height: 60,
                path: '[{\"command\":\"M\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":244.83334350585938,\"y\":982.0000305175781},{\"command\":\"L\",\"x\":250.83334350585938,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":257.5,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":926.6667175292969},{\"command\":\"L\",\"x\":259.5,\"y\":924.0000305175781},{\"command\":\"L\",\"x\":259.5,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":258.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":258.16668701171875,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.8333435058594,\"y\":922.0000305175781},{\"command\":\"L\",\"x\":256.16668701171875,\"y\":922.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":254.16668701171875,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":253.5,\"y\":923.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":925.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":927.3333435058594},{\"command\":\"L\",\"x\":252.83334350585938,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":253.5,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":254.83334350585938,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":260.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":264.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":274.16668701171875,\"y\":958.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":281.5,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":285.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":967.3333435058594},{\"command\":\"L\",\"x\":286.8333740234375,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":282.8333740234375,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":278.16668701171875,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":266.16668701171875,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":259.5,\"y\":993.3333435058594},{\"command\":\"L\",\"x\":252.16668701171875,\"y\":994.0000305175781},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":991.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":228.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":228.83334350585938,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":230.16668701171875,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":236.16668701171875,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":240.83334350585938,\"y\":971.3333435058594},{\"command\":\"L\",\"x\":246.16668701171875,\"y\":972.0000305175781},{\"command\":\"L\",\"x\":257.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":262.8333435058594,\"y\":976.0000305175781},{\"command\":\"L\",\"x\":269.5,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":276.16668701171875,\"y\":978.6667175292969},{\"command\":\"L\",\"x\":279.5,\"y\":978.0000305175781},{\"command\":\"L\",\"x\":285.5,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":288.16668701171875,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":293.5,\"y\":966.6667175292969},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":293.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":291.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":291.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":292.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":292.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":294.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":295.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":297.5,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":298.8333740234375,\"y\":970.6667175292969},{\"command\":\"L\",\"x\":301.5,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":304.16668701171875,\"y\":968.6667175292969},{\"command\":\"L\",\"x\":305.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":308.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":310.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":310.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":311.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":312.8333740234375,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":968.0000305175781},{\"command\":\"L\",\"x\":317.5,\"y\":972.6667175292969},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":983.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":986.0000305175781},{\"command\":\"L\",\"x\":319.5,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.8333740234375,\"y\":988.0000305175781},{\"command\":\"L\",\"x\":318.16668701171875,\"y\":988.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":987.3333435058594},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":985.3333435058594},{\"command\":\"L\",\"x\":314.16668701171875,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":314.8333740234375,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":316.16668701171875,\"y\":969.3333435058594},{\"command\":\"L\",\"x\":319.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":320.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":321.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":322.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":322.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":324.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":326.8333740234375,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":328.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":328.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":329.5,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.6667175292969},{\"command\":\"L\",\"x\":330.16668701171875,\"y\":962.0000305175781},{\"command\":\"L\",\"x\":330.8333740234375,\"y\":960.0000305175781},{\"command\":\"L\",\"x\":331.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":332.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":333.5,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":334.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":335.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":336.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":337.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":338.8333740234375,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":340.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":341.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":342.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":344.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":346.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":349.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":350.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":351.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":352.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":354.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":354.16668701171875,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":355.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":356.16668701171875,\"y\":957.3333435058594},{\"command\":\"L\",\"x\":358.16668701171875,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":360.16668701171875,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":364.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":370.8333740234375,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":931.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":376.16668701171875,\"y\":930.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":932.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":375.5,\"y\":966.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":974.6667175292969},{\"command\":\"L\",\"x\":378.16668701171875,\"y\":977.3333435058594},{\"command\":\"L\",\"x\":380.8333740234375,\"y\":981.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":383.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":387.5,\"y\":982.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":980.6667175292969},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":976.6667175292969},{\"command\":\"L\",\"x\":392.8333740234375,\"y\":973.3333435058594},{\"command\":\"L\",\"x\":392.16668701171875,\"y\":970.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":385.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":382.8333740234375,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":377.5,\"y\":964.0000305175781},{\"command\":\"L\",\"x\":375.5,\"y\":964.6667175292969},{\"command\":\"L\",\"x\":373.5,\"y\":965.3333435058594},{\"command\":\"L\",\"x\":374.8333740234375,\"y\":963.3333435058594},{\"command\":\"L\",\"x\":376.8333740234375,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":382.16668701171875,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":384.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":387.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":388.16668701171875,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":388.8333740234375,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":389.5,\"y\":959.3333435058594},{\"command\":\"L\",\"x\":389.5,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":390.16668701171875,\"y\":961.3333435058594},{\"command\":\"L\",\"x\":390.8333740234375,\"y\":960.6667175292969},{\"command\":\"L\",\"x\":393.5,\"y\":958.0000305175781},{\"command\":\"L\",\"x\":396.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":398.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":400.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":400.8333740234375,\"y\":947.3333435058594},{\"command\":\"L\",\"x\":401.5,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":402.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":403.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":404.8333740234375,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":406.16668701171875,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":407.5,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":410.16668701171875,\"y\":952.0000305175781},{\"command\":\"L\",\"x\":412.16668701171875,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":940.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":414.16668701171875,\"y\":938.0000305175781},{\"command\":\"L\",\"x\":415.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":418.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":420.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":946.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":423.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":423.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":421.5,\"y\":955.3333435058594},{\"command\":\"L\",\"x\":421.5,\"y\":956.0000305175781},{\"command\":\"L\",\"x\":422.16668701171875,\"y\":954.6667175292969},{\"command\":\"L\",\"x\":422.8333740234375,\"y\":954.0000305175781},{\"command\":\"L\",\"x\":424.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":425.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":428.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":948.0000305175781},{\"command\":\"L\",\"x\":428.8333740234375,\"y\":950.0000305175781},{\"command\":\"L\",\"x\":429.5,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":430.16668701171875,\"y\":953.3333435058594},{\"command\":\"L\",\"x\":432.8333740234375,\"y\":952.6667175292969},{\"command\":\"L\",\"x\":434.8333740234375,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":437.5,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":440.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":441.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":442.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":442.8333740234375,\"y\":946.0000305175781},{\"command\":\"L\",\"x\":443.5,\"y\":949.3333435058594},{\"command\":\"L\",\"x\":444.16668701171875,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":447.5,\"y\":950.6667175292969},{\"command\":\"L\",\"x\":450.16668701171875,\"y\":948.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":945.3333435058594},{\"command\":\"L\",\"x\":453.5,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":452.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":450.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":448.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":447.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":445.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":445.5,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.16668701171875,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":446.8333740234375,\"y\":939.3333435058594},{\"command\":\"L\",\"x\":452.16668701171875,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":454.8333740234375,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":456.8333740234375,\"y\":936.0000305175781},{\"command\":\"L\",\"x\":459.5,\"y\":936.6667175292969},{\"command\":\"L\",\"x\":460.8333740234375,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":461.5,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":942.6667175292969},{\"command\":\"L\",\"x\":462.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":462.8333740234375,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":464.16668701171875,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":465.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":466.16668701171875,\"y\":932.6667175292969},{\"command\":\"L\",\"x\":467.5,\"y\":933.3333435058594},{\"command\":\"L\",\"x\":469.5,\"y\":935.3333435058594},{\"command\":\"L\",\"x\":470.16668701171875,\"y\":938.6667175292969},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":943.3333435058594},{\"command\":\"L\",\"x\":472.8333740234375,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":474.16668701171875,\"y\":944.6667175292969},{\"command\":\"L\",\"x\":475.5,\"y\":944.0000305175781},{\"command\":\"L\",\"x\":478.16668701171875,\"y\":941.3333435058594},{\"command\":\"L\",\"x\":481.5,\"y\":937.3333435058594},{\"command\":\"L\",\"x\":484.8333740234375,\"y\":934.0000305175781},{\"command\":\"L\",\"x\":488.8333740234375,\"y\":929.3333435058594},{\"command\":\"L\",\"x\":489.5,\"y\":928.0000305175781}]'
            } as InkAnnotationSettings);
            this.pdfviewerControl.annotation.addAnnotation("StickyNotes", {
                offset: { x: 300, y: 980 },
                pageNumber: 4,
                isLock: false
            } as StickyNotesSettings);
        }
        this.selectedAnnotation = new AnnotationBase();
        this.annotationUnSelectedEvent();
    }
}