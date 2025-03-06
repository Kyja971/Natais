import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './models/profile-schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private profileModel: Model<Profile>,
  ) { }

  async add(profil: any): Promise<ProfileDto> {
    const newProfile = new this.profileModel(profil);
    const savedProfile = await newProfile.save();
    return savedProfile;
  }

  findAll(): Promise<Array<string>> {
    return this.profileModel.find();
  }

  async findOne(id: string): Promise<ProfileDto | null> {
    const profile = await this.profileModel.findOne({ _id: id });
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }

  async update(profileId: string, profile: UpdateProfileDto): Promise<ProfileDto | null> {
    const profilToUpdate = await this.profileModel.findByIdAndUpdate(profileId, profile);
    if (!profilToUpdate) {
      throw new NotFoundException(`Profile #${profileId} not found`);
    } else {
      return this.profileModel.findById(profileId);
    }
  }

  async delete(id: string): Promise<ProfileDto | null> {
    const profileToDelete = await this.profileModel.findById(id);
    if (!profileToDelete) {
      throw new NotFoundException(`Profile #${id} not found`);
    } else {
      await this.profileModel.deleteOne({ _id: id });
      return profileToDelete;
    }
  }

  //Return the profile id by the mail
  async findOneByMail(email: string): Promise<string | null> {
    const profile = await this.profileModel.findOne({ email: { $in: email } });
    if (!profile) {
      throw new NotFoundException(`Profile #${email} not found`);
    }
    return profile.id;
  }
}
