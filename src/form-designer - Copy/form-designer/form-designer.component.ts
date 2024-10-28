import { Component } from '@angular/core';
import { FormField } from '../../form-models/form.types' ;
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss']
})
export class FormDesignerComponent {
  formFields: FormField[] = [];
  selectedField: FormField | null = null;
  formData: any = {};
  formSettings: any = {};

  onFieldDrop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      const newItem = { ...item, name: this.generateUniqueName(item.type) };
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      if (event.previousContainer.id === 'available-controls') {
        event.previousContainer.data.splice(event.previousIndex, 0, { ...item });
      }
    }
  }

  generateUniqueName(type: any|null): string {
    const baseNames = this.formFields.map(f => f.name);
    let counter = 1;
    let name = `${type}-${counter}`;
    
    while (baseNames.includes(name)) {
      counter++;
      name = `${type}-${counter}`;
    }
    
    return name;
  }

  onFieldSelected(field: FormField) {
    this.selectedField = field;
  }

  onFieldUpdated(event: {field: any, property: string, value: any}) {
    const { field, property, value } = event;
    field[property] = value;
  }

  onOptionAdded() {
    if (this.selectedField?.type === 'select') {
      if (!this.selectedField.eoptions) {
        this.selectedField.eoptions = [];
      }
      this.selectedField.eoptions.push({ value: '', label: '' });
    }
  }

  onOptionRemoved(index: number) {
    if (this.selectedField?.eoptions) {
      this.selectedField.eoptions.splice(index, 1);
    }
  }

  onOptionUpdated(event: {index: number, property: string, value: string}) {
    const { index, property, value } = event;
    if (this.selectedField?.eoptions) {
      //this.selectedField.options[index][property] = value;
    }
  }

  onJsonUpdated(fields: FormField[]) {
    this.formFields = fields;
  }

  downloadJson() {
    const json = JSON.stringify(this.formFields, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-definition.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}