import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridModule, ColumnsDirective, ColumnDirective, DetailRowService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { CommonModule } from '@angular/common';
import { productDetail } from './data';

@Component({
  selector: 'ej2-detail-card',
  templateUrl: 'product.catalog.html',
  styleUrls: ['product.catalog.style.css'],
  providers: [DetailRowService, SortService, FilterService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent, CommonModule]
})
export class ProductCatalogComponent implements OnInit {
  public productData: any[] = [];
  public filterSettings: Object = {};

  ngOnInit(): void {
    this.productData = productDetail;
    this.filterSettings = { type: 'Excel' };
  }

  private max(a: number, b: number): number {
    return a >= b ? a : b;
  }

  private round(value: number): number {
    return (value < 0 ? value - 0.5 : value + 0.5) << 0;
  }

  getTrend(item: any): number {
    const prev = item.SalesMonth2 || 1;
    const trend = ((item.SalesMonth3 - prev) / this.max(prev, 1)) * 100;
    return parseFloat(trend.toFixed(1));
  }

  getDiscount(item: any): number {
    if (!item.OriginalPrice || !item.Price) return 0;
    return this.round(((item.OriginalPrice - item.Price) / item.OriginalPrice) * 100);
  }

  formatCurrency(val: number): string {
    if (val == null) return '';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    } catch (e) {
      return '$' + val;
    }
  }

  roundValue(val: number): number {
    return this.round(val);
  }

  formatProfitMargin(item: any): string {
    if (!item.OriginalPrice || item.OriginalPrice === 0 || item.CostPrice == null) return '0%';
    const margin = this.round(((item.OriginalPrice - item.CostPrice) / item.OriginalPrice) * 100);
    return `${margin}%`;
  }

  getSpecificationKeys(specs: any): string[] {
    return Object.keys(specs);
  }
}
