import { Component, Input, OnInit } from '@angular/core';
import { NewOfComponent } from './components/new-of/new-of.component';
import { ModalController } from '@ionic/angular';
import { ProductOf } from 'src/app/core/Types/productOf/productOf-class';
import { Subscription } from 'rxjs';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { ProductionService } from 'src/app/core/services/production.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {

  
  public productOfs: ProductOf[] = []

    @Input()
    productOf!: ProductOf
  
    @Input()
    num!: number
  
    @Input()
    id!: string | undefined;

  constructor(
    private _modalController: ModalController,
    private _productService: ProductionService,
    private _selfInformation: SelfInformationService
  ) { }

  ngOnInit() {
    this._productService.findAll()
    this._productService.productOf$.subscribe((productsOfs: ProductOf[]) => {
      console.log('voici ce que je vois dans le productPage', productsOfs)
      this.productOfs = productsOfs;
    })

}

   async onAddOf() {
      const newOf = await this._modalController.create({
        component : NewOfComponent,
        initialBreakpoint: 1,
        breakpoints: [0, 1]
      });
      newOf.present();
    }

}
