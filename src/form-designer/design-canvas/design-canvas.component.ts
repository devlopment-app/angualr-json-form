import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormField,Fields } from '../../form-models/form.types';

@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.scss']
})
export class DesignCanvasComponent implements OnInit {
  @Input() formFields: Fields = [];
  @Input() formData: any = [];
  @Input() formSettings: any = [];
  
  @Output() formFieldsChange = new EventEmitter<FormField[]>();
  @Output() fieldSelected = new EventEmitter<FormField|null >();

  @Output() formFieldsChange2 = new EventEmitter<any|any>();
  @Output() fieldSelected2 = new EventEmitter<any|any>();

  selectedField: FormField | null = null;

  constructor() {}

  ngOnInit(): void {}

  onDrop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within the canvas
      moveItemInArray(
        this.formFields,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Dropping from control panel
      const newField: FormField = {
        ...event.item.data,
        name: this.generateUniqueName(event.item.data.type),
      };
      
      this.formFields.splice(event.currentIndex, 0, newField);
    }
    
    this.formFieldsChange.emit(this.formFields);
  }

  selectField(field: FormField) {
    this.selectedField = field;
    this.fieldSelected.emit(field);
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
    if (this.selectedField === this.formFields[index]) {
      this.selectedField = null;

      this.fieldSelected.emit(null);
    }
    this.formFieldsChange.emit(this.formFields);
  }

  updateField(updatedField: FormField) {
    /*
    const index = this.formFields.findIndex(
      this.selectField
    );

    if (index !== -1) {
      this.formFields[index] = { ...updatedField };
      this.selectedField = this.formFields[index];
      this.formFieldsChange.emit(this.formFields);
     // this.fieldSelected.emit(this.selectedField);
    }
     */
  }

  private generateUniqueName(type: string): string {
    /*
    const baseNames = this.formFields.map(f => f.name);
    let counter = 1;
    let name = `${type}-${counter}`;
    
    while (baseNames.includes(name)) {
      counter++;
      name = `${type}-${counter}`;
    }
    
    return name;
    */
   return 'ddd';
  }
}