import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Compte } from '../Types/compte/compte-class';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { TokenType } from '../Types/token/token-type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URI: string = `${environment.gatewayUrl}/auth`;
  private authsSubject = new BehaviorSubject<Compte[]>([]);
  public auths$ = this.authsSubject.asObservable();

  private authSubject = new BehaviorSubject<Compte | null>(null);
  public auth$ = this.authsSubject.asObservable();

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController,
  ) { }

  findAll() {
    this._httpClient.get<Array<Compte>>(this.URI).pipe(take(1)).subscribe((auths: Compte[]) => {
      this.authsSubject.next(auths);
    })
  }

  findOne(id:string) {
    this._httpClient.get<Compte>(this.URI).pipe(take(1)).subscribe((auth: Compte) => {
      this.authSubject.next(auth);
    })
  }

  add(auth: Compte) {
    this._httpClient.post<Compte>(this.URI, auth).pipe(take(1)).subscribe((auth: Compte) => {
      this.authsSubject.next([...this.authsSubject.value, auth]);
      this._modalController.dismiss();
    })
  }

  delete(id: number) {
    this._httpClient.delete(this.URI + '/' + id).pipe(take(1)).subscribe(() => {
      const updateAuth = this.authsSubject.value.filter(auth => auth.id !== id);
      this.authsSubject.next(updateAuth);
    });
  }

  update(id?: number, payload?: Compte) {
    this._httpClient.patch<Compte>(this.URI + '/' + id, payload).pipe(take(1)).subscribe((auth: Compte) => {
      const newAuths = this.authsSubject.value;
      newAuths.map(authSubject => {
        if (authSubject.id === id) {
          authSubject.email = auth.email;
          authSubject.role = auth.role;
        }
      })
      this.authsSubject.next([...newAuths]);
      this._modalController.dismiss();
    });
  }

  findByRole(role: string): Compte[] {
    return this.authsSubject.value.filter(auth => auth.role == role);
  }

  login(payload: any): Observable<TokenType> {
    console.log('je suis dans service auth', payload)
    return this._httpClient.post<TokenType>(this.URI + '/login', {
      email: payload.email,
      password: payload.password,
    })
      .pipe((take(1)))
  }

  getProfileId(token: TokenType): Observable<string> {
    return this._httpClient
      .post<string>(`${this.URI}/profileId`, token).pipe(take(1))
  }
}
