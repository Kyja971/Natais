import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MyAccountComponent } from './components/my-account/my-account.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false
})
export class ProfilPage implements OnInit {

  constructor(
    private _modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async goMyProfile() {
    const patientModal = await this._modalCtrl.create({
      component: MyAccountComponent,
      initialBreakpoint: 1,
      breakpoints: [0, 1]
    });
    await patientModal.present(); 
  }

}
