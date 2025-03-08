import { Component, OnInit } from '@angular/core';
import { NewOfComponent } from './components/new-of/new-of.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {

  constructor(
    private _modalController: ModalController,
  ) { }

  ngOnInit() {
  }

   async onAddOf() {
      const authModal = await this._modalController.create({
        component : NewOfComponent,
        initialBreakpoint: 1,
        breakpoints: [0, 1]
      });
      authModal.present();
    }

}
