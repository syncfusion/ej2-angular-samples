import { Component, ViewEncapsulation } from '@angular/core';
import {
  ChartAllModule,
  ILoadedEventArgs,
  IPointRenderEventArgs, ChartAnnotationSettingsModel
} from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { CommonModule } from '@angular/common';
import { loadChartTheme } from './theme-color';

interface OlympicData {
  Country: string;
  Count: number;
}

@Component({
  selector: 'app-axis-label-template-chart',
  templateUrl: './axis-label-template.html',
  styleUrls: ['chart.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, ChartAllModule]
})
export class AxisLabelTemplateChartComponent {
  // Data
  public olympicsGoldData: OlympicData[] = [
    { Country: 'USA', Count: 40 },
    { Country: 'China', Count: 40 },
    { Country: 'Great Britain', Count: 14 },
    { Country: 'France', Count: 16 },
    { Country: 'Australia', Count: 18 },
    { Country: 'Japan', Count: 20 },
    { Country: 'Italy', Count: 12 },
    { Country: 'Netherlands', Count: 15 },
    { Country: 'Germany', Count: 12 },
    { Country: 'South Korea', Count: 13 }
  ];

  public olympicsSilverData: OlympicData[] = [
    { Country: 'USA', Count: 44 },
    { Country: 'China', Count: 27 },
    { Country: 'Great Britain', Count: 22 },
    { Country: 'France', Count: 26 },
    { Country: 'Australia', Count: 19 },
    { Country: 'Japan', Count: 12 },
    { Country: 'Italy', Count: 13 },
    { Country: 'Netherlands', Count: 7 },
    { Country: 'Germany', Count: 13 },
    { Country: 'South Korea', Count: 9 }
  ];

  public olympicsBronzeData: OlympicData[] = [
    { Country: 'USA', Count: 42 },
    { Country: 'China', Count: 24 },
    { Country: 'Great Britain', Count: 29 },
    { Country: 'France', Count: 22 },
    { Country: 'Australia', Count: 16 },
    { Country: 'Japan', Count: 13 },
    { Country: 'Italy', Count: 15 },
    { Country: 'Netherlands', Count: 12 },
    { Country: 'Germany', Count: 8 },
    { Country: 'South Korea', Count: 10 }
  ];

  // Simple palette
  private palette = ['#00bdae', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#404041'];

  // Chart meta
  public width: string = Browser.isDevice ? '100%' : '75%';
  public title: string = "Olympic medal standings 2024";
  public subTitle: string = 'Source: www.olympics.com';

  // Chart area
  public chartArea: Object = { border: { width: 0 } };

  // X axis with label template function
  public primaryXAxis: any = {
    valueType: 'Category',
    majorGridLines: { width: 0 }, lineStyle: { width: 0 },
    majorTickLines: { width: 0 }, isInversed: true,
    labelTemplate: '<div id="labelTemplate" class="light-bg" style="display:flex;align-items:center;gap:8px;border-radius:3px;width:130px;justify-content:space-between;">' +
      '<div style="display:flex;align-items:center;gap:6px;flex:1;min-width:0;">' +
      '<span style="font-size:12px;width:18px;text-align:right;display:inline-block;">${(value + 1)}.</span>' +
      '<span style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</span>' +
      '</div>' +
      '<img src="./assets/chart/images/labelTemplate/${label}.png" alt="${label} flag" width="22" height="22" style="border-radius:50%" />' +
      '</div>'
  };

  // Y axis
  public primaryYAxis: any = {
    visible: false, maximum: 130
  };
  public isTransposed: boolean = true;
  // Legend and tooltip
  public legendSettings: Object = { visible: true };
  public tooltip: Object = { enable: true };
  public marker: Object = {
    dataLabel: { visible: true, position: 'Middle' }
  };
  public annotations: ChartAnnotationSettingsModel[] = [
    {
      content: '<img style="margin-top:15px;height:150px;width:220px;opacity:0.5" src="./assets/chart/images/medals.png" alt="Medals" />',
      coordinateUnits: 'Point',
      x: 'Netherlands',
      y: Browser.isDevice ? '90' : '110'
    }
  ];


  public load(args: ILoadedEventArgs): void {
    loadChartTheme(args);
  }
  public loaded(args: ILoadedEventArgs): void {
    let selectedTheme: string = loadChartTheme(args);
    const isDark = selectedTheme.includes('Dark') || selectedTheme.includes('HighContrast');
    const labels = document.querySelectorAll('#labelTemplate');
    for (var i = 0; i < labels.length; i++) {
      let element = labels[i];
      element.classList.remove('dark-bg');
      element.classList.remove('light-bg');
      element.classList.add(isDark ? 'dark-bg' : 'light-bg');
    }
  }

}