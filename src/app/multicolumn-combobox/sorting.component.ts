/**
 * MultiColumn Combobox Sorting Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'sorting.html',
    styleUrls: ['sorting.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class SortingMultiComboBoxComponent {
    @ViewChild('sorting')
    public multicomboBoxObj: MultiColumnComboBoxComponent;
    // define the JSON of data
    public orderData: Object[] = [
        { OrderID: 1001, CustomerID: "CID01", Role: "Admin", EmployeeID: 5, OrderDate: "1995-07-04T00:00:00.000Z", ShipName: "Vins et alcools Chevalier", ShipCity: "Reims", ShipAddress: "59 rue de l Abbaye", ShipRegion: "CJ", Mask: "1111", ShipPostalCode: "51100", ShipCountry: "France", Freight: 32.38, Verified: true },
        { OrderID: 1002, CustomerID: "CID02", Role: "Employee", EmployeeID: 6, OrderDate: "1995-07-05T00:00:00.000Z", ShipName: "Toms Spezialitäten", ShipCity: "Münster", ShipAddress: "Luisenstr. 48", ShipRegion: "CJ", Mask: "2222", ShipPostalCode: "44087", ShipCountry: "Germany", Freight: 11.61, Verified: false },
        { OrderID: 1003, CustomerID: "CID03", Role: "Admin", EmployeeID: 4, OrderDate: "1995-07-08T00:00:00.000Z", ShipName: "Hanari Carnes", ShipCity: "Rio de Janeiro", ShipAddress: "Rua do Paço, 67", ShipRegion: "RJ", Mask: "3333", ShipPostalCode: "05454-876", ShipCountry: "Brazil", Freight: 65.83, Verified: true },
        { OrderID: 1004, CustomerID: "CID04", Role: "Manager", EmployeeID: 3, OrderDate: "1995-07-08T00:00:00.000Z", ShipName: "Victuailles en stock", ShipCity: "Lyon", ShipAddress: "2, rue du Commerce", ShipRegion: "CJ", Mask: "4444", ShipPostalCode: "69004", ShipCountry: "Argentina", Freight: 41.34, Verified: true },
        { OrderID: 1005, CustomerID: "CID05", Role: "Manager", EmployeeID: 2, OrderDate: "1995-07-09T00:00:00.000Z", ShipName: "Suprêmes délices", ShipCity: "Charleroi", ShipAddress: "Boulevard Tirou, 255", ShipRegion: "CJ", Mask: "5555", ShipPostalCode: "B-6000", ShipCountry: "Belgium", Freight: 51.3, Verified: true },
        { OrderID: 1006, CustomerID: "CID06", Role: "Admin", EmployeeID: 7, OrderDate: "1995-07-10T00:00:00.000Z", ShipName: "Hanari Carnes", ShipCity: "Rio de Janeiro", ShipAddress: "Rua do Paço, 67", ShipRegion: "RJ", Mask: "6666", ShipPostalCode: "05454-876", ShipCountry: "Armenia", Freight: 58.17, Verified: true },
        { OrderID: 1007, CustomerID: "CID07", Role: "Employee", EmployeeID: 5, OrderDate: "1995-07-11T00:00:00.000Z", ShipName: "Chop-suey Chinese", ShipCity: "Bern", ShipAddress: "Hauptstr. 31", ShipRegion: "CJ", Mask: "7777", ShipPostalCode: "3012", ShipCountry: "Switzerland", Freight: 22.98, Verified: false },
        { OrderID: 1008, CustomerID: "CID08", Role: "Admin", EmployeeID: 9, OrderDate: "1995-07-12T00:00:00.000Z", ShipName: "Richter Supermarkt", ShipCity: "Genève", ShipAddress: "Starenweg 5", ShipRegion: "CJ", Mask: "8888", ShipPostalCode: "1204", ShipCountry: "Antartica", Freight: 148.33, Verified: true },
        { OrderID: 1009, CustomerID: "CID09", Role: "Employee", EmployeeID: 3, OrderDate: "1995-07-15T00:00:00.000Z", ShipName: "Wellington Importadora", ShipCity: "Resende", ShipAddress: "Rua do Mercado, 12", ShipRegion: "SP", Mask: "9999", ShipPostalCode: "08737-363", ShipCountry: "Albania", Freight: 13.97, Verified: false },
        { OrderID: 1010, CustomerID: "CID10", Role: "Admin", EmployeeID: 4, OrderDate: "1995-07-16T00:00:00.000Z", ShipName: "HILARION-Abastos", ShipCity: "San Cristóbal", ShipAddress: "Carrera 22 con Ave. Carlos Soublette #8-35", ShipRegion: "Táchira", Mask: "1234", ShipPostalCode: "5022", ShipCountry: "Venezuela", Freight: 81.91, Verified: true },
        { OrderID: 1011, CustomerID: "CID11", Role: "Manager", EmployeeID: 1, OrderDate: "1995-07-17T00:00:00.000Z", ShipName: "Ernst Handel", ShipCity: "Graz", ShipAddress: "Kirchgasse 6", ShipRegion: "CJ", Mask: "2345", ShipPostalCode: "8010", ShipCountry: "Austria", Freight: 140.51, Verified: true },
        { OrderID: 1012, CustomerID: "CID12", Role: "Admin", EmployeeID: 4, OrderDate: "1995-07-18T00:00:00.000Z", ShipName: "Centro comercial Moctezuma", ShipCity: "México D.F.", ShipAddress: "Sierras de Granada 9993", ShipRegion: "CJ", Mask: "3456", ShipPostalCode: "05022", ShipCountry: "Mexico", Freight: 3.25, Verified: false },
        { OrderID: 1013, CustomerID: "CID13", Role: "Admin", EmployeeID: 4, OrderDate: "1995-07-19T00:00:00.000Z", ShipName: "Ottilies Käseladen", ShipCity: "Köln", ShipAddress: "Mehrheimerstr. 369", ShipRegion: "CJ", Mask: "4567", ShipPostalCode: "50739", ShipCountry: "Belgium", Freight: 55.09, Verified: true },
        { OrderID: 1014, CustomerID: "CID14", Role: "Manager", EmployeeID: 4, OrderDate: "1995-07-19T00:00:00.000Z", ShipName: "Que Delícia", ShipCity: "Rio de Janeiro", ShipAddress: "Rua da Panificadora, 12", ShipRegion: "RJ", Mask: "5678", ShipPostalCode: "02389-673", ShipCountry: "Cuba", Freight: 3.05, Verified: false },
        { OrderID: 1015, CustomerID: "CID15", Role: "Employee", EmployeeID: 8, OrderDate: "1995-07-22T00:00:00.000Z", ShipName: "Rattlesnake Canyon Grocery", ShipCity: "Albuquerque", ShipAddress: "2817 Milton Dr.", ShipRegion: "NM", Mask: "6789", ShipPostalCode: "87110", ShipCountry: "USA", Freight: 48.29, Verified: true },
        { OrderID: 1016, CustomerID: "CID16", Role: "Employee", EmployeeID: 6, OrderDate: "1995-07-24T00:00:00.000Z", ShipName: "Blondel père et fils", ShipCity: "Strasbourg", ShipAddress: "24, place Kléber", ShipRegion: "CJ", Mask: "8901", ShipPostalCode: "67000", ShipCountry: "Algeria", Freight: 81.74, Verified: false },
        { OrderID: 1017, CustomerID: "CID17", Role: "Manager", EmployeeID: 3, OrderDate: "1995-07-25T00:00:00.000Z", ShipName: "Wartian Herkku", ShipCity: "Oulu", ShipAddress: "Torikatu 38", ShipRegion: "CJ", Mask: "9012", ShipPostalCode: "90110", ShipCountry: "Finland", Freight: 44.12, Verified: true },
        { OrderID: 1018, CustomerID: "CID18", Role: "Employee", EmployeeID: 1, OrderDate: "1995-07-26T00:00:00.000Z", ShipName: "Simons bistro", ShipCity: "København", ShipAddress: "Vinbæltet 34", ShipRegion: "CJ", Mask: "0123", ShipPostalCode: "1734", ShipCountry: "Denmark", Freight: 22.77, Verified: false },
        { OrderID: 1019, CustomerID: "CID19", Role: "Admin", EmployeeID: 7, OrderDate: "1995-07-27T00:00:00.000Z", ShipName: "LILA-Supermercado", ShipCity: "Barquisimeto", ShipAddress: "Carrera 52 con Ave. Bolívar #65-98 Llano Largo", ShipRegion: "Lara", Mask: "1234", ShipPostalCode: "3508", ShipCountry: "China", Freight: 53.23, Verified: true },
        { OrderID: 1020, CustomerID: "CID20", Role: "Manager", EmployeeID: 2, OrderDate: "1995-07-28T00:00:00.000Z", ShipName: "Galería del gastronómo", ShipCity: "Madrid", ShipAddress: "Rambla de Cataluña, 23", ShipRegion: "CJ", Mask: "2345", ShipPostalCode: "28014", ShipCountry: "Spain", Freight: 89.64, Verified: false }
    ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'OrderID', value: 'CustomerID' };
    // set the placeholder to MultiColumn ComboBox input element
    public waterMark: string = 'Select an order ID';
    //set sort order to ascending
    public sortOrder: string = 'Ascending';
    //set sort type to multi column
    public sortType: string ='MultiColumn';
}
