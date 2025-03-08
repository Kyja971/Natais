import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Observable, take } from 'rxjs';

@Controller('profile_natais')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}


  @Post()
  add(@Body() profile: ProfileDto):Observable<ProfileDto> {
    return this.profileService.add(profile).pipe((take(1)));
  }

  @Get()
  findAll(): Observable<Array<ProfileDto>> {
    return this.profileService.findAll().pipe((take(1)));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<ProfileDto> {
    return this.profileService.findOne(id).pipe((take(1)));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfile: UpdateProfileDto): Observable<UpdateProfileDto> {
    return this.profileService.update(id, updateProfile).pipe((take(1)));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
