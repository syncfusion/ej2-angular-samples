import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-field-error-display',
    templateUrl: 'field-error-display.html',
    styleUrls: ['field-error-display.backup.css'],
    standalone: true,
    imports: [NgIf]
})
export class FieldErrorDisplayComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}
