import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InvitelistComponent } from './invitelist/invitelist.component';

@NgModule({
  declarations: [AppComponent, InvitelistComponent],
  imports: [FormsModule, BrowserModule, ReactiveFormsModule, NgxMaterialTimepickerModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
