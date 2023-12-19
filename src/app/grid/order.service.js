var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
var OrdersService = /** @class */ (function (_super) {
    __extends(OrdersService, _super);
    function OrdersService() {
        var _this = _super.call(this) || this;
        _this.BASE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';
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
            sortQuery =
                "&$orderby=" +
                    state.sorted
                        .map(function (obj) {
                        return obj.direction === 'descending'
                            ? obj.name + " desc"
                            : obj.name;
                    })
                        .reverse()
                        .join(',');
        }
        return this.fetchData(this.BASE_URL + "?" + pageQuery + sortQuery + "&$count=true").pipe(map(function (response) {
            var result = response['value'];
            var count = response['@odata.count'];
            return { result: result, count: count };
        }));
    };
    OrdersService.prototype.fetchData = function (url) {
        return new Observable(function (observer) {
            fetch(url)
                .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(function (data) {
                observer.next(data);
                observer.complete();
            })
                .catch(function (error) {
                observer.error(error);
            });
        });
    };
    OrdersService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OrdersService_Factory() { return new OrdersService(); }, token: OrdersService, providedIn: "root" });
    OrdersService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    OrdersService.ctorParameters = function () { return []; };
    return OrdersService;
}(Subject));
export { OrdersService };
//# sourceMappingURL=order.service.js.map