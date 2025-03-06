import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TokenType } from './models/token.type';
import { AuthBodyType } from './models/auth-body-type';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private _client: ClientProxy) { }

  add(auth: UpdateAuthDto): Observable<AuthDto> {
    const pattern: any = { message: 'addAuth' };
    return this._client.send<AuthDto>(pattern, auth);
  }

  findAll(): Observable<Array<AuthDto>> {
    const pattern: any = {message:'findAllAuth'};
    return this._client.send<AuthDto[], any>(pattern, {});
  }

  findOne(id: number): Observable<AuthDto | null> {
    const pattern: any = { message: 'findOneAuth' };
    return this._client.send<AuthDto | null>(pattern, id);
  }

  update(id: number, auth: UpdateAuthDto): Observable<AuthDto> {
    const pattern: any = { message: 'updateAuth' };
    const payload: any = { id: id, auth: auth };
    return this._client.send<AuthDto, any>(pattern, payload);
  }

  delete(id: number): Observable<AuthDto | null> {
    const pattern: any = { message: 'deleteAuth' };
    return this._client.send<AuthDto | null, any>(pattern, id);
  }

  login(body: AuthBodyType): Observable<TokenType | null> {
    const pattern: any = { message: 'login' };
    return this._client.send<TokenType | null>(pattern, body);
  }

  decode(token: TokenType){
    const pattern: any = { message: 'decodeToken' };
    return this._client.send<TokenType | null>(pattern, token);
  }

  getProfileId(token: TokenType): Observable<string>{
    const pattern: any = { message: 'getIdByEmail' };
    return this._client.send<string>(pattern, token)
  }
}
