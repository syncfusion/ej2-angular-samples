import { Component, ViewChild, OnInit } from '@angular/core';
import { ToolbarAllModule } from '@syncfusion/ej2-angular-navigations';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';
import { BlockModel } from '@syncfusion/ej2-angular-blockeditor';
import { ElementRef } from '@angular/core';
import blockData from './blockData.json';

@Component({
  imports: [
    ToolbarAllModule,
    BlockEditorModule
  ],
  standalone: true,
  selector: 'app-root',
  styleUrl: 'template-gallery.component.css',
  templateUrl: 'template-gallery.html',
})
export class TemplateGalleryblock {
  @ViewChild('blockEditorInstance') blockEditorInstance?: BlockEditorComponent;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  public selectedCardName: string | null;
  public selectedCardIcon: string | null;
  public cards = blockData.blockTemplate[0].page;

  onCreated() {
    this.loadPage(this.cards[1]);
    this.blockEditorInstance.focusIn();
  }

  ngOnInit() { }

  private loadPage(pageData: any) {
    this.selectedCardName = pageData.name;
    this.selectedCardIcon = pageData.icon;

    if (this.blockEditorInstance) {
      this.blockEditorInstance.renderBlocksFromJson(pageData.blocks, true);
    }
  }

  public onCardClick(selectedPage: any) {
    this.blockEditorInstance.focusIn();
    this.loadPage(selectedPage);
  }
}