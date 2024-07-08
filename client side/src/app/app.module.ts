import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    ProductListComponent
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppModule] 
})
export class AppModule { }

