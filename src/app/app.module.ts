import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InviteFormComponent } from './invite-form/invite-form.component';
import { InviteDataComponent } from './invite-data/invite-data.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [AppComponent, InviteFormComponent, InviteDataComponent, ButtonComponent],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgxMaterialTimepickerModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
