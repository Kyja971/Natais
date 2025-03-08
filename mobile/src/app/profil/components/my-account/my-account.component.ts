import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SelfInformationService } from 'src/app/core/services/self-information.service';
import { Profile } from 'src/app/core/Types/profile/profile-class';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  standalone: false
})
export class MyAccountComponent  implements OnInit {

  @Input()
  profile!: Profile


  constructor(private _profileService: ProfileService,
    private _selfInformation: SelfInformationService
  ) { }

  id = this._selfInformation.retrievePersonnal()

  async ngOnInit() {
    try {
      const profile = await lastValueFrom(this._profileService.findOne(this.id))
      this.profile = profile
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  }
}
