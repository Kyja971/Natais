import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductOf } from '../Types/productOf/productOf-class';
import { BehaviorSubject, lastValueFrom, map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private readonly URI: string = `${environment.gatewayUrl}/production`

  private _productOf!: ProductOf

  private productOfsSubject = new BehaviorSubject<ProductOf[]>([]);
  public productOf$ = this.productOfsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController,
  ) { }

  findAll() {
    this._httpClient.get<Array<ProductOf>>(this.URI).pipe(take(1)).subscribe((productOfs: ProductOf[]) => {
      const transformedProductOfs = plainToInstance(ProductOf, productOfs);
      this.productOfsSubject.next(transformedProductOfs);
    });
  }

  add(productOf: any) {
    this._httpClient.post<ProductOf>(this.URI, productOf)
      .pipe(take(1))
      .subscribe((response: ProductOf) => {
        // Convertir la réponse en instance de Patient
        const newProductOf = plainToInstance(ProductOf, response);

        this._modalController.dismiss(newProductOf); // Passer la nouvelle instance de Post si nécessaire
      });
  }

  findOne(productId?: string | null): Observable<ProductOf> {
    return this._httpClient.get<any>(this.URI + '/' + productId).pipe(
      map((productOf: any) => {
        return plainToInstance(ProductOf, productOf)
      })
    )
  }

 async update(id: string | undefined, updateProductOf: ProductOf) {
  if (!id) return;

  this._httpClient.patch<ProductOf>(`${this.URI}/${id}`, updateProductOf)
    .pipe(take(1))
    .subscribe((updatedProductOf) => {
      if (!updatedProductOf) return;

      const transformedProductOf = plainToInstance(ProductOf, updatedProductOf);

      // Mettre à jour le BehaviorSubject
      const currentProductOfs = this.productOfsSubject.getValue();
      const updatedList = currentProductOfs.map(product =>
        product.id === id ? transformedProductOf : product
      );

      this.productOfsSubject.next(updatedList);
      console.log('voici les données après le retour de la bdd', updatedList)
      this._modalController.dismiss(updatedProductOf);
    });
}


  delete(id: string) {
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe(() => {
      const deleteProductOf = this.productOfsSubject.value.filter(productOf => productOf.id !== id);
      this.productOfsSubject.next(deleteProductOf);
    });
  }

}
