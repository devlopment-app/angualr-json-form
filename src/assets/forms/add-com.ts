import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DynamicFormConfig } from '../fr-dynamic-form/fr-dynamic-form.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formConfig: DynamicFormConfig;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFormConfig();
  }

  loadFormConfig() {
    this.http.get<DynamicFormConfig>('assets/form-config.json')
      .subscribe({
        next: (config) => {
          this.formConfig = config;
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
