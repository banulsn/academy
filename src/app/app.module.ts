import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PeselComponent } from 'src/pesel/pesel.component';
import { FilterWithComponent } from 'src/filter-with/filter-with.component';

@NgModule({
  declarations: [
    AppComponent,
    PeselComponent,
    FilterWithComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
