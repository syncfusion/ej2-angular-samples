import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { sampleData, foodMenu } from './jsontreegriddata';
import { TreeGridAllModule, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ViewChild } from '@angular/core';
import {
  DialogComponent,
  DialogAllModule,
} from '@syncfusion/ej2-angular-popups';
import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';
import { ChipList } from '@syncfusion/ej2-buttons';
import { ChipListAllModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'ej2-treegrid-container',
  templateUrl: 'restarunt-menu.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrl: 'restarunt-menu.component.css',
  imports: [
    TreeGridAllModule,
    AutoCompleteAllModule,
    NumericTextBoxAllModule,
    DialogAllModule,
    CommonModule,
    ChipListAllModule,
  ],
})
export class RestaruntMenuComponent {
  @ViewChild('cartDialog') cartDialog!: DialogComponent;
  @ViewChild('treeGrid') treegrid!: TreeGridComponent;
    @ViewChild('emptyTemplate', { static: true })
  emptyTemplate: any;

  foodMenu: any[] = foodMenu; // assume this is loaded
  dishNames = this.foodMenu.map((i) => i.FoodName);
  foodOrderDetails: any[] = [];
  cartCount = 0;
  cartHtml = '';
  columns = [{ field: 'FoodName', headerText: 'DISH NAME', width: 150 }];
  toolbar = [
    { template: '<div class="e-btn-group e-custom-button badge-block"><button id="CartUpdate" class="e-btn">VIEW CART<span id="cartbadge" class="e-cart-badge e-badge e-badge-primary e-badge-notification e-badge-overlap">0</span></button></div>', id: 'cartButton', align: 'Right' }
  ];

  dialogButtons = [
    {
      click: () => this.clearCart(),
      buttonModel: { content: 'Clear', cssClass: 'e-danger' },
    },
    {
      click: () => this.printCart(),
      buttonModel: { content: 'Print', isPrimary: true },
    },
  ];

  clearCart() {
    this.foodOrderDetails.forEach(function (item) { item.count = 0; });
    this.cartCount = 0;
    document.getElementsByClassName('e-cart-badge')[0].textContent = this.cartCount.toString();
    this.cartDialog.content = this.getCartTableHtml([]);
    this.cartDialog.hide();
  }
  isCategoryRow(data: any): boolean {
    return !data.CategoryId || data.FoodName === data.FoodCategory;
  }
  ngAfterViewInit(): void {
    // Set up cart button click handler
    setTimeout(() => {
      const cartButton = document.getElementById('CartUpdate');
      if (cartButton) {
        cartButton.onclick = () => this.showCart();
      }
    }, 100);
  }

  getTotalItems(data: any): number {
    return (data.vegCount || 0) + (data.nonvegCount || 0);
  }
  public chiptags(ingredients: string[]): string {
    const chipElement = document.createElement('div');
    new ChipList({ chips: ingredients, cssClass: 'e-outline' }, chipElement);
    return chipElement.outerHTML;
  }
  dataBound(){
    if(this.treegrid.initialRender){
      this.treegrid.grid.emptyRecordTemplate=this.emptyTemplate;
    }
  }
  onRowDataBound(args: any): void {
    const chipDivs = document.querySelectorAll('.chip-placeholder');

    chipDivs.forEach(div => {
      // Avoid re-rendering

      const chips = JSON.parse(div.getAttribute('data-ingredients') || '[]');

      const chipList = new ChipList({
        chips: chips,
        cssClass: 'e-outline'
      }, '#chip');

      div.appendChild(chipList.element);
      div.setAttribute('data-initialized', 'true');

    });

  }

  getCount(foodName: string): number {
    const existing = this.foodOrderDetails.find((i) => i.foodName === foodName);
    return existing ? existing.count : 0;
  }

  onFoodCountChange(args: any, data: any): void {

    if (args.event == undefined || null == args.event.srcElement) {
      return;
    }
    var currentRow = args.event.srcElement.closest("tr");
    var foodName = currentRow.querySelector(".resmenu-foodname").textContent;
    var price = parseFloat(currentRow.querySelector(".resmenu-price").textContent.replace(/[^0-9.]/g, ""));
    var count = args.value;
    if (args.previousValue < args.value) {
      this.cartCount += 1;
    }
    else if (args.previousValue > args.value) {
      this.cartCount -= 1;
    }
    document.getElementsByClassName('e-cart-badge')[0].textContent = this.cartCount.toString();
    var existingFood = this.foodOrderDetails.find(function (item) { return item.foodName === foodName; });
    if (existingFood) {
      existingFood.count = count;
      existingFood.price = price;
    } else {
      this.foodOrderDetails.push({
        foodName: foodName,
        price: price,
        count: count
      });
    }
  }
  onSearchChange(args: any): void {

    var value = args.value ? args.value.toLowerCase() : '';
    var searchedData = this.foodMenu.filter(function (item) {
      return item.FoodName.toLowerCase().includes(value) ||
        item.FoodCategory.toLowerCase().includes(value) ||
        !item.CategoryId;
    });
    searchedData.forEach(function (parent) {
      if (!parent.CategoryId) {
        var childItems = searchedData.filter(function (item) { return item.CategoryId === parent.FoodId; });
        parent.vegCount = childItems.filter(function (item) { return item.FoodType === 'Veg'; }).length;
        parent.nonvegCount = childItems.filter(function (item) { return item.FoodType === 'Non-veg'; }).length;
      }
    });
    searchedData = searchedData.filter(function (item) {
                var foodcount = item.vegCount + item.nonvegCount;
                return (foodcount === 0 && item.CategoryId) || (foodcount > 0 && !item.CategoryId);
            });
    this.treegrid.dataSource = searchedData;
  }

  showCart(): void {

    const itemsInCart = this.foodOrderDetails.filter(
      (item: any) => item.count > 0
    );
    this.cartDialog.content = this.getCartTableHtml(itemsInCart);
    this.cartDialog.show();
  }

  printCart(): void {
    var treeGridElement = this.treegrid;
        var rect = treeGridElement.element.getBoundingClientRect();
        var windowWidth = 400;
        var windowHeight = 600;
        var leftPosition = rect.left + window.scrollX + (rect.width / 2) - (windowWidth / 2);
        var topPosition = rect.top + window.scrollY + (rect.height / 2) - (windowHeight / 2);
        var printContents = document.querySelector('#cartDialog .e-dlg-content').innerHTML;
        var printWindow = window.open('', '', `height=${windowHeight},width=${windowWidth},left=${leftPosition},top=${topPosition}`);
        printWindow.document.write('<html><head><title>Cart Details</title>');
        printWindow.document.write('<style>body{font-family:sans-serif;} ul{margin-bottom:16px;} div{margin-bottom:4px;}</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.focus();
        printWindow.addEventListener('afterprint', function (args) {
         printWindow.close();
         this.clearCart();
        }.bind(this));
        printWindow.print();
  }

  onBeforeOpen(): void {
    const itemsInCart = this.foodOrderDetails.filter(item => item.count > 0);

    if (itemsInCart.length === 0) {
      (this.dialogButtons[1].buttonModel as any).disabled = true;
      this.cartDialog.refresh();
    } else {
      (this.dialogButtons[1].buttonModel as any).disabled = false;
      this.cartDialog.refresh();
    }

  }

  getCartTableHtml(cartItems: any[]): string {
    if (!cartItems.length) {
      return '<div style="padding:20px;text-align:center;">No items in cart.</div>';
    }
    var rows = cartItems.filter(i => i.count > 0).map(item => `
        <tr>
            <td>${item.foodName}</td>
            <td>$${item.price}</td>
            <td style="text-align:center;">${item.count}</td>
            <td style="text-align:right;">$${item.price * item.count}</td>
        </tr>
    `).join('');
    var total = Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.count), 0));
    var delivery = 3.6;
    var gst = Math.round(total * 0.12 * 100) / 100;
    var toPay = Math.round((total + delivery + gst) * 100) / 100;
    return `
        <div id="dialog-container">
            <div style="max-height:220px;overflow-y:auto;margin-bottom:12px;">
            <table style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #e0e0e0;">
                        <th style="text-align:left;">Dish</th>
                        <th style="text-align:left;">Price</th>
                        <th style="text-align:center;">Qty</th>
                        <th style="text-align:right;">Total</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            </div>
            <div style="border-top:2px solid #eee;padding-top:12px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>Item Total</span><span>$${total}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>Delivery Fee</span><span>$${delivery}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>TAX & Other Charges</span><span>$${gst}</span>
                </div>
                <div style="border-top:2px solid #beb5b5;display:flex;justify-content:space-between;font-weight:bold;font-size:18px;margin-top:10px;">
                    <span>TO PAY</span><span>$${toPay}</span>
                </div>
            </div>
        </div>
    `;
  }
}
