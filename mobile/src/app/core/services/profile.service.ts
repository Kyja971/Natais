import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Profile } from '../Types/profile/profile-class';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly URI: string = `${environment.gatewayUrl}/profile_natais`

  constructor(
    private _httpClient: HttpClient,
    private _modalController: ModalController
  ) { }

  findOne(profileId?: string): Observable<Profile> {
    return this._httpClient.get<any>(this.URI + '/' + profileId).pipe(
      map((profile: any) => {
        return plainToInstance(Profile, profile)
      })
    )
  }
}
