import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';




@Component({
  selector: 'app-form-builder',
  template: `
    <div class="clr-row">
      <!-- Components Panel -->
      <div class="clr-col-3">
        <div class="card">
          <div class="card-header">
            Components
          </div>
          <div class="card-block">
            <div cdkDropList [cdkDropListData]="availableComponents" 
                 [cdkDropListConnectedTo]="['form-fields']"
                 class="components-list">
              <div *ngFor="let component of availableComponents" 
                   class="component-item" 
                   cdkDrag>
                {{ component.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Preview -->
      <div class="clr-col-6">
        <div class="card">
          <div class="card-header">
            Form Preview
            <div class="btn-group btn-sm">
              <button class="btn btn-sm btn-outline" (click)="previewForm()">
                Preview
              </button>
              <button class="btn btn-sm btn-outline" (click)="exportJson()">
                Export JSON
              </button>
            </div>
          </div>
          <div class="card-block">
            <div cdkDropList 
                 #formFields="cdkDropList"
                 [cdkDropListData]="formFields"
                 class="form-fields"
                 (cdkDropListDropped)="drop($event)">
              <div *ngFor="let field of formFields" 
                   class="field-item" 
                   cdkDrag>
                <fr-input
                  [name]="field.name"
                  [label]="field.label"
                  [controlType]="field.type"
                  [required]="field.required"
                  [placeholder]="field.placeholder"
                  [cssHostClass]="field.cssHostClass"
                  [options]="field.options">
                </fr-input>
                <div class="field-actions">
                  <button class="btn btn-sm btn-link" (click)="editField(field)">
                    <clr-icon shape="pencil"></clr-icon>
                  </button>
                  <button class="btn btn-sm btn-link" (click)="removeField(field)">
                    <clr-icon shape="trash"></clr-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties Panel -->
      <div class="clr-col-3">
        <div class="card" *ngIf="selectedField">
          <div class="card-header">
            Properties
          </div>
          <div class="card-block">
            <form #propertyForm="ngForm">
              <div class="clr-form-control">
                <label class="clr-control-label">Label</label>
                <input type="text" 
                       class="clr-input" 
                       [(ngModel)]="selectedField.label" 
                       name="label">
              </div>
              <div class="clr-form-control">
                <label class="clr-control-label">Required</label>
                <div class="clr-toggle-wrapper">
                  <input type="checkbox" 
                         class="clr-toggle" 
                         [(ngModel)]="selectedField.required" 
                         name="required">
                </div>
              </div>
              <!-- Add more property fields as needed -->
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .components-list, .form-fields {
      min-height: 200px;
      border: 1px dashed #ccc;
      padding: 10px;
    }
    
    .component-item, .field-item {
      padding: 10px;
      margin: 5px;
      border: 1px solid #eee;
      background: white;
      cursor: move;
    }
    
    .field-actions {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  `]
})
export class FormBuilderComponent implements OnInit {
  availableComponents: any[] = [
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

  drop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Create new field from component
      const component = this.availableComponents[event.previousIndex];
      const newField: FormField = {
        name: `field_${Date.now()}`,
        label: component.label,
        type: component.type,
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
    // Generate form configuration
    const formConfig = {
      fields: this.formFields,
      submitButtonText: 'Submit',
      layout: 'standard'
    };

    // Open preview modal or navigate to preview route
    console.log('Preview form config:', formConfig);
  }

  exportJson() {
    const formConfig = {
      fields: this.formFields,
      submitButtonText: 'Submit',
      layout: 'standard'
    };
    
    // Download JSON file
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