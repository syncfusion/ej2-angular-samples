var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
var OrdersService = /** @class */ (function (_super) {
    __extends(OrdersService, _super);
    function OrdersService(http) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.BASE_URL = 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders';
        return _this;
    }
    OrdersService.prototype.execute = function (state) {
        var _this = this;
        this.getData(state).subscribe(function (x) { return _super.prototype.next.call(_this, x); });
    };
    OrdersService.prototype.getData = function (state) {
        var pageQuery = "$skip=" + state.skip + "&$top=" + state.take;
        var sortQuery = '';
        if ((state.sorted || []).length) {
            sortQuery = "&$orderby=" + state.sorted.map(function (obj) {
                return obj.direction === 'descending' ? obj.name + " desc" : obj.name;
            }).reverse().join(',');
        }
        return this.http
            .get(this.BASE_URL + "?" + pageQuery + sortQuery + "&$inlinecount=allpages&$format=json")
            .pipe(map(function (response) { return response.json(); }))
            .pipe(map(function (response) { return ({
            result: response['d']['results'],
            count: parseInt(response['d']['__count'], 10)
        }); }))
            .pipe(function (data) { return data; });
    };
    OrdersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    OrdersService.ctorParameters = function () { return [
        { type: Http }
    ]; };
    return OrdersService;
}(Subject));
export { OrdersService };
//# sourceMappingURL=order.service.js.map