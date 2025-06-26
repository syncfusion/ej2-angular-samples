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
  templateUrl: 'restaurant-menu.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['restaurant-menu.component.css'],
  imports: [
    TreeGridAllModule,
    AutoCompleteAllModule,
    NumericTextBoxAllModule,
    DialogAllModule,
    CommonModule,
    ChipListAllModule,
  ],
})
export class RestaurantMenuComponent {
  @ViewChild('cartDialog') cartDialog!: DialogComponent;
  @ViewChild('treeGrid') treegrid!: TreeGridComponent;
  @ViewChild('emptyTemplate', { static: true })
  emptyTemplate: any;

  foodMenu: any[] = foodMenu; // assume this is loaded
  dishNames = this.foodMenu.map((i) => i.FoodName);
  foodOrderDetails: any[] = [];
  cartCount = 0;
  cartHtml = '';
  columns = [{ field: 'FoodName', headerText: 'Explore Our Menu', width: 150 }];
  toolbar = [
    {
      template: `
                    <div style="display:flex;align-items:center;cursor:auto;">
                        <img src="./assets/treegrid/images/male.png" alt="avatar" style="width:40px;height:40px;border-radius:50%;margin-right:14px;">
                        <div>
                            <div style="font-size:20px;font-weight:600;line-height:1.2;">Hi, <span style="color:#ff9800;font-weight:700;">Susan</span></div>
                            <div style="font-size:13px;color:#888;line-height:1.2;">Morrisville, USA</div>
                        </div>
                    </div>
                    `,
      align: 'Left',
      id: 'customerDetails'
    },
    { template: '<div class="e-btn-group e-custom-button badge-block"><button id="CartUpdate" class="e-btn">VIEW CART<span id="cartbadge" class="e-cart-badge e-badge e-badge-primary e-badge-notification e-badge-overlap">0</span></button></div>', id: 'cartButton', align: 'Right' }
  ];

  dialogButtons = [
    {
      click: () => this.clearCart(),
      buttonModel: { content: 'Cancel', cssClass: 'e-danger' },
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
    chipElement.id = "ingredientsList";
    return chipElement.outerHTML;
  }
  dataBound() {
    if (this.treegrid.initialRender) {
      this.treegrid.grid.emptyRecordTemplate = this.emptyTemplate;
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
        this.cartCount += (count - (args.previousValue || 0));
    } else if (args.previousValue > args.value) {
        this.cartCount -= (args.previousValue || 0) - count;
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

  onBeforeOpen(args: any): void {
    const itemsInCart = this.foodOrderDetails.filter(item => item.count > 0);
    if (itemsInCart.length < 4) {
      args.maxHeight = '500px';
    }
    else {
      args.maxHeight = '600px';
    }
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
            <td style="text-align:right;">$${(item.price * item.count).toFixed(2)}</td>
        </tr>
    `).join('');
    var total = Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.count), 0));
    var delivery = 3.6;
    var gst = Math.round(total * 0.12 * 100) / 100;
    var toPay = Math.round((total + delivery + gst) * 100) / 100;
    return `
        <div class="sample-order">
            <div  class="resmenu-order-no"><span > Order No: </span>${Math.floor(Math.random() * (99 - 10 + 1)) + 100}</div>
            <div  ><span class="resmenu-order-date">Date: </span>${new Date().toLocaleDateString()}</div>
        </div>
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
            <div class="resmenu-thank-note">
            <div >Thank you for your order!</div>
            </div>
        </div>
    `;
  }
}
