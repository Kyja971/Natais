import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [HeaderComponent, LogoutComponent],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule
  ],
  exports: [HeaderComponent, LogoutComponent]
})
export class SharedModule { }
