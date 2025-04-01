import { Component, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Line Series
 */
interface DataPoint {
    x: Date;
    y: number;
    color?: string;
}
@Component({
    selector: 'control-content',
    templateUrl: 'line-multi-color.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})
export class MultiLineChartComponent {
    public dataValues: Object[] = [];
    public colors: string[] = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue', 'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
    public multiColoredLineData: DataPoint[] = [
        { x: new Date(1895, 0, 1), y: 26.69 },
        { x: new Date(1896, 0, 1), y: 31.48 },
        { x: new Date(1897, 0, 1), y: 28.17 },
        { x: new Date(1898, 0, 1), y: 30.67 },
        { x: new Date(1899, 0, 1), y: 29.68 },
        { x: new Date(1900, 0, 1), y: 34.11 },
        { x: new Date(1901, 0, 1), y: 31.62 },
        { x: new Date(1902, 0, 1), y: 30.06 },
        { x: new Date(1903, 0, 1), y: 30.88 },
        { x: new Date(1904, 0, 1), y: 27.55 },
        { x: new Date(1905, 0, 1), y: 27.12 },
        { x: new Date(1906, 0, 1), y: 32.88 },
        { x: new Date(1907, 0, 1), y: 30.7 },
        { x: new Date(1908, 0, 1), y: 32.45 },
        { x: new Date(1909, 0, 1), y: 32.31 },
        { x: new Date(1910, 0, 1), y: 29.61 },
        { x: new Date(1911, 0, 1), y: 32.9 },
        { x: new Date(1912, 0, 1), y: 24.76 },
        { x: new Date(1913, 0, 1), y: 30.47 },
        { x: new Date(1914, 0, 1), y: 34.5 },
        { x: new Date(1915, 0, 1), y: 28.44 },
        { x: new Date(1916, 0, 1), y: 28.22 },
        { x: new Date(1917, 0, 1), y: 28.27 },
        { x: new Date(1918, 0, 1), y: 23.88 },
        { x: new Date(1919, 0, 1), y: 31.82 },
        { x: new Date(1920, 0, 1), y: 29.23 },
        { x: new Date(1921, 0, 1), y: 34.36 },
        { x: new Date(1922, 0, 1), y: 26.8 },
        { x: new Date(1923, 0, 1), y: 34.59 },
        { x: new Date(1924, 0, 1), y: 26.26 },
        { x: new Date(1925, 0, 1), y: 29.1 },
        { x: new Date(1926, 0, 1), y: 30.33 },
        { x: new Date(1927, 0, 1), y: 31.55 },
        { x: new Date(1928, 0, 1), y: 31.98 },
        { x: new Date(1929, 0, 1), y: 26.33 },
        { x: new Date(1930, 0, 1), y: 23.56 },
        { x: new Date(1931, 0, 1), y: 32.99 },
        { x: new Date(1932, 0, 1), y: 31.55 },
        { x: new Date(1933, 0, 1), y: 34.3 },
        { x: new Date(1934, 0, 1), y: 35.08 },
        { x: new Date(1935, 0, 1), y: 31.51 },
        { x: new Date(1936, 0, 1), y: 27.36 },
        { x: new Date(1937, 0, 1), y: 24.84 },
        { x: new Date(1938, 0, 1), y: 32.14 },
        { x: new Date(1939, 0, 1), y: 33.91 },
        { x: new Date(1940, 0, 1), y: 23.83 },
        { x: new Date(1941, 0, 1), y: 32.2 },
        { x: new Date(1942, 0, 1), y: 29.84 },
        { x: new Date(1943, 0, 1), y: 29.41 },
        { x: new Date(1944, 0, 1), y: 32.02 },
        { x: new Date(1945, 0, 1), y: 30.49 },
        { x: new Date(1946, 0, 1), y: 31.39 },
        { x: new Date(1947, 0, 1), y: 31.78 },
        { x: new Date(1948, 0, 1), y: 27.88 },
        { x: new Date(1949, 0, 1), y: 25.92 },
        { x: new Date(1950, 0, 1), y: 30.43 },
        { x: new Date(1951, 0, 1), y: 30.2 },
        { x: new Date(1952, 0, 1), y: 32.0 },
        { x: new Date(1953, 0, 1), y: 36.43 },
        { x: new Date(1954, 0, 1), y: 30.9 },
        { x: new Date(1955, 0, 1), y: 29.35 },
        { x: new Date(1956, 0, 1), y: 31.01 },
        { x: new Date(1957, 0, 1), y: 27.07 },
        { x: new Date(1958, 0, 1), y: 31.6 },
        { x: new Date(1959, 0, 1), y: 29.5 },
        { x: new Date(1960, 0, 1), y: 29.46 },
        { x: new Date(1961, 0, 1), y: 29.71 },
        { x: new Date(1962, 0, 1), y: 26.96 },
        { x: new Date(1963, 0, 1), y: 24.44 },
        { x: new Date(1964, 0, 1), y: 31.53 },
        { x: new Date(1965, 0, 1), y: 31.8 },
        { x: new Date(1966, 0, 1), y: 26.38 },
        { x: new Date(1967, 0, 1), y: 33.1 },
        { x: new Date(1968, 0, 1), y: 28.94 },
        { x: new Date(1969, 0, 1), y: 29.37 },
        { x: new Date(1970, 0, 1), y: 27.16 },
        { x: new Date(1971, 0, 1), y: 29.41 },
        { x: new Date(1972, 0, 1), y: 29.93 },
        { x: new Date(1973, 0, 1), y: 29.59 },
        { x: new Date(1974, 0, 1), y: 31.01 },
        { x: new Date(1975, 0, 1), y: 32.34 },
        { x: new Date(1976, 0, 1), y: 29.93 },
        { x: new Date(1977, 0, 1), y: 23.09 },
        { x: new Date(1978, 0, 1), y: 25.86 },
        { x: new Date(1979, 0, 1), y: 21.92 },
        { x: new Date(1980, 0, 1), y: 31.12 },
        { x: new Date(1981, 0, 1), y: 32.41 },
        { x: new Date(1982, 0, 1), y: 26.22 },
        { x: new Date(1983, 0, 1), y: 33.12 },
        { x: new Date(1984, 0, 1), y: 28.83 },
        { x: new Date(1985, 0, 1), y: 26.31 },
        { x: new Date(1986, 0, 1), y: 34.68 },
        { x: new Date(1987, 0, 1), y: 31.44 },
        { x: new Date(1988, 0, 1), y: 27.79 },
        { x: new Date(1989, 0, 1), y: 34.09 },
        { x: new Date(1990, 0, 1), y: 36.48 },
        { x: new Date(1991, 0, 1), y: 29.5 },
        { x: new Date(1992, 0, 1), y: 33.62 },
        { x: new Date(1993, 0, 1), y: 30.47 },
        { x: new Date(1994, 0, 1), y: 29.34 },
        { x: new Date(1995, 0, 1), y: 33.08 },
        { x: new Date(1996, 0, 1), y: 29.7 },
        { x: new Date(1997, 0, 1), y: 29.97 },
        { x: new Date(1998, 0, 1), y: 34.99 },
        { x: new Date(1999, 0, 1), y: 33.78 },
        { x: new Date(2000, 0, 1), y: 33.57 },
        { x: new Date(2001, 0, 1), y: 31.37 },
        { x: new Date(2002, 0, 1), y: 34.48 },
        { x: new Date(2003, 0, 1), y: 32.81 },
        { x: new Date(2004, 0, 1), y: 30.36 },
        { x: new Date(2005, 0, 1), y: 33.39 },
        { x: new Date(2006, 0, 1), y: 38.93 },
        { x: new Date(2007, 0, 1), y: 31.35 },
        { x: new Date(2008, 0, 1), y: 30.27 },
        { x: new Date(2009, 0, 1), y: 31.05 },
        { x: new Date(2010, 0, 1), y: 30.67 },
        { x: new Date(2011, 0, 1), y: 29.71 },
        { x: new Date(2012, 0, 1), y: 36.12 },
        { x: new Date(2013, 0, 1), y: 32.25 },
        { x: new Date(2014, 0, 1), y: 30.56 },
        { x: new Date(2015, 0, 1), y: 33.08 },
        { x: new Date(2016, 0, 1), y: 32.22 },
        { x: new Date(2017, 0, 1), y: 33.57 },
        { x: new Date(2018, 0, 1), y: 32.16 },
        { x: new Date(2019, 0, 1), y: 32.56 },
        { x: new Date(2020, 0, 1), y: 35.53 },
        { x: new Date(2021, 0, 1), y: 34.59 },
        { x: new Date(2022, 0, 1), y: 31.17 },
        { x: new Date(2023, 0, 1), y: 35.08 },
        { x: new Date(2024, 0, 1), y: 31.89 },
        { x: new Date(2025, 0, 1), y: 29.23 }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'DateTime',
        labelFormat: 'y',
        intervalType: 'Years',
        minimum: new Date(1895, 0, 1),
        maximum: new Date(2025, 0, 1),
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        labelFormat: '{value}°F',
        minimum: 20,
        maximum: 40,
        interval: 4,
        title: 'Mean Temperature (°F)',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '75%';
    public legend: Object = { visible: false };
    public tooltip: Object = {
        enable: true,
        showNearestTooltip: true,
        enableAnimation: false,
        header: '<b>Year: ${point.x}</b>',
        format: 'Avg Temp : <b>${point.y}</b>',
        enableHighlight: true
    };
    public load(args: ILoadedEventArgs): void {
        loadChartTheme(args);
        this.multiColoredLineData = this.multiColoredLineData.map((value: DataPoint, index: number) => ({
            ...value,
            color: this.colors[Math.floor(index / 10)]
        }));
    };
    public title: string = 'U.S. Historical Average Temperature (1895–2025)';
    public subTitle: string = 'Source: ncei.noaa.gov';

    constructor() {
        //code
    };

}