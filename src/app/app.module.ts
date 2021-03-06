import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NamesComponent } from './names/names.component';
import { NameDetailComponent } from './details/name-detail.component';
import { NamesFormComponent } from './forms/names-form.component';

@NgModule({
  declarations: [
    NamesComponent,
    NameDetailComponent,
    NamesFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [NamesComponent]
})
export class AppModule { }
