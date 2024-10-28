
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../../form-models/form.types';

@Component({
  selector: 'app-json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JsonPreviewComponent {
  @Input() formFields: FormField[] = [];
  @Output() jsonUpdated = new EventEmitter<FormField[]>();
  @Output() downloadRequested = new EventEmitter<void>();

  getFormJson(): string {
    return JSON.stringify(this.formFields, null, 2);
  }

  onJsonChange(jsonString: string) {
    try {
      const fields = JSON.parse(jsonString);
      this.jsonUpdated.emit(fields);
    } catch (e) {
      console.error('Invalid JSON');
    }
  }
}
