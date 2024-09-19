/**
 * MultiColumn Combobox RTL Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['rtl.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class RTLMultiComboBoxComponent {
    // define the JSON of data
    public bookDetails: Object[] = [
        { Title: "The Great Adventure", Author: "Emily Thompson", Genre: "Fiction", PublishedYear:2023, Price: "$12.99"},
        { Title: "The Clockwork Mirage", Author: "John Doe", Genre: "Non-Fiction", PublishedYear:2019, Price: "$19.99"},
        { Title: "Science Explained", Author: "Jane Smith", Genre: "Science", PublishedYear:2021, Price: "$15.50"},
        { Title: "Advanced Mathematics", Author: "Alan Turing", Genre: "Education", PublishedYear:2020, Price: "$22.00"},
        { Title: "The Art of War", Author: "Sun Tzu", Genre: "History", PublishedYear:2019, Price: "$10.00"},
        { Title: "Programming in Python", Author: "Guido Van Rossum", Genre: "Tech", PublishedYear:2024, Price: "$29.95"},
        { Title: "Introduction to Physio", Author: "William James", Genre: "Psychology", PublishedYear:2019, Price: "$17.50"},
        { Title: "Modern Fiction", Author: "Matgeret Atwood", Genre: "Fiction", PublishedYear:2017, Price: "$14.75"},
        { Title: "The Greatest Gatsby", Author: "Scott Fitzgerald", Genre: "Fiction", PublishedYear:2015, Price: "$11.99"},
        { Title: "Quantum Physics", Author: "Stephen Hawking", Genre: "Science", PublishedYear:2018, Price: "$32.00"},
        { Title: "World History", Author: "Roberts", Genre: "History", PublishedYear:2021, Price: "$20.00"},
        { Title: "The Catcher in the Rye", Author: "Salinger", Genre: "Fiction", PublishedYear:2016, Price: "$13.00"},
        { Title: "A Brief History of Time", Author: "Stephen Hawking", Genre: "Science", PublishedYear:2012, Price: "$18.95"},
        { Title: "The Hobbit", Author: "Tolkien", Genre: "Fantasy", PublishedYear:2018, Price: "$15.00"},
        { Title: "Animal Farm", Author: "George Orwell", Genre: "Fiction", PublishedYear:2017, Price: "$12.50"}
        ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Title', value: 'Author' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a title';
}
