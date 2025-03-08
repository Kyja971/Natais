import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { SharedModule } from '../shared/shared.module';
import { MyAccountComponent } from './components/my-account/my-account.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    SharedModule
  ],
  declarations: [ProfilPage, MyAccountComponent]
})
export class ProfilPageModule {}
