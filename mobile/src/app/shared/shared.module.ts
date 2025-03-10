import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderProductOFComponent } from './components/header-product-of/header-product-of.component';



@NgModule({
  declarations: [HeaderComponent, LogoutComponent, HeaderProductOFComponent],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule
  ],
  exports: [HeaderComponent, LogoutComponent, HeaderProductOFComponent]
})
export class SharedModule { }
