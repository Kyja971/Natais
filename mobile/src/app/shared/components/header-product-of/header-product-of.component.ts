import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { ProductionService } from 'src/app/core/services/production.service';
import { ProductOf } from 'src/app/core/Types/productOf-class.ts/productOf-class';

@Component({
  selector: 'app-header-product-of',
  templateUrl: './header-product-of.component.html',
  styleUrls: ['./header-product-of.component.scss'],
  standalone:false
})
export class HeaderProductOFComponent  implements OnInit {

  @Input()
  productOf!: ProductOf

  @Input()
  num!: number

  @Input()
  id!: string | undefined;

  constructor(
    private _modalCtrl: ModalController,
    private _router: Router,
    private _productService: ProductionService,
    private _alertController: AlertController,

  ) { }

  ngOnInit() {
    console.log('voici ce que je vois dans le header', this.productOf)
  }

  async presentAlert(productOf: ProductOf) {
    const alert = await this._alertController.create({
      header: 'Suppression',
      message: `Êtes vous sur de vouloir supprimer  ?`,
      buttons: [{
        text: "Oui",
        role: "confirm",
        handler: () => {
          this.onDeleteProductOf(productOf.id)
        }
      }
        , {
        text: "Non",
        role: "cancel"
      }],
    });
    await alert.present();
  }

  onDeleteProductOf(id?: string) {
    if (id) {
      this._productService.delete(id)

    }
  }

}
