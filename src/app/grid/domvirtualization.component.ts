import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FilterService, GridComponent, GridModule, VirtualScrollService, SortService, PageService, DomVirtualizationService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { NgClass, NgIf } from '@angular/common';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

const SERVICE_URI: string = 'https://services.syncfusion.com/angular/production/';

@Component({
  selector: 'ej-griddomvirtual',
  templateUrl: 'domvirtualization.html',
  styleUrls: ['domvirtualization.style.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterService, SortService, VirtualScrollService, PageService, DomVirtualizationService],
  standalone: true,
  imports: [GridModule, NgIf, RatingModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class DomVirtualizationComponent implements OnInit {
  public data: DataManager;
  public query: Query;
  public filterSettings: Object;
  public pageSettings: Object;
  public domVirtualizationSettings: Object;
  @ViewChild('grid')
  public gridInstance: GridComponent;

  public ngOnInit(): void {
    this.data = new DataManager({
      url: SERVICE_URI + 'api/UrlDataSource',
      adaptor: new UrlAdaptor(),
    });
    this.query = new Query().addParams('dataCount', '100000');
    this.filterSettings = { type: 'CheckBox' };
    this.pageSettings = { pageSize: 100 };
    this.domVirtualizationSettings = { rowBuffer: 10 };
  }
  public softwareValue(args: any): number {
    if (args <= 20) {
      args = args + 30;
    }
    return args;
  }

  public avatarColorClasses: string[] = [
    'avatar-red',
    'avatar-blue',
    'avatar-green',
    'avatar-orange',
    'avatar-purple',
  ];

  public getInitials(name: string): string {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  public getAvatarClass(name: string): string {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return this.avatarColorClasses[sum % this.avatarColorClasses.length];
  }
}
