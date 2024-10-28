import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { FrInputComponent } from './fr-input/fr-input.component';
//import { FrDynamicFormComponent } from './fr-dynamic-form/fr-dynamic-form.component';


//import { BrowserModule } from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { HttpClientModule } from '@angular/common/http';



import { FormDesignerComponent } from './form-designer/form-designer.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { JsonPreviewComponent } from './json-preview/json-preview.component';
import { JsonEditComponent } from './json-edit/json-edit.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';
import { DesignCanvasComponent } from './design-canvas/design-canvas.component';
import { FormLibModule } from '../form-lib/form-lib.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

//typecast

//let value: unknown = "Hello";
//let strLength: number = (value as string).length; 



@NgModule({
  declarations: [
    FormDesignerComponent,
    ControlPanelComponent,
    JsonPreviewComponent,
    JsonEditComponent,
    PropertiesPanelComponent,
    DesignCanvasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    HttpClientModule,
    FormLibModule,
    DragDropModule

  ],
  exports: [
    FormDesignerComponent,
    ControlPanelComponent,
    JsonPreviewComponent,
    JsonEditComponent,
    PropertiesPanelComponent,
    DesignCanvasComponent
  ]
})
export class FormDesignerModule { }
