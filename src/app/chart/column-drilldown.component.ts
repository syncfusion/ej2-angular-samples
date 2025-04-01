import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, ChartTheme, ILoadedEventArgs, IPointRenderEventArgs, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs, IMouseEventArgs, ChartAllModule, IAxisLabelClickEventArgs, Series } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { bubbleFabricColors, pointFabricColors, pointMaterialDarkColors, bubbleMaterialDarkColors, bubbleMaterialColors, pointMaterialColors, bubbleBootstrap5DarkColors, pointBootstrap5DarkColors, bubbleBootstrap5Colors, pointBootstrap5Colors, bubbleBootstrapColors, pointBootstrapColors, bubbleHighContrastColors, pointHighContrastColors, bubbleFluentDarkColors, pointFluentDarkColors, bubbleFluentColors, pointFluentColors, bubbleTailwindDarkColors, pointTailwindDarkColors, bubbleTailwindColors, pointTailwindColors, bubbleMaterial3Colors, pointMaterial3Colors, bubbleMaterial3DarkColors, pointMaterial3DarkColors, bubbleFluent2Colors, pointFluent2Colors, bubbleFluent2HighContrastColors, pointFluent2HighContrastColors, bubbleFluent2DarkColors, pointFluent2DarkColors, pointTailwind3Colors, pointTailwind3DarkColors, loadChartTheme } from './theme-color';

@Component({
    selector: 'control-content',
    templateUrl: 'column-drilldown.html',
    styleUrls: ['chart.style.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class ColumnDrilldownComponent implements OnInit {
    @ViewChild('chart')
    public chart: ChartComponent;

    public data: Object[] = [
        { y: 4778, drilldown: 'Asia' },
        { y: 1481, drilldown: 'Africa' },
        { y: 746, drilldown: 'Europe' },
        { y: 379, drilldown: 'North America' },
        { y: 46, drilldown: 'Oceania' }
    ];

    public primaryXAxis: Object = {
        valueType: 'Category',
        labelStyle: { color: 'blue' },
        interval: 1,
        majorGridLines: { width: 0 },
        labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate90',
        labelRotation: Browser.isDevice ? -45 : 0,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };

    public primaryYAxis: Object = {
        title: 'Population (in Millions)',
        majorTickLines: { width: 0 },
        lineStyle: { width: 0 },
        interval: 1000
    };

    public chartArea: Object = {
        border: { width: 0 }
    };

    public cornerRadius: Object = {
        topLeft: 5,
        topRight: 5
    };

    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'Top Populated Continents of 2023';
    public subTitle: string = 'A Look at Population Rankings and Trends in 2023';
    public tooltip: Object = {
        enable: true,
        header: "<b>Population - 2023</b>",
        format: '${point.x}: ${point.y}M'
    };
    public legendSettings: Object = { visible: false };

    private clicked: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
    }

    public loaded(args: ILoadedEventArgs): void {
        if (!this.clicked) {
            for (let i = 0; i <= 6; i++) {
                const axisLabel = document.getElementById(`drilldown0_AxisLabel_${i}`);
                if (axisLabel) {
                    axisLabel.style.textDecoration = 'underline';
                    axisLabel.style.cursor = 'pointer';
                    axisLabel.style.color = 'blue';
                }
                const seriesElement = document.getElementById(`drilldown_Series_0_Point_${i}`);
                if (seriesElement) {
                    axisLabel.style.textDecoration = 'underline';
                    seriesElement.style.cursor = 'pointer';
                    seriesElement.classList.add('no-underline');
                }
            }
        }
    }
    public pointClick(args: IPointRenderEventArgs): void {
        args.series.fill = args.point.color;
        if (args.point.index !== 6) {
            args.series.yAxis.interval = null;
            if (!args.series.chart.theme.includes('Dark') && args.series.chart.theme !== 'HighContrast' && args.series.chart.theme !== 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "black";
            }
            else if (args.series.chart.theme === 'Material3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
            }
            else if (args.series.chart.theme === 'FluentDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
            }
            else if (args.series.chart.theme === 'Fluent2Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#ADADAD";
            }
            else if (args.series.chart.theme === 'Bootstrap5Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
            }
            else if (args.series.chart.theme === 'TailwindDark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
            }
            else if (args.series.chart.theme === 'Tailwind3Dark') {
                args.series.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
            }
            else if (args.series.chart.theme === 'HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#969696";
            }
            else if (args.series.chart.theme === 'Fluent2HighContrast') {
                args.series.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
            }
            if (!this.clicked) {
                document.getElementById("text").innerHTML = <string>args.point.x;
                document.getElementById("category").style.visibility = "visible";
                document.getElementById("symbol").style.visibility = "visible";
                document.getElementById("text").style.visibility = "visible";
                if (args.point.index === 0) {
                    args.series.chart.title = "Top Populated Countries of Asia - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 1422,
                            drilldown: 'China'
                        },
                        {
                            y: 1438,
                            drilldown: 'India'
                        },
                        {
                            y: 278,
                            drilldown: 'Indonesia'
                        },
                        {
                            y: 240,
                            drilldown: 'Pakistan'
                        },
                        {
                            y: 173,
                            drilldown: 'Bangladesh'
                        },
                        {
                            y: 125,
                            drilldown: 'Japan'
                        },
                        {
                            y: 117,
                            drilldown: 'Philippines'
                        },
                        {
                            y: 99,
                            drilldown: 'Vietnam'
                        }
                    ];
                }
                if (args.point.index === 1) {
                    args.series.chart.title = "Top Populated Countries of Africa - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 223,
                            drilldown: 'Nigeria'
                        },
                        {
                            y: 126,
                            drilldown: 'Ethiopia'
                        },
                        {
                            y: 113,
                            drilldown: 'Egypt'
                        },
                        {
                            y: 68,
                            drilldown: 'Tanzania'
                        },
                        {
                            y: 60,
                            drilldown: 'South Africa'
                        },
                        {
                            y: 55,
                            drilldown: 'Kenya'
                        },
                        {
                            y: 48,
                            drilldown: 'Uganda'
                        }
                    ];
                }
                if (args.point.index === 2) {
                    args.series.chart.title = "Top Populated Countries of Europe - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 143,
                            drilldown: 'Russia'
                        },
                        {
                            y: 84,
                            drilldown: 'Germany'
                        },
                        {
                            y: 67,
                            drilldown: 'United Kingdom'
                        },
                        {
                            y: 65,
                            drilldown: 'France'
                        },
                        {
                            y: 59,
                            drilldown: 'Italy'
                        },
                        {
                            y: 47,
                            drilldown: 'Spain'
                        }
                    ];
                }
                if (args.point.index === 3) {
                    args.series.chart.title = "Top Populated Countries of North America - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 339,
                            drilldown: 'United States'
                        },
                        {
                            y: 127,
                            drilldown: 'Mexico'
                        },
                        {
                            y: 39,
                            drilldown: 'Canada'
                        },
                        {
                            y: 19,
                            drilldown: 'Guatemala'
                        },
                        {
                            y: 10,
                            drilldown: 'Honduras'
                        },
                        {
                            y: 6,
                            drilldown: 'El Salvador'
                        },
                        {
                            y: 6,
                            drilldown: 'Nicaragua'
                        },
                        {
                            y: 5,
                            drilldown: 'Costa Rica'
                        }
                    ];
                }
                if (args.point.index === 4) {
                    args.series.chart.title = "Top Populated Countries of Oceania - 2023";
                    args.series.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                    this.clicked = true;
                    args.series.chart.series[0].dataSource = [{
                            y: 26,
                            drilldown: 'Australia'
                        },
                        {
                            y: 9,
                            drilldown: 'Papua New Guinea'
                        },
                        {
                            y: 5,
                            drilldown: 'New Zealand'
                        }
                    ];
                }
            }
        }
    }
    public marker: Object = {
        dataLabel: {
            visible: true,
            position: 'Outer',
        }
    };

    public tooltipRender = (args: ITooltipRenderEventArgs) => {
        args.text = args.text.replace(/\d+/g, (num: string) =>
            Number(num).toLocaleString('en-US')
        );
    };

    public pointRender(args: IPointRenderEventArgs): void {
        if (!this.clicked) {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'material';
            if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
                args.fill = pointFabricColors[args.point.index % 10];;
            } else if (selectedTheme === 'material-dark') {
                args.fill = pointMaterialDarkColors[args.point.index % 10];;
            } else if (selectedTheme === 'material') {
                args.fill = pointMaterialColors[args.point.index % 10];
            } else if (selectedTheme === 'bootstrap5-dark') {
                args.fill = pointBootstrap5DarkColors[args.point.index % 10];
            } else if (selectedTheme === 'bootstrap5') {
                args.fill = pointBootstrap5Colors[args.point.index % 10];
            } else if (selectedTheme === 'bootstrap') {
                args.fill = pointBootstrapColors[args.point.index % 10];
            } else if (selectedTheme === 'bootstrap4') {
                args.fill = pointBootstrapColors[args.point.index % 10];
            } else if (selectedTheme === 'bootstrap-dark') {
                args.fill = pointBootstrapColors[args.point.index % 10];
            } else if (selectedTheme === 'highcontrast') {
                args.fill = pointHighContrastColors[args.point.index % 10];
            } else if (selectedTheme === 'fluent-dark') {
                args.fill = pointFluentDarkColors[args.point.index % 10];
            } else if (selectedTheme === 'fluent') {
                args.fill = pointFluentColors[args.point.index % 10];
            } else if (selectedTheme === 'tailwind-dark') {
                args.fill = pointTailwindDarkColors[args.point.index % 10];
            } else if (selectedTheme === 'tailwind') {
                args.fill = pointTailwindColors[args.point.index % 10];
            }
            else if (selectedTheme === 'material3') {
                args.fill = pointMaterial3Colors[args.point.index % 10];
            }
            else if (selectedTheme === 'material3-dark') {
                args.fill = pointMaterial3DarkColors[args.point.index % 10];
            }
            else if (selectedTheme === 'fluent2') {
                args.fill = pointFluent2Colors[args.point.index % 10];
            }
            else if (selectedTheme === 'fluent2-highcontrast') {
                args.fill = pointFluent2HighContrastColors[args.point.index % 10];
            }
            else if (selectedTheme === 'fluent2-dark') {
                args.fill = pointFluent2DarkColors[args.point.index % 10];
            } else if (selectedTheme === 'tailwind3-dark') {
                args.fill = pointTailwind3DarkColors[args.point.index % 10];
            } 
            else if (selectedTheme === 'tailwind3') {
                args.fill = pointTailwind3Colors[args.point.index % 10];
            }
        }
    }

    public chartMouseClick(args: IMouseEventArgs): void {
        if (args.target.indexOf('category') > -1) {
            this.chart.series[0].dataSource = this.data;
        }
    }

    public axisLabelClick(args: IAxisLabelClickEventArgs): void {
        if (args.axis.name === "primaryXAxis") {
            this.chart.series[0].fill = (this.chart.series[0] as Series).points[args.value].color;
            if (args.value !== 6) {
                this.chart.primaryYAxis.interval = null;
                if (!args.chart.theme.includes('Dark') && args.chart.theme !== 'HighContrast' && args.chart.theme !== 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "black";
                }
                else if (args.chart.theme === 'Material3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#CAC4D0";
                }
                else if (args.chart.theme === 'FluentDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#C8C6C4";
                }
                else if (args.chart.theme === 'Fluent2Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#ADADAD";
                }
                else if (args.chart.theme === 'Bootstrap5Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#DEE2E6";
                }
                else if (args.chart.theme === 'TailwindDark') {
                    args.chart.primaryXAxis.labelStyle.color = "#9CA3AF";
                }
                else if (args.chart.theme === 'Tailwind3Dark') {
                    args.chart.primaryXAxis.labelStyle.color = "#D1D5DB";
                }
                else if (args.chart.theme === 'HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#969696";
                }
                else if (args.chart.theme === 'Fluent2HighContrast') {
                    args.chart.primaryXAxis.labelStyle.color = "#FFFFFF";
                }
                if (!this.clicked) {
                    document.getElementById("text").innerHTML = args.text;
                    document.getElementById("category").style.visibility = "visible";
                    document.getElementById("symbol").style.visibility = "visible";
                    document.getElementById("text").style.visibility = "visible";
                    if (args.index === 0) {
                        args.chart.title = "Top Populated Countries of Asia - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 1422,
                            drilldown: 'China'
                        },
                        {
                            y: 1438,
                            drilldown: 'India'
                        },
                        {
                            y: 278,
                            drilldown: 'Indonesia'
                        },
                        {
                            y: 240,
                            drilldown: 'Pakistan'
                        },
                        {
                            y: 173,
                            drilldown: 'Bangladesh'
                        },
                        {
                            y: 125,
                            drilldown: 'Japan'
                        },
                        {
                            y: 117,
                            drilldown: 'Philippines'
                        },
                        {
                            y: 99,
                            drilldown: 'Vietnam'
                        }
                        ]
                    }
                    if (args.index === 1) {
                        args.chart.title = "Top Populated Countries of Africa - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 223,
                            drilldown: 'Nigeria'
                        },
                        {
                            y: 126,
                            drilldown: 'Ethiopia'
                        },
                        {
                            y: 113,
                            drilldown: 'Egypt'
                        },
                        {
                            y: 68,
                            drilldown: 'Tanzania'
                        },
                        {
                            y: 60,
                            drilldown: 'South Africa'
                        },
                        {
                            y: 55,
                            drilldown: 'Kenya'
                        },
                        {
                            y: 48,
                            drilldown: 'Uganda'
                        }
                        ]
                    }
                    if (args.index === 2) {
                        args.chart.title = "Top Populated Countries of Europe - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 143,
                            drilldown: 'Russia'
                        },
                        {
                            y: 84,
                            drilldown: 'Germany'
                        },
                        {
                            y: 67,
                            drilldown: 'United Kingdom'
                        },
                        {
                            y: 65,
                            drilldown: 'France'
                        },
                        {
                            y: 59,
                            drilldown: 'Italy'
                        },
                        {
                            y: 47,
                            drilldown: 'Spain'
                        }
                        ]
                    }
                    if (args.index === 3) {
                        args.chart.title = "Top Populated Countries of North America - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 339,
                            drilldown: 'United States'
                        },
                        {
                            y: 127,
                            drilldown: 'Mexico'
                        },
                        {
                            y: 39,
                            drilldown: 'Canada'
                        },
                        {
                            y: 19,
                            drilldown: 'Guatemala'
                        },
                        {
                            y: 10,
                            drilldown: 'Honduras'
                        },
                        {
                            y: 6,
                            drilldown: 'El Salvador'
                        },
                        {
                            y: 6,
                            drilldown: 'Nicaragua'
                        },
                        {
                            y: 5,
                            drilldown: 'Costa Rica'
                        }
                        ]
                    }
                    if (args.index === 4) {
                        args.chart.title = "Top Populated Countries of Oceania - 2023";
                        args.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
                        this.clicked = true;
                        args.chart.series[0].dataSource = [{
                            y: 26,
                            drilldown: 'Australia'
                        },
                        {
                            y: 9,
                            drilldown: 'Papua New Guinea'
                        },
                        {
                            y: 5,
                            drilldown: 'New Zealand'
                        }
                        ]
                    }
                }
            }
        }
    }

    public resetChart(): void {
        this.chart.title = "Top Populated Continents of 2023";
        this.chart.subTitle = "A Look at Population Rankings and Trends in 2023";
        this.chart.primaryXAxis.labelStyle.color = "blue";
        this.chart.primaryYAxis.interval = 1000;
        this.chart.series[0].dataSource = this.data;
        this.clicked = false;
        document.getElementById('category').style.visibility = 'hidden';
        document.getElementById('symbol').style.visibility = 'hidden';
        document.getElementById('text').style.visibility = 'hidden';
    }
}
