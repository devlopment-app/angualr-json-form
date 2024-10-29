export interface ValidationRule2 {
  type: string;
  value: any;
  message: string;
}




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
  icon?: any;

  min?: any;
  max?: any;
  pattern?:any;
  minLength?: any;
  maxLength?: any;
  

 // categoryType?: any;
  //elementType ?: any;
  
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
  alignment?: string;
  
}


export interface ComponentDefinition  {
  type: string;
  name?: string;
  
  label: string;
  icon: string;
  defaultConfig?: Partial<FormField>;
  category: 'input' | 'selection' | 'layout' | 'advanced';
}


export const AllComponents: ComponentDefinition[] = 
[
  // Input Fields
  { type: 'text', label: 'Text Input', icon: 'text', category: 'input' },
  { type: 'number', label: 'Number Input', icon: 'number-list', category: 'input' },
  { type: 'email', label: 'Email Input', icon: 'envelope', category: 'input' },
  { type: 'password', label: 'Password Input', icon: 'lock', category: 'input' },
  { type: 'tel', label: 'Phone Input', icon: 'phone-handset', category: 'input' },
  { type: 'url', label: 'URL Input', icon: 'link', category: 'input' },
  { type: 'textarea', label: 'Text Area', icon: 'blocks', category: 'input' },
  
  // Selection Fields
  { type: 'select', label: 'Dropdown', icon: 'pop-out', category: 'selection' },
  { type: 'radio', label: 'Radio Group', icon: 'radio-button', category: 'selection' }


]



export const SampleFields: FormField[] = 
[
  // Input Fields
  { type: 'text',  name:'fullName', label: 'Text Input', icon: 'text', placeholder: 'input' },
  { type: 'number', name:'fullName',  label: 'Number Input', icon: 'number-list', placeholder: 'input' },
  { type: 'email', name:'fullName',  label: 'Email Input', icon: 'envelope', placeholder: 'input' },
  { type: 'password', name:'fullName', label: 'Password Input', icon: 'lock', placeholder: 'input' },
  { type: 'tel', name:'fullName',  label: 'Phone Input', icon: 'phone-handset', placeholder: 'input' },
  { type: 'url', name:'fullName', label: 'URL Input', icon: 'link', placeholder: 'input' },
  { type: 'textarea', name:'fullName', label: 'Text Area', icon: 'blocks', placeholder: 'input' },
  
  // Selection Fields
  { type: 'select', name:'fullName', label: 'Dropdown', icon: 'pop-out', placeholder: 'selection' },
  { type: 'radio', name:'fullName', label: 'Radio Group', icon: 'radio-button', placeholder: 'selection' }


]





