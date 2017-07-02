import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NamesComponent } from './names/names.component';
import { NameDetailComponent } from './details/name-detail.component';
import { NamesFormComponent } from './forms/names-form.component';

import { MaterializeModule } from 'angular2-materialize';
import { InchargeComponent } from './incharge/incharge.component';
import { RouterModule, Routes } from '@angular/router';
import { InchargeMainComponent } from './incharge-main/incharge-main.component';
import { PhoneLockerComponent } from './phone-locker/phone-locker.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full' 
  },
  {
    path: 'main', component: InchargeMainComponent
  }
];

@NgModule({
  declarations: [
    NamesComponent,
    NameDetailComponent,
    NamesFormComponent,
    InchargeComponent,
    InchargeMainComponent,
    PhoneLockerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MaterializeModule
  ],
  providers: [],
  bootstrap: [InchargeComponent]
})
export class AppModule { }
