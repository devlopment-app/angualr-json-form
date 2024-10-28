import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormField } from '../../form-models/form.types';

@Component({
  selector: 'app-design-canvas',
  templateUrl: './design-canvas.component.html',
  styleUrls: ['./design-canvas.component.scss']
})
export class DesignCanvasComponent implements OnInit {
  formFields: FormField[] = [];
  selectedField: FormField | null = null;

  constructor() {}

  ngOnInit(): void {}

  onDrop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Handle dropping new field from control panel
      const newField = event.item.data;
      this.formFields.splice(event.currentIndex, 0, { ...newField });
    }
  }

  selectField(field: FormField) {
    this.selectedField = field;
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
    if (this.selectedField === this.formFields[index]) {
      this.selectedField = null;
    }
  }

  updateField(updatedField: FormField) {
    const index = this.formFields.findIndex(
      field => field === this.selectedField
    );
    if (index !== -1) {
      this.formFields[index] = { ...updatedField };
      this.selectedField = this.formFields[index];
    }
  }
}