import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Observable, take, tap } from 'rxjs';
import { Response } from 'express';
import { AuthBodyType } from './models/auth-body-type';
import { TokenType } from './models/token.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  add(@Body() auth: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.add(auth).pipe((take(1)));
  }

  @Get()
  findAll(): Observable<AuthDto[]> {
    return this._authService.findAll().pipe((take(1)));
  }

  @Get(':id')
  findOne(@Param('id') id: number):Observable<AuthDto | null> {
    return this._authService.findOne(+id).pipe((take(1)));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateAuthDto): Observable<AuthDto> {
    return this._authService.update(id, body).pipe((take(1)));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<AuthDto | null> {
    return this._authService.delete(id);
  }

  @Post('login')
  async login(@Body() body: AuthBodyType, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const token = await this._authService.login(body).pipe(
        tap((token) => {
          res.cookie('jwt', token?.token, { httpOnly: true, domain: 'localhost', sameSite: 'lax' });
        }),
      );
      return token;
    } catch (error) {
      return {
        error: 'Login failed'
      };
    }
  }

  
  @Post('decodeToken')
  decode(token: TokenType) {
    return this._authService.decode(token);
  }

  //Returns the id of the user from the token (by checking the email)
  @Post('profileId')
  async getProfileId(@Body() token: TokenType): Promise<Observable<string>> {
    return await this._authService.getProfileId(token);
  }
}
