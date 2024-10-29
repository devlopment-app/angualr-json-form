import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputType, TextCaseType, LayoutType, ValidationRule, InputOption, StateOption }
 from '../../form-models/form.types';

//import  {  Optional, Host, SkipSelf } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'fr-input',
  templateUrl: './fr-input.component.html',
  styleUrls: ['./fr-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class FrInputComponent implements OnInit {


  @Input() vm?: any ;
  @Input() value?: any ;

  
  @Input() settings?: any ;

  
 // @Input() modelValue?: any ;

  @Input() showLabel: boolean = true;
  @Input() layoutSetting: string = '-';
  @Input() alignment: string = 'floating';

  @Input() containerClass: string = '---';
  

  @Input() noOfcols: string = '6';
  
  getAlignmentClass():string {
    if (this.alignment){
      return this.alignment;
    }
    return 'floating';

  }
  
  hasValueClass():string{

    if (this.getValue()){
      return 'hasvalue';
    }
    return '';

  }
  
  loaded:boolean=false;

  @ViewChild('ctrl') ctrl!: NgModel;

  
  @Input() controlType?: InputType | string = 'text';
  @Input() name!: string;
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() hint?: string;
  @Input() tooltip?: string;
  
  @Input() validations?: ValidationRule[] = [];
  @Input() cssClass?: string;
  @Input() styles?: { [key: string]: string };
  @Input() labelClass?: string;
  @Input() inputClass?: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = true;

  @Input() showDebugInfo: boolean = true;


  @Input() theme: string = 'floating' ;
  @Input() themeSideBySideLabel: boolean = true;  
  @Input() inputContainerClass?: string ;
//showKey
  @Input() showKey: boolean = true;  

  @Input() optionsHasOnlyKey: boolean = false;
  
  
  @Input() readonly?: boolean = false;

  @Input() model: any;
  @Input() options?: InputOption[] | any[] = [];
  @Input() textCase?: TextCaseType;
  @Input() showErrors?: boolean = false;
  @Input() autocompleteMinChars: number = 2;
  @Input() debounceTime: number = 300;
  @Input() min?: number | string;
  @Input() max?: number | string;

  @Input() minlength?: number | string | null;
  @Input() maxlength?: number ;
  
  @Input() minDate?: Date | string;
  @Input() maxDate?: Date | string;
  
  @Input() step?: number;
  @Input() multiple?: boolean;
  @Input() accept?: string;
  @Input() rows?: number;
  @Input() cols?: number;

  @Output() modelChange = new EventEmitter<any>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() autocompleteSearch = new EventEmitter<string>();

  control?: FormControl; //not used 
  filteredOptions?: InputOption[] = [];
  statesList: StateOption[] = [];
  isAutocompleteOpen = false;

  constructor() {
 //   this.control = new FormControl('');
   // this.setupStatesList();
  }

  ngOnInit(): void {
   // this.setupValidators();
    //this.setupValidations();
    //this.setupAutoComplete();
   // this.control.setValue(this.model);

    //can be done in after init
   
    setTimeout(() => {
      console.log("loding complete")
      this.loaded=true;
   }, 100);
   
  }

  
  onInputChange(event: any): void {

    console.log("On Input change");

    let value:any = event.target.value;
    
    console.log("On Input change", value);
    
    if (event.target && event.target.value){
      value = event.target.value
    }

    if (this.controlType === 'file' && event.target) {
      value = this.multiple ? event.target.files : event.target.files[0];
    }

    if (typeof value === 'string' && this.textCase) {
      value = this.transformValue(value);
    }

    if (this.vm ){
      this.vm[this.name] = value; //prefer this way       
    }
    this.value = value;  
    this.model = value;
   // this.modelValue=value;
    this.modelChange.emit(value);

  }

  transformValue(value: string): string {
    if (!value) return value;
    
    switch (this.textCase) {
      case 'UpperCase':
        return value.toUpperCase();
      case 'LowerCase':
        return value.toLowerCase();
      case 'ProperCase':
        return value.replace(/\w\S*/g, txt => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      default:
        return value;
    }
  }
  getVmValue():any{

    if (this.vm){
      return this.vm[this.name];
    
    }
    return this.value;
  }
  getValue() : any{
    
    return this.getVmValue();
    
  }

  onBlur(): void {
    this.showErrors = true;
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  // getStateFlag(abbreviation: string): string {
  //   const state = this.statesList.find(s => s.abbreviation === abbreviation);
  //   return state?.flag || '';
  // }

  isValid(): boolean {
    return true;
    //return !this.showErrors || this.control.valid;
  }

  getErrorMessage(): string {
    return ''

    //if (!this.control.errors) return '';

    //const error = Object.keys(this.control.errors)[0];
    //const validation = this.validations.find(v => v.type === error);
    //return error;
    //return validation?.message || `Invalid ${error}`;
  }
}