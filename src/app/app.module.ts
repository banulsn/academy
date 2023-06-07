import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FilterWithComponent } from 'src/filter-with/filter-with.component';
import { CartMediumComponent } from 'src/cart-medium/cart-medium.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterWithComponent,
    CartMediumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
