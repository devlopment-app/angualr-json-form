import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

import { FormField, DynamicFormConfig } from '../../form-models/form.types'

import { ValidationRule } from '../../form-models/form.types'

@Component({
  selector: 'fr-dynamic-form',
  templateUrl: './fr-dynamic-form.component.html',
  styleUrls: ['./fr-dynamic-form.component.scss']
})
export class FrDynamicFormComponent implements OnInit {
  @Input() config!: DynamicFormConfig;
  @Input() submitting = false;
  
  @Input() data?: any ;
  @Input() vm?: any ;
  @Input() value?: any ;
  @Input() settings?: any ;
  
  getValue(name:string) {
  
	if (this.vm){
		return this.vm[name];
	}
    return '';
  }
  
  getFields():any {

    //return this.fields.filter(x=> !x.hide);
    return this.fields;
  }
  
  
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formChange = new EventEmitter<any>();
  @Output() formValid = new EventEmitter<boolean>();

  form?: FormGroup ;;
  fields: FormField[] = [];
  fieldsVisible: FormField[] = [];
  

  constructor() {
    //this.form = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.config) {
      this.fields = this.config.fields;
      //this.fieldsVisible = this.config.fields.filter(x=> !x.hide)
      this.fieldsVisible = this.config.fields; 
      this.createForm();
    }
  }

  private createForm(): void {
    const group: { [key: string]: any } = {};

    this.fields.forEach(field => {
      //const validators = this.createValidators(field.validations || []);
      const initialValue = this.getInitialValue(field);
      group[field.name] = [{ 
        value: initialValue, 
        disabled: field.disabled 
      }];
    });

    // this.form = this.fb.group(group);
    
    // this.form.valueChanges.subscribe(values => {
    //   this.formChange.emit(values);
    //   this.formValid.emit(this.form.valid);
    // });

  }

  private createValidators(validations: ValidationRule[]): ValidatorFn[] {
    return validations.map(validation => {
      switch (validation.type) {
        case 'required':
          return Validators.required;
        case 'minlength':
          return Validators.minLength(validation.value);
        case 'maxlength':
          return Validators.maxLength(validation.value);
        case 'pattern':
          return Validators.pattern(validation.value);
        case 'email':
          return Validators.email;
        case 'min':
          return Validators.min(validation.value);
        case 'max':
          return Validators.max(validation.value);
        case 'custom':
          return (control: any) => {
            return validation.validator?.(control.value) 
              ? null 
              : { [validation.type]: true };
          };
        default:
          return Validators.nullValidator;
      }
    });
  }

  private getInitialValue(field: FormField): any {
    return this.config.initialValues?.[field.name] 
      ?? field.value 
      ?? (field.type === 'checkbox' ? false : '');
  }

  onFieldChange(fieldName: string, value: any): void {
    console.log(" before Form" , this.form) 
//    this.form.patchValue({ [fieldName]: value }, { emitEvent: true });
    console.log(" after Form" , this.form)
  }

  onSubmit(): void {
  //  if (this.form.valid && !this.submitting) {
    //  this.formSubmit.emit(this.form.value);
    //}
  }

  reset(): void {
    //this.form.reset(this.config.initialValues);
  }

  markAllAsTouched(): void {
 
  }
}