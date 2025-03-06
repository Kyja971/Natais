import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthDto } from './dto/auth-dto';
import { DeleteResult } from 'typeorm';
import { TokenType } from './models/token-type';
import { AuthBodyType } from './models/auth-body-type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @MessagePattern({ message: 'addAuth' })
  add(auth: AuthDto): Promise<AuthDto> {
    return this.appService.add(auth);
  }

  @MessagePattern({ message: 'deleteAuth' })
  delete(id: number): Promise<DeleteResult> {
    return this.appService.delete(id);
  }

  @MessagePattern({ message: 'findAllAuth' })
  async findAll(): Promise<AuthDto[] | null> {
    return await this.appService.findAll();
  }

  @MessagePattern({ message: 'findOneAuth' })
  async findOne(id: number): Promise<AuthDto | null> {
    return await this.appService.findOne(id);
  }

  @MessagePattern({ message: 'updateAuth' })
  update(payload: any): Promise<AuthDto> {
    return this.appService.update(payload.id, payload.auth);
  }

  
  @MessagePattern({ message: 'login' })
  async login(body: AuthBodyType,): Promise<TokenType | undefined> {
    return await this.appService.login(body);
  }
    

  @MessagePattern({ message: 'decodeToken' })
  decode(payload: TokenType) {
    return this.appService.decode(payload)
  }

  @MessagePattern({ message: 'getIdByEmail' })
  async getProfileId(token: TokenType): Promise<string | null> {
    return await this.appService.getProfileId(token);
  }
}
