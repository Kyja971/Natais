import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Observable, of } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';

@Controller('profile_natais')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @MessagePattern({ cmd: 'addProfile'})
  add(profil: any): Promise<ProfileDto> {
    return this.profileService.add(profil);
  }

  @MessagePattern({ cmd: 'findAllProfile'})
  findAll(): Promise<Array<string>> {
    return this.profileService.findAll();
  }

  @MessagePattern({ cmd: 'updateProfile'})
  update(payload: any): Promise<ProfileDto | null> {
    return this.profileService.update(payload.id, payload.updateProfile);
  }

  @MessagePattern({ cmd: 'findOneProfile'})
  async findOne(id: string): Promise<ProfileDto  | null> {
   return this.profileService.findOne(id);
  }

  @MessagePattern({ cmd: 'deleteProfile'})
  delete(id: string) {
    return this.profileService.delete(id);
  }

  @MessagePattern({ cmd: `findOneByMail` })
  async findOneByMail(payload: any): Promise<Observable<string | null>> {
    return this.profileService.findOneByMail(payload.email).then((id) => {
        if (!id) {
          return of(null);
        }
        return of(id);
      })
      .catch((error) => {
        return of(error);
      });
  }
}
