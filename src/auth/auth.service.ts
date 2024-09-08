import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../src/users/users.service';
import { validPassword } from '../../utils/validate-password';
import { SignInDto } from './dto/signIn.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ acces_token: string }> {
    const signInDtoErrors = plainToInstance(SignInDto, signInDto);
    const dtoErrors = await validate(signInDtoErrors);
    if (dtoErrors.length !== 0) {
      const dtoError = Object.values(dtoErrors[0].constraints)[0];
      throw new BadRequestException(dtoError);
    }
    const user = await this.usersService.findOne(signInDto.email);
    const isValidPassword = await validPassword(
      user.password,
      signInDto.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const payload = { sub: user.id, email: user.email };
    return {
      acces_token: await this.jwtService.signAsync(payload),
    };
  }
}
