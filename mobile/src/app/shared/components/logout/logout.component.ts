import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: false
})
export class LogoutComponent  implements OnInit {

  constructor(
    private _storage: StorageService,
    private _router: Router,
    private alertController: AlertController,
    private _selfInformation: SelfInformationService,
  ) { }


  alertButtons = [{
    text: "Oui",
    role: "confirm",
    handler: () => {
      this.logOut()
    }
  }
    , {
    text: "Non",
    role: "cancel"
  }]

  ngOnInit() { }

  logOut() {
    this._storage.remove('auth')
    this._selfInformation.removePersonnal()
    this._router.navigate(['/', 'login'])

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: "Êtes vous sur de vouloir vous déconnecter ?",
      buttons: this.alertButtons,
    });

    await alert.present();
  }

}
