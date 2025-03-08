import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewOfComponent } from './components/new-of/new-of.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ProductPage, NewOfComponent]
})
export class ProductPageModule {}
