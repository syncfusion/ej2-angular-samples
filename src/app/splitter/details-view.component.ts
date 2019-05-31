import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ListView } from '@syncfusion/ej2-lists';
import { SplitterComponent} from '@syncfusion/ej2-angular-layouts';
import { ListViewComponent} from '@syncfusion/ej2-angular-lists';



@Component({
    selector: 'control-content',
    templateUrl: 'details-view.html',
    encapsulation: ViewEncapsulation.None
})
export class DetailsViewComponent {
    public dataSource: { [key: string]: Object; }[];
    @ViewChild('letterAvatarList') listObj: ListViewComponent;
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;
    constructor() {
        this.dataSource = [
            { id: '1', text: 'Margaret', avatar: 'R', pic: 'pic01',  color: '' },
            { id: '2', text: 'Laura', avatar: 'N', pic: 'pic02', color: 'green' },
            { id: '3', text: 'Robert', icon: 'R', pic: 'pic03', },
            { id: '4', text: 'Albert', avatar: 'A', pic: 'pic04',  color: 'blue' },
            { id: '5', text: 'Michale', icon: 'M', pic: 'pic05', }
        ];
    }

    onActionComplete(): void {
        this.listObj.selectItem(this.dataSource[0]);
    }

    onSelect(e: any): void {
        let listid: string = e.item.dataset.uid;
        // tslint:disable:max-line-length
        switch (listid) {
            case '1':
                this.splitterObj.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./assets/splitter/images/margaret.png" alt="margaret"></div></div><div class="profile-name">Margeret Peacock</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>11/15/1994</td></tr><tr><td class="e-bold">Address</td><td>507 - 20th Ave. E. Apt. 2A</td></tr><tr><td class="e-bold">City</td><td>Seattle</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-9857</td></tr></table>';
                break;
            case '2':
                this.splitterObj.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./assets/splitter/images/laura.png" alt="laura"></div><div class="profile-name">Laura Callahan</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>09/25/1993</td></tr><tr><td class="e-bold">Address</td><td>908 W. Capital Way</td></tr><tr><td class="e-bold">City</td><td>Tacoma</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-9482</td></tr></table>';
                break;
            case '3':
                this.splitterObj.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./assets/splitter/images/robert.png" alt="robert"></div><div class="profile-name">Robert King</div><table><tr><td class="e-bold">Title</td><td>Sales Manager</td></tr><tr><td class="e-bold">Hire Date</td><td>03/20/1990</td></tr><tr><td class="e-bold">Address</td><td>14 Garrett Hill</td></tr><tr><td class="e-bold">City</td><td>London</td></tr><tr><td class="e-bold">Phone</td><td>(71) 555-4848</td></tr></table>';
                break;
            case '4':
                this.splitterObj.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./assets/splitter/images/albert.png" alt="Albert"></div><div class="profile-name">Albert Dodsworth</div><table><tr><td class="e-bold">Title</td><td>Inside Sales Coordinator</td></tr><tr><td class="e-bold">Hire Date</td><td>06/10/1998</td></tr><tr><td class="e-bold">Address</td><td>4726 - 11th Ave. N.E.</td></tr><tr><td class="e-bold">City</td><td>Seattle</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-1189</td></tr></table>';
                break;
            case '5':
                this.splitterObj.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./assets/splitter/images/michale.png" alt="Michale"></div><div class="profile-name">Michale Suyama</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>10/5/1996</td></tr><tr><td class="e-bold">Address</td><td>7 Houndstooth Rd.</td></tr><tr><td class="e-bold">City</td><td>London</td></tr><tr><td class="e-bold">Phone</td><td>(71) 555-4444</td></tr></table>';
                break;
        }
    }
}