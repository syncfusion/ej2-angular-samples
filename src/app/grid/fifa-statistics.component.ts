import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { GridComponent, QueryCellInfoEventArgs, RowInfo, Column, GridModule, Grid, Sort } from '@syncfusion/ej2-angular-grids';
import { TooltipComponent, TooltipEventArgs, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { fifaData, webpfiles, countryInfo, teamInfo, coachInfo, topScrorerInfo, bestPlayerInfo, FifaDetails } from './data';
// Inject the Sort module (call this only once)
Grid.Inject(Sort);
@Component({
  selector: 'app-fifa-grid',
  templateUrl: 'fifa-statistics.component.html',
  styleUrls: ['fifa-statistics.component.css'],
  standalone: true,
  imports: [GridModule, TooltipModule]
})
export class FIFAStatisticsComponent implements OnInit, AfterViewInit {
  public fifaData: FifaDetails[] = fifaData;
  public webpfiles: string[] = webpfiles;
  public countryInfo: any = countryInfo[0];
  public teamInfo: any = teamInfo[0];
  public coachInfo: any = coachInfo[0];
  public topScrorerInfo: any = topScrorerInfo[0];
  public bestPlayerInfo: any = bestPlayerInfo[0];
  public isverticalPopup: boolean = false;
  @ViewChild('tooltip', { static: true })
  public tooltipObj!: TooltipComponent;
  @ViewChild('grid', { static: true })
  public gridObj!: GridComponent;
  constructor() { }
  ngOnInit(): void {
    enableRipple(true);
  }
  ngAfterViewInit(): void { }
  public beforeRender(args: TooltipEventArgs): void {
    // Find the closest cell (td) to the hovered element.
    const cell = args.target.closest('td');
    if (!cell) {
      args.cancel = true;
      return;
    }

    // Get the row information from the grid
    const rowInfo: RowInfo | null = this.gridObj.getRowInfo(cell);
    if (!rowInfo || !rowInfo.rowData) {
      args.cancel = true;
      return;
    }

    // Get the column field and the value from the row data
    const column = rowInfo.column as Column;
    const field: string = column.field;
    let value: string = (rowInfo.rowData as any)[field];
    if (!value || value.trim() === "" || value === "undefined") {
      args.cancel = true;
      return;
    }
    let imageSource: string = '';
    let cellInfo: string = '';
    let hideImage: boolean = false;

    if (value) {
      switch (field) {
        case 'Host':
          // Use the cell's title attribute
          value = args.target.getAttribute('title') || value;
          imageSource = './assets/grid/images/FIFA_Statistics/country/' +
            (this.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
          cellInfo = this.countryInfo[value.replace(/ /g, '_')];
          break;
        case 'Champions':
          imageSource = './assets/grid/images/FIFA_Statistics/team/' + value + '.png';
          cellInfo = this.teamInfo[value.replace(/ /g, '_')];
          break;
        case 'Coach':
          if (args.target.tagName === 'IMG') {
            // When the image is hovered, use the Champions field for the flag.
            value = (rowInfo.rowData as any)['Champions'];
            imageSource = './assets/grid/images/FIFA_Statistics/country/' +
              (this.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png');
            cellInfo = this.countryInfo[value.replace(/ /g, '_')];
          } else {
            if (value === 'Juan López') {
              hideImage = true;
            }
            imageSource = './assets/grid/images/FIFA_Statistics/coach/' + value +
              (value === 'Aymoré Moreira' ? '.png' : '.jpg');
            cellInfo = this.coachInfo[value.replace(/ /g, '_')];
          }
          break;
        case 'TopScorer':
          value = args.target.getAttribute('title') || value;
          if (args.target.tagName === 'IMG') {
            if (value === 'Croatia') {
              hideImage = true;
            }
            imageSource = './assets/grid/images/FIFA_Statistics/team/' + value + '.png';
            cellInfo = this.teamInfo[value.replace(/ /g, '_')];
          } else {
            imageSource = './assets/grid/images/FIFA_Statistics/top_scorer/' + value + '.jpg';
            cellInfo = this.topScrorerInfo[value.replace(/ /g, '_')];
          }
          break;
        case 'BestPlayerAward':
          if (args.target.tagName === 'IMG') {
            value = (rowInfo.rowData as any)['BestPlayerCountry'];
            if (value === 'Croatia') {
              hideImage = true;
            }
            imageSource = './assets/grid/images/FIFA_Statistics/team/' + value + '.png';
            cellInfo = this.teamInfo[value.replace(/ /g, '_')];
          } else {
            imageSource = './assets/grid/images/FIFA_Statistics/best_player/' + value + '.jpg';
            cellInfo = this.bestPlayerInfo[value.replace(/ /g, '_')];
          }
          break;
        default:
          args.cancel = true;
          return;
      }
      if (!imageSource || !cellInfo) {
        args.cancel = true;
        return;
      }
      // Create container elements for the tooltip content.
      let div1: HTMLElement = document.createElement('div');
      let div2: HTMLElement = document.createElement('div');
      let img: HTMLImageElement = document.createElement('img');
      img.alt = '';
      img.src = imageSource;
      img.decoding = 'async';
      img.title = value;
      // Set custom data attributes (if needed)
      img.setAttribute('dataFileWidth', '945');
      img.setAttribute('dataFileHeight', '630');
      // Add a CSS class for styling, if required.
      img.classList.add('mw-file-element');

      let div3: HTMLElement = document.createElement('div');
      div3.innerHTML = cellInfo;

      // Adjust layout based on the field and target element.
      if ((args.target.tagName === 'IMG' && field === 'Coach') || field === 'Host') {
        this.isverticalPopup = true;
        this.tooltipObj.width = '275px';
        div2.style.borderBottom = '1px solid #e0e0e0';
        img.width = 275;
        img.height = 175;
        div3.style.padding = '12px';
      } else {
        this.isverticalPopup = false;
        this.tooltipObj.width = '425px';
        div1.style.display = 'inline';
        div2.style.display = hideImage ? 'none' : 'inline';
        div2.style.float = 'right';
        div2.style.borderLeft = '1px solid #e0e0e0';
        div2.style.margin = '0 0 0 12px';
        img.width = 190;
        img.height = 245;
        div3.style.padding = '12px 0 12px 12px';
      }
      div2.appendChild(img);
      div1.appendChild(div2);
      div1.appendChild(div3);
      // Set the tooltip content
      this.tooltipObj.setProperties({ content: div1.outerHTML });
    }
  }
  public beforeOpen(args: TooltipEventArgs): void {
    args.element.style.maxWidth = this.isverticalPopup ? '275px' : '425px';
    args.element.style.width = this.isverticalPopup ? '275px' : '425px';
  }
  public queryCellInfo(args: QueryCellInfoEventArgs): void {
    if (!args.column || !args.data || !args.cell) { return; }
    const field = args.column.field;
    if (field === 'Host' || field === 'Champions' || field === 'Coach' ||
      field === 'TopScorer' || field === 'BestPlayerAward') {
      const cellElement = args.cell as HTMLElement;
      cellElement.classList.add('my-tooltip')
      if (!cellElement) { return; }
      const rowData = args.data as FifaDetails;
      const cellValue = (rowData as any)[field];
      if (typeof cellValue !== 'string') { return; }
      const values: string[] = cellValue.split(',');
      let country: string[] = [];
      if (field === 'TopScorer') {
        const topScorerCountry = (rowData as any)['TopScorerCountry'];
        if (topScorerCountry) {
          country = topScorerCountry.split(',');
        }
      }
      const newRowData: FifaDetails[] = [];
      for (let k = 0; k < values.length; k++) {
        const obj: FifaDetails = { ...rowData };
        (obj as any)[field] = values[k];

        if (field === 'TopScorer' && country.length > k) {
          (obj as any)['TopScorerCountry'] = country[k];
        }
        newRowData.push(obj);
      }
      cellElement.innerHTML = '';
      for (let i = 0; i < values.length; i++) {
        const div: HTMLElement = document.createElement('div');
        const span: HTMLElement = document.createElement('span');
        if (!(field === 'TopScorer' && values[i].indexOf('Players') > -1) &&
          values[i] !== 'Not awarded') {
          const image: HTMLImageElement = this.renderImage(newRowData[i], field);
          span.appendChild(image);
          span.appendChild(document.createTextNode('  '));
        }
        let link: HTMLElement;
        if ((field === 'TopScorer' &&
          (values[i].indexOf('Players') > -1 || values[i].indexOf('Ronaldo') > -1)) ||
          (field === 'BestPlayerAward' &&
            (values[i] === 'Not awarded' || values[i] === 'Mario Kempes' ||
              values[i] === 'Paolo Rossi' || values[i] === 'Salvatore Schillaci'))) {
          link = document.createElement('span');
          link.innerText = values[i];
        } else {
          link = document.createElement('a');
          link.setAttribute('href', 'https://ej2.syncfusion.com/');
          link.textContent = values[i];
          link.setAttribute('target', '_blank');
          link.setAttribute('title', values[i]);
          link.addEventListener('click', (e: Event) => {
            e.preventDefault();
          });
        }
        div.appendChild(span);
        div.appendChild(link);
        cellElement.appendChild(div);
      }
      if (field === 'TopScorer') {
        const scoreDiv: HTMLElement = this.renderScoreIcons(rowData);
        cellElement.appendChild(scoreDiv);
      }
    }
    if (args.column && args.column.field === 'BestPlayerAward') {
      const rowIndexStr = args.cell?.getAttribute('index');
      const rowIndex = rowIndexStr ? parseInt(rowIndexStr) : 0;
      if (rowIndex > 0) {
        if ((this.gridObj.currentViewData[rowIndex - 1] as FifaDetails)[args.column.field] !==
          (args.data as FifaDetails)[args.column.field]) {
          args.rowSpan = this.calculateRowspan(args, rowIndex);
        }
      } else {
        args.rowSpan = this.calculateRowspan(args, rowIndex);
      }
    }
  }
  public calculateRowspan(args: QueryCellInfoEventArgs, rowIndex: number): number {
    let rowspan = 1;
    for (let i = rowIndex + 1, j = 0; i < this.gridObj.currentViewData.length; i++, j++) {
      if ((args.data as any)[args.column!.field] !== (this.gridObj.currentViewData[i] as any)[args.column!.field]) {
        rowspan = j + 1;
        break;
      }
      if (i === this.gridObj.currentViewData.length - 1) {
        rowspan = j + 2;
        break;
      }
    }
    return rowspan;
  }

  public dataBound(): void {
    const tableEle: HTMLElement | null = this.gridObj.element.querySelector('.e-gridcontent table');
    if (tableEle) {
      tableEle.classList.add('tournament');
    }
  }
  public renderImage(rowDetails: FifaDetails, field: string): HTMLImageElement {
    let value = '';
    switch (field) {
      case 'Host':
        value = rowDetails.Host;
        break;
      case 'Champions':
      case 'Coach':
        value = rowDetails.Champions;
        break;
      case 'TopScorer':
        value = rowDetails.TopScorerCountry;
        break;
      case 'BestPlayerAward':
        value = rowDetails.BestPlayerCountry;
        break;
    }
    const src = `./assets/grid/images/FIFA_Statistics/country/${this.webpfiles.indexOf(value) > -1 ? value + '.webp' : value + '.png'}`;
    const img: HTMLImageElement = document.createElement('img');
    img.alt = '';
    img.src = src;
    img.decoding = 'async';
    img.title = value;
    img.width = 23;
    img.height = 15;
    img.setAttribute('dataFileWidth', '945');
    img.setAttribute('dataFileHeight', '630');
    return img;
  }
  public renderScoreIcons(rowDetails: FifaDetails): HTMLElement {
    const div: HTMLElement = document.createElement('div');
    for (let i = 0; i < rowDetails.TotalGoal; i++) {
      const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'goal');
      svg.setAttribute('width', '14');
      svg.setAttribute('height', '14');
      svg.setAttribute('viewBox', '0 0 14 14');
      svg.setAttribute('fill', 'none');
      const path: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill-rule', 'evenodd');
      path.setAttribute('clip-rule', 'evenodd');
      path.setAttribute('d', 'M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM9.45103 9.48743L11.9038 9.65149C12.3112 8.95696 12.5764 8.16672 12.6584 7.32454L10.5776 6.01477C10.46 5.93821 10.3698 5.82336 10.326 5.68938C10.2823 5.5554 10.2877 5.41047 10.3397 5.27922L11.253 2.99875C10.7088 2.38625 10.0334 1.89133 9.27329 1.55774L7.38384 3.13274C7.2772 3.22297 7.13774 3.27219 6.99829 3.27219C6.85884 3.27219 6.72212 3.22297 6.61274 3.13274L4.72329 1.55774C3.96313 1.89133 3.28774 2.38625 2.7436 2.99875L3.65415 5.27922C3.7061 5.41047 3.71157 5.5554 3.66782 5.68938C3.62407 5.82336 3.53657 5.93821 3.41626 6.01477L1.33813 7.32454C1.41743 8.16672 1.6854 8.95696 2.09282 9.65149L4.54556 9.48743C4.68774 9.47922 4.82993 9.51751 4.94204 9.60227C5.05415 9.68704 5.13618 9.80735 5.17173 9.94407L5.77329 12.3284C6.16978 12.4132 6.5772 12.4597 6.99829 12.4597C7.41938 12.4597 7.82954 12.4159 8.22329 12.3284L8.82485 9.94407C8.85767 9.80462 8.9397 9.68704 9.05454 9.60227C9.16938 9.51751 9.30884 9.47922 9.45103 9.48743ZM5.30298 5.81516L6.61274 4.86633C6.84243 4.69954 7.15415 4.69954 7.38384 4.86633V4.8636L8.6936 5.81516C8.92329 5.98196 9.01899 6.27727 8.93149 6.54797L8.4311 8.08743C8.3436 8.35813 8.09204 8.54133 7.80767 8.54133H6.18892C5.90454 8.54133 5.65298 8.35813 5.56548 8.08743L5.06509 6.54797C4.97759 6.27727 5.07329 5.98196 5.30298 5.81516Z');
      path.setAttribute('fill', '#808080');
      svg.appendChild(path);
      div.appendChild(svg);
    }
    return div;
  }
}
