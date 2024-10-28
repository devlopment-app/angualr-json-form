import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DynamicFormConfig } from '../../form-models/form.types'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loaded: boolean =false;
  formConfig?: DynamicFormConfig;
  
  vm :any ={

    address1: '1500 San Dimas',
    city: 'San Dimas',
    zip : 17650

  }

  settings :any ={    
    lable: 'floating'
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFormConfig();
  }

  loadFormConfig() {
    this.http.get<DynamicFormConfig>('assets/forms/address-form.json')
      .subscribe({
        next: (config) => {
          this.formConfig = config;
          this.loaded= true;
        },
        error: (error) => {
          console.error('Error loading form configuration:', error);
        }
      });
  }

  onFormSubmit(formData: any): void {
    console.log('Form submitted:', formData);
  }

}