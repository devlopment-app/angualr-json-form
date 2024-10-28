
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormField } from '../../form-models/form.types';

@Component({
  selector: 'app-json-preview',
  templateUrl: './json-preview.component.html',
  styleUrls: ['./json-preview.component.scss']
})
export class JsonPreviewComponent {
  @Input() formFields: FormField[] = [];
  @Input() formFields2: any = '';
  @Input() formFields3: any = '';
  
  
  @Output() jsonUpdated = new EventEmitter<FormField[]>();
//  @Output() jsonUpdated2 = new EventEmitter<string>();
  
  @Output() downloadRequested = new EventEmitter<void>();

  getFormJson(): string {
    return JSON.stringify(this.formFields, null, 2);
  }

  onJsonChange($event: any) {
    console.log($event);
    var v= $event;
    console.log(v);
    if (v){
     // v = v.;
    }
    if (v){
      try {
        const fields = JSON.parse(v);
        this.jsonUpdated.emit(fields);
      } catch (e) {
        console.error('Invalid JSON');
      }
  }
  }
}
