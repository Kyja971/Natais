import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { AuthEntity } from './models/auth-entity';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAuthDto } from './dto/update-auth-dto';
import { AuthDto } from './dto/auth-dto';
import { comparePaswrd, encodePaswrd } from './utils/bcrypt';
import { AuthBodyType } from './models/auth-body-type';
import { TokenType } from './models/token-type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AuthEntity) private _repository: Repository<AuthEntity>,
    @Inject('PROFILE') private _client: ClientProxy,
    private jwt: JwtService
  ) { }

  async add(auth: UpdateAuthDto): Promise<AuthDto> {
    const newAuth = await this._repository.save(auth);
    return newAuth;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this._repository.delete({ id: id });
  }

  async findAll(): Promise<AuthEntity[] | null> {
    return this._repository.find();
  }

  async findOne(id: number): Promise<AuthEntity | null> {
    const auth = await this._repository.findOne({ where: { id } });
    if (!auth) {
      return null;
    }
    return auth;
  }

  async update(authId: number, updateAuthDto: UpdateAuthDto): Promise<AuthEntity> {
    // Check if the auth is present in the database
    const existingAuth = await this._repository.findOne({
      where: { id: authId },
    });
    if (!existingAuth) {
      throw new NotFoundException(`Auth #${authId} not found`);
    }

    // Update datas of the existing user
    existingAuth.email = updateAuthDto.email || existingAuth.email;
    if (updateAuthDto.password) {
      existingAuth.password = encodePaswrd(updateAuthDto.password) || existingAuth.password;
    }
    existingAuth.role = updateAuthDto.role || existingAuth.role;

    const updatedAccount = await this._repository.save(existingAuth);
    return updatedAccount
  }

  async login(body: AuthBodyType): Promise<TokenType | undefined> {
    // Check if the mail is present in the database
    return this._repository.findOne({ where: { email: body.email } })
      .then(async (user: AuthEntity) => {
        // Compare the entered password to the database one
        const pwd = await comparePaswrd(body.password, user.password);

        if (pwd) {
          // If both passwords are the same then we can build the payload 
          let pattern = { cmd: 'findOneByMail' };
          const author = await lastValueFrom(this._client.send<string>(pattern, { email: body.email }));
  
          if (author) {
            const payload = {
              id: user?.id,
              email: user?.email,
              role : user?.role,
              profileId: author
            };

            // Then we build and return a jwt token from the payload
            return {
              token: await this.jwt.signAsync(payload),
            };
          }
        }
      })
      // Catch and return a possible sql error
      .catch((error) => {
        console.log(error);
        return undefined;
      })
  }

  decode(token: TokenType) {
    return this.jwt.verifyAsync(token.token, {
      secret: process.env.SECRET,
    })
  }

  async getProfileId(token: TokenType): Promise<string> {
    return this.decode(token).then(async (payload: any) => {
      let pattern = { cmd: 'findOneByMail' }
      const author = await lastValueFrom(this._client.send<string>(pattern, { email: payload.email }));
      return JSON.stringify(author)
    })
  }
}
