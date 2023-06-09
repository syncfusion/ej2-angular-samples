/**
 * chart data source
 */
var ChartDataService = /** @class */ (function () {
    function ChartDataService() {
    }
    ChartDataService.prototype.GetCrosshairData = function () {
        var series1 = [];
        var series2 = [];
        var point1;
        var point2;
        var value = 60;
        var value1 = 50;
        var i;
        for (i = 1; i < 250; i++) {
            if (Math.random() > .5) {
                value += Math.random();
                value1 += Math.random();
            }
            else {
                value -= Math.random();
                value1 -= Math.random();
            }
            point1 = { x: new Date(2000, i, 1), y: value };
            point2 = { x: new Date(2000, i, 1), y: value1 };
            series1.push(point1);
            series2.push(point2);
        }
        return { 'series1': series1, 'series2': series2 };
    };
    ChartDataService.prototype.GetScatterData = function () {
        var series1 = [];
        var series2 = [];
        var point1;
        var value = 80;
        var value1 = 70;
        var i;
        for (i = 1; i < 120; i++) {
            if (Math.random() > 0.5) {
                value += Math.random();
            }
            else {
                value -= Math.random();
            }
            value = value < 60 ? 60 : value > 90 ? 90 : value;
            point1 = { x: (145 + (i / 3)).toFixed(1), y: value.toFixed(1) };
            series1.push(point1);
        }
        for (i = 1; i < 120; i++) {
            if (Math.random() > 0.5) {
                value1 += Math.random();
            }
            else {
                value1 -= Math.random();
            }
            value1 = value1 < 60 ? 60 : value1 > 90 ? 90 : value1;
            point1 = { x: (145 + (i / 3)).toFixed(1), y: value1.toFixed(1) };
            series2.push(point1);
        }
        return { 'series1': series1, 'series2': series2 };
    };
    ChartDataService.prototype.GetLocalData = function () {
        var series1 = [];
        var series2 = [];
        var point1;
        var point2;
        var value = 80;
        var value1 = 90;
        var i;
        for (i = 1; i < 500; i++) {
            if (Math.random() > .5) {
                value += Math.random();
                value1 += Math.random();
            }
            else {
                value -= Math.random();
                value1 -= Math.random();
            }
            point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
            point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
            series1.push(point1);
            series2.push(point2);
        }
        return { 'series1': series1, 'series2': series2 };
    };
    ChartDataService.prototype.GetZoomingData = function () {
        var series1 = [];
        var point1;
        var value = 80;
        var i;
        for (i = 1; i < 500; i++) {
            if (Math.random() > .5) {
                value += Math.random();
            }
            else {
                value -= Math.random();
            }
            point1 = { x: new Date(1960, i + 1, i), y: Math.round(value) };
            series1.push(point1);
        }
        return { 'series1': series1 };
    };
    ChartDataService.prototype.GetPolarSplineData = function () {
        var cardData = [];
        var biDirData = [];
        var omniDirData = [];
        var point1;
        var point2;
        for (var x = -180; x < 180; x++) {
            point1 = { x: x, y: -12.6 * (1 - Math.cos(x * 3.14 / 180)) };
            cardData.push(point1);
            point2 = { x: x, y: -3 };
            omniDirData.push(point2);
        }
        for (var x = -180; x < -90; x++) {
            point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
            biDirData.push(point1);
        }
        for (var x = -90; x < 90; x++) {
            point1 = { x: x, y: -26 * (1 - Math.cos(x * 3.14 / 180)) };
            biDirData.push(point1);
        }
        for (var x = 90; x < 180; x++) {
            point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
            biDirData.push(point1);
        }
        return { 'series1': cardData, 'series2': omniDirData, 'series3': biDirData };
    };
    return ChartDataService;
}());
export { ChartDataService };
//# sourceMappingURL=chart-data.service.js.map