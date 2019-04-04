import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: 'field-error-display.html',
  styleUrls: ['field-error-display.backup.css']
})
export class FieldErrorDisplayComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

}
