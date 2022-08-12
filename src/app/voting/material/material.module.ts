import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';


const material = [
  MatButtonModule,
  MatCardModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  
];

const cdk = [
  TextFieldModule
];

@NgModule({
  imports: [
    ...material,
    ...cdk
  ],
  exports: [
    ...material,
    ...cdk
  ]
})
export class MaterialModule { }
