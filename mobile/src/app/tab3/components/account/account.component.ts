import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Compte } from 'src/app/core/Types/compte/compte-class';
import { AddAccountComponent } from '../add-account/add-account.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: false
})
export class AccountComponent  implements OnInit {

  @Input()
  compte!: Compte

  @Input()
  num!: number

  @Input()
  id!: number | undefined

  isAllow: boolean = false


  constructor(private _authService: AuthService,
    private _alertController: AlertController,
    private _modalController: ModalController
  ) { }

  ngOnInit() { }

  onDeleteAuth(id?: number) {
    if (id) {
      this._authService.delete(id);
    }
  }

  async presentAlert(auth: Compte) {
    const alert = await this._alertController.create({
      header: 'Suppression',
      message: `Êtes vous sur de vouloir supprimer ${auth.email} ?`,
      buttons: [{
        text: "Oui",
        role: "confirm",
        handler: () => {
          this.onDeleteAuth(auth.id)
        }
      }
        , {
        text: "Non",
        role: "cancel"
      }],
    });
    await alert.present();
  }

  async onUpdateAuth(compte: Compte) {
    const authModal = await this._modalController.create({
      component : AddAccountComponent,
      componentProps: {
        compte: this.compte, // Passer l'objet compte
      },
      initialBreakpoint: 1,
      breakpoints: [0, 1],
    });
    authModal.present();
  }

}
