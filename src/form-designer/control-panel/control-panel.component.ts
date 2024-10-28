import { Component, Output, EventEmitter } from '@angular/core';
import { FormField, Fields } from '../../form-models/form.types';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  
  @Output() controlDropped = new EventEmitter<FormField>();

  availableControls: Fields = [
    { type: 'text', name: 'text-input', label: 'Text Input' },
    { type: 'number', name: 'number-input', label: 'Number Input' },
    { type: 'select', name: 'select', label: 'Select', options: [] },
    { type: 'checkbox', name: 'checkbox', label: 'Checkbox' },
    { type: 'textarea', name: 'textarea', label: 'Text Area' },
    { type: 'date', name: 'date', label: 'Date Input' }
  ];
}
