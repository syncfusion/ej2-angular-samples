import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Data binding Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'data-binding.html',
    styleUrls: ['data-binding.css'],
    encapsulation: ViewEncapsulation.None
})

export class DataBindingMenuController {
    // Menu items definition 
    public menuDatasource: { [key: string]: Object }[] = [
        { id: 'parent1', text: 'Appliances', parentId: null },
        { id: 'parent2', text: 'Accessories', parentId: null },
        { id: 'parent3', text: 'Fashion', parentId: null },
        { id: 'parent4', text: 'Home & Living', parentId: null },
        { id: 'parent5', text: 'Entertainment', parentId: null },

        { id: 'parent6', text: 'Kitchen', parentId: 'parent1' },
        { id: 'parent7', text: 'Washing Machine', parentId: 'parent1' },
        { id: 'parent8', text: 'Air Conditioners', parentId: 'parent1' },

        { id: 'parent9', text: 'Electric Cookers', parentId: 'parent6' },
        { id: 'parent10', text: 'Coffee Makers', parentId: 'parent6' },
        { id: 'parent11', text: 'Blenders', parentId: 'parent6' },

        { id: 'parent12', text: 'Fully Automatic', parentId: 'parent7' },
        { id: 'parent13', text: 'Semi Automatic', parentId: 'parent7' },

        { id: 'parent14', text: 'Inverter ACs', parentId: 'parent8' },
        { id: 'parent15', text: 'Split ACs', parentId: 'parent8' },
        { id: 'parent16', text: 'Window ACs', parentId: 'parent8' },

        { id: 'parent17', text: 'Mobile', parentId: 'parent2' },
        { id: 'parent18', text: 'Computer', parentId: 'parent2' },

        { id: 'parent19', text: 'Headphones', parentId: 'parent17' },
        { id: 'parent20', text: 'Memory Cards', parentId: 'parent17' },
        { id: 'parent21', text: 'Power Banks', parentId: 'parent17' },

        { id: 'parent22', text: 'Pendrives', parentId: 'parent18' },
        { id: 'parent23', text: 'External Hard Disks', parentId: 'parent18' },
        { id: 'parent24', text: 'Monitors', parentId: 'parent18' },

        { id: 'parent25', text: 'Men', parentId: 'parent3' },
        { id: 'parent26', text: 'Women', parentId: 'parent3' },

        { id: 'parent27', text: 'Shirts', parentId: 'parent25' },
        { id: 'parent28', text: 'Jackets', parentId: 'parent25' },
        { id: 'parent29', text: 'Track Suits', parentId: 'parent25' },

        { id: 'parent30', text: 'Kurtas', parentId: 'parent26' },
        { id: 'parent31', text: 'Salwars', parentId: 'parent26' },
        { id: 'parent32', text: 'Sarees', parentId: 'parent26' },

        { id: 'parent33', text: 'Furniture', parentId: 'parent4' },
        { id: 'parent34', text: 'Decor', parentId: 'parent4' },

        { id: 'parent35', text: 'Beds', parentId: 'parent33' },
        { id: 'parent36', text: 'Mattresses', parentId: 'parent33' },
        { id: 'parent37', text: 'Dining Tables', parentId: 'parent33' },

        { id: 'parent38', text: 'Clocks', parentId: 'parent34' },
        { id: 'parent39', text: 'Wall Decals', parentId: 'parent34' },
        { id: 'parent40', text: 'Paintings', parentId: 'parent34' },

        { id: 'parent41', text: 'Televisions', parentId: 'parent5' },
        { id: 'parent42', text: 'Home Theatres', parentId: 'parent5' },
        { id: 'parent43', text: 'Gaming Laptops', parentId: 'parent5' }
    ];
}