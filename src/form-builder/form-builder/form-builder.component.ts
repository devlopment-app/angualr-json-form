import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormField, DynamicFormConfig } from '../../form-models/form.types';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  availableComponents: Partial<FormField>[] = [
    { type: 'text', label: 'Text Input' },
    { type: 'select', label: 'Dropdown' },
    { type: 'number', label: 'Number Input' },
    { type: 'textarea', label: 'Text Area' },
    { type: 'checkbox', label: 'Checkbox' }
  ];

  formFields: FormField[] = [];
  selectedField: FormField | null = null;

  constructor() {}

  ngOnInit() {}

  drop(event: CdkDragDrop< FormField[] ,any,any >  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const component = this.availableComponents[event.previousIndex];
      const newField: FormField = {
        name: `field_${Date.now()}`,
        label: component.label || '',
        type: component.type || 'text',
        required: false,
        cssHostClass: 'clr-col-12',
        alignment: 'floating'
      };
      
      this.formFields.splice(event.currentIndex, 0, newField);
    }
  }


  editField(field: FormField) {
    this.selectedField = field;
  }

  removeField(field: FormField) {
    const index = this.formFields.indexOf(field);
    if (index > -1) {
      this.formFields.splice(index, 1);
    }
  }

  previewForm() {
    const formConfig: DynamicFormConfig = {
      fields: this.formFields,
      submitButtonText: 'Submit',
      layout: 'standard'
    };
    console.log('Preview form config:', formConfig);
  }

  exportJson() {
    const formConfig: DynamicFormConfig = {
      fields: this.formFields,
      submitButtonText: 'Submit',
      layout: 'standard'
    };
    
    const blob = new Blob([JSON.stringify(formConfig, null, 2)], 
      { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-config.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}