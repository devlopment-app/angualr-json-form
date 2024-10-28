import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderComponent } from './form-builder/form-builder.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { FormLibModule } from '../form-lib/form-lib.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    FormBuilderComponent
  ],
  exports: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule ,ClarityModule,FormLibModule,DragDropModule
  ]
})
export class FormBuilderModule { }
