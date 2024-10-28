// form-designer.component.ts
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Fields, FormField , FormFieldOption } from '../../form-models/form.types';

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss']
})
export class FormDesignerComponent implements OnInit {

  field: FormField = { name:'ddd' , type:'text'} ;

  formFields: Fields = [this.field];
  
  selectedField?: FormField ;
  formData: any = {};
  formSettings: any = {};

  ngOnInit() {
    // Initialize any required data
  }


  onFieldDrop2(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      const newItem = { ...item, name: this.generateUniqueName(item.type) };
      
      // Replace the item in the target container with our new item
      event.container.data.splice(event.currentIndex, 0, newItem);
      
      // If dragging from available controls, keep the original in the source
      if (event.previousContainer.id === 'available-controls') {
        event.previousContainer.data.splice(event.previousIndex, 0, { ...item });
      } else {
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }

  onFieldDrop(event: CdkDragDrop<Fields>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      const newItem = { ...item, name: this.generateUniqueName(item.type) };
      
      // Replace the item in the target container with our new item
      event.container.data.splice(event.currentIndex, 0, newItem);
      
      // If dragging from available controls, keep the original in the source
      if (event.previousContainer.id === 'available-controls') {
        event.previousContainer.data.splice(event.previousIndex, 0, { ...item });
      } else {
        event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }

  generateUniqueName(type: string | any): string {
    if (!type) return 'dd';
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

  onFieldSelected2(field: any) 
  {
    this.selectedField = field;
  }

  onFieldUpdated2(event: any) {
    const { field, property, value } = event;
    if (field && property) {
      field[property] = value;
    }
  }


  onFieldUpdated(event: {field: FormField, property: string, value: any}) {
    const { field, property, value } = event;
    if (field && property) {
   //   field[property] = value;
    }
  }

  onOptionAdded() {
    if (this.selectedField?.type === 'select') {
      if (!this.selectedField.eoptions) {
        this.selectedField.eoptions = [];
      }
      //this.selectedField.eoptions.push({ value: '', label: '' });
    }
  }

  onOptionRemoved(index: number) {
    if (this.selectedField?.eoptions) {
      this.selectedField.eoptions.splice(index, 1);
    }
  }

  onOptionRemoved2(index: any) {
    if (this.selectedField?.eoptions) {
      this.selectedField.eoptions.splice(index, 1);
    }
  }

  
  onOptionUpdated2(event: any) {
    const { index, property, value } = event;
    if (this.selectedField?.eoptions && 
        index >= 0 && 
        index < this.selectedField.eoptions.length) {
      this.selectedField.eoptions[index] = {
        ...this.selectedField.eoptions[index],
        [property]: value
      };
    }
  }


  onOptionUpdated(event: {index: number, property: string, value: string}) {
    const { index, property, value } = event;
    if (this.selectedField?.eoptions && 
        index >= 0 && 
        index < this.selectedField.eoptions.length) {
      this.selectedField.eoptions[index] = {
        ...this.selectedField.eoptions[index],
        [property]: value
      };
    }
  }

  onJsonUpdated(fields: FormField[]) {
    this.formFields = [...fields]; // Create new reference to trigger change detection
  }

  onJsonUpdated2(data:any) {
    console.log("data", data);
    //this.formFields = [...fields]; // Create new reference to trigger change detection
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