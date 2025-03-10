import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductOf } from '../Types/productOf-class.ts/productOf-class';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private readonly URI: string = `${environment.gatewayUrl}/production`

  private productOfsSubject = new BehaviorSubject<ProductOf[]>([]);
  public productOf$ = this.productOfsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController,
  ) { }

  findAll() {
    this._httpClient.get<Array<ProductOf>>(this.URI).pipe(take(1)).subscribe((productOfs: ProductOf[]) => {
      this.productOfsSubject.next(productOfs);
    })
  }

  delete(id: string) {
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe(() => {
      const deleteProductOf = this.productOfsSubject.value.filter(productOf => productOf.id !== id);
      this.productOfsSubject.next(deleteProductOf);
    });
  }

}
