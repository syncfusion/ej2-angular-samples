/**
 * Profile picture Sample
 */
 import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
 import { ImageEditorComponent, ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
 import { createElement } from '@syncfusion/ej2-base';
 import { DialogComponent, ButtonPropsModel, PositionDataModel, DialogModule } from '@syncfusion/ej2-angular-popups';
 import { AnimationSettingsModel } from '@syncfusion/ej2-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

 @Component({
    selector: 'control-content',
    templateUrl: 'profile-picture.html',
    styleUrls: ['profile-picture.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DialogModule, ImageEditorModule, SBDescriptionComponent]
})
 
 export class ProfilePictureImageEditorComponent {
    @ViewChild('Dialog')
    public DialogInstance: DialogComponent;
    @ViewChild('ImageEditor')
    public ImageEditorInstance: ImageEditorComponent;

    public toolbarItems: string[] = [];
    public header: string = 'Edit Profile Image';
    public showCloseIcon: Boolean = true;
    public closeOnEscape: Boolean = true;
    public width: string = '340px';
    public height: string = '420px';
    public visible: boolean = false;
    public animationSettings: AnimationSettingsModel = { effect: 'None' };
    public target: string = '.control-section';
    public position: PositionDataModel = { X: 'center', Y: 100 };
    public imgSrc: string = '';
    public created = (): void => {
        if (this.ImageEditorInstance.theme && window.location.href.split('#')[1]) {
            this.ImageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
        }
    }

    public imageLoaded = (): void => {
        if (this.imgSrc === '') {
            let canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
            let image: HTMLImageElement = document.querySelector('#demo-img');
            let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
            canvas.width = image.width < image.height ? image.width : image.height; 
            canvas.height = canvas.width;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            document.querySelector('.e-profile').classList.remove('e-hide');
        }
    }
    
    public dialogOpen = (): void => {
        const img: HTMLImageElement = document.querySelector('#demo-img');
        this.ImageEditorInstance.open(img.src);
    }

    public dialogClose = (): void => {
        const img: HTMLImageElement = document.querySelector('#demo-img');
        this.ImageEditorInstance.open(img.src);
    }
    
    // canvas click event
    public onOpenDialog = function(event: any): void {
        this.DialogInstance.show();
    };

    public imageChanged = (args: any): void=> {
        const URL = window.URL; const url = URL.createObjectURL((args.target as any).files[0]);  
        this.ImageEditorInstance.open(url.toString());
        (document.getElementById('img-upload') as HTMLInputElement).value = null;
        this.imgSrc = url.toString();
    }

    public fileOpened = (): void=> {
        this.ImageEditorInstance.select('circle');
    }

    public dlgOpenButtonClick = (): void => {
        document.getElementById('img-upload').click();
    }

    public dlgResetBtnClick = (): void => {
        this.ImageEditorInstance.reset();
    }

    public dlgRotateBtnClick = (): void => {
        this.ImageEditorInstance.rotate(-90);
    }

    public dlgDoneBtnClick = (): void => {
        this.ImageEditorInstance.crop();
        const croppedData: ImageData = this.ImageEditorInstance.getImageData();
        const canvas: HTMLCanvasElement = document.querySelector('#img-canvas');
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
        const parentDiv: HTMLElement = document.querySelector('.e-profile');
        const tempCanvas: HTMLCanvasElement = parentDiv.appendChild(createElement('canvas') as HTMLCanvasElement);
        const tempContext: CanvasRenderingContext2D = tempCanvas.getContext('2d');
        tempCanvas.width = croppedData.width; tempCanvas.height = croppedData.height;
        tempContext.putImageData(croppedData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        tempCanvas.remove();
        parentDiv.style.borderRadius = '100%'; canvas.style.backgroundColor = '#fff';
        this.DialogInstance.hide();
        if (this.imgSrc !== '') {
		        const img: HTMLImageElement = document.querySelector('#demo-img');
            img.src = this.imgSrc;
		    }
    }

    public dlgButtons: ButtonPropsModel[] = 
    [
        { click: this.dlgOpenButtonClick.bind(this), buttonModel: { content: 'Open', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-open' } },
        { click: this.dlgResetBtnClick.bind(this), buttonModel: { content: 'Reset', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-reset' } },
        { click: this.dlgRotateBtnClick.bind(this), buttonModel: { content: 'Rotate', isPrimary: false, cssClass: 'e-custom-img-btn e-img-custom-rotate' } },
        { click: this.dlgDoneBtnClick.bind(this), buttonModel: { content: 'Apply', isPrimary: true, cssClass: 'e-custom-img-btn e-img-custom-apply'} }
    ];

    public canvasClicked = (): void => {
        this.DialogInstance.show();
    }

    ngAfterViewInit(): void {
        let imageHide = document.getElementsByClassName('sb-desktop-wrapper')[0];
        if (imageHide) {
            (document.getElementsByClassName('sb-desktop-wrapper')[0] as HTMLElement).onclick = (args: any) : void => {
                if (args.target.className.indexOf('col-lg-12 control-section') > -1 || args.target.className.indexOf('sb-content') > -1) {
                    this.DialogInstance.hide();
                }
            }
          }
        }
        
}
