export type InputType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'password'
  | 'date' 
  | 'datetime-local'
  | 'tel'
  | 'select'
  | 'multiselect'
  | 'toggle'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'autocomplete'
  | 'state'
  | 'color'
  | 'file'
  | 'range';

export type TextCaseType = 'UpperCase' | 'LowerCase' | 'ProperCase';
export type LayoutType = 'compact' | 'desktop' | 'mobile' | 'narrow' | 'threeCol';

export interface ValidationRule {
  type: 'required' | 'minlength' | 'maxlength' | 'pattern' | 'email' | 'min' | 'max' | 'minDate' | 'maxDate' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any) => boolean;
}

export interface InputOption {
  key: string | number;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export interface StateOption extends InputOption {
  flag?: string;
  abbreviation: string;
}


 

export interface FormFieldOption {
  value: string;
  label: string;
}
//import { InputType, ValidationRule, InputOption } from './fr-input.types';

export interface FormField {
  type?: string | InputType;
  name: string;
  label?: string;
  // type: InputType;
  value?: any;
  //validations?: ValidationRule[];
  options?: InputOption[] ;
  eoptions?: any[] ;
  
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  hide?: boolean;
  hiddden?: boolean;
  required?: boolean;
  
  
  hint?: string;
  tooltip?: string;
  
  
  alignment?: string | 'floating' | 'right-align' | 'default' | '' | null ;

  cssClass?: string;
  
  layoutSetting?: 'compact' | 'desktop' | 'mobile' | 'narrow' | 'threeCol';


  
  cssHostClass?: string | 'clr-col-12' ; // pass - clr-col-sm-6 (pass cols for response layout) 
  cssHostClass2?: string  | 'clr-col-12' ; // pass - clr-col-sm-6 (pass cols for response layout)
  cssHostClass3?: string | 'clr-col-12'  ; // pass - clr-col-sm-6 (pass cols for response layout)
  

}


export interface Fields 
extends Array<FormField> {
  // You can add additional methods or properties specific to the array here, if needed
}

export interface DynamicFormConfig {
  fields: FormField[];
  submitButtonText?: string;
  initialValues?: { [key: string]: any };
  layout?: 'standard' | 'inline' | 'horizontal';
  cssClass?: string;
}