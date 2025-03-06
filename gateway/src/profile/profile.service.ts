import { Inject, Injectable } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(@Inject('PROFILE') private _client: ClientProxy
) { }

  add(profile: ProfileDto): Observable<ProfileDto> {
    const pattern: any = { cmd: 'addProfile'};
    return this._client.send<ProfileDto>(pattern, profile)
  }

  findAll(): Observable<Array<ProfileDto>> {
    const pattern: any = { cmd: 'findAllProfile'};
    return this._client.send<ProfileDto[]>(pattern, {})
  }

  findOne(id: string): Observable<ProfileDto> {
    const pattern: any = { cmd: 'findOneProfile'};
    return this._client.send<ProfileDto>(pattern, id)
  }

  update(id: string, updateProfile: UpdateProfileDto): Observable<UpdateProfileDto> {
    const payload: any = { id , updateProfile }
    const pattern: any = { cmd: 'updateProfile'};
    return this._client.send<UpdateProfileDto>(pattern, payload)
  }

  delete(id: string) {
    const pattern: any = { cmd: 'deleteProfile'};
    return this._client.send<ProfileDto>(pattern, id)
  }
}
