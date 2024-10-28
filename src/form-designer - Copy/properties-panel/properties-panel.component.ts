import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormField } from '../../form-models/form.types';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.scss']
})
export class PropertiesPanelComponent implements OnChanges {
  @Input() field: FormField | null = null;
  @Output() fieldUpdate = new EventEmitter<FormField>();

  editingField: FormField = {
    type: 'text',
    name: '',
    label: '',
    placeholder: '',
    hint: '',
    tooltip: '',
    options: [],
    cssClass: '',
    required: false
  };

  ngOnChanges(): void {
    if (this.field) {
      this.editingField = { ...this.field };
      if (!this.editingField.eoptions) {
        this.editingField.eoptions = [];
      }
    }
  }

  addOption(): void {
    if (!this.editingField.eoptions) {
      this.editingField.eoptions = [];
    }
    this.editingField.eoptions.push({ value: '', label: '' });
  }

  removeOption(index: number): void {
    if (this.editingField.eoptions) {
      this.editingField.eoptions.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.fieldUpdate.emit(this.editingField);
  }
}