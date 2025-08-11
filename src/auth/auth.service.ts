import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    
    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    
    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }

    if (!firstName || !lastName) {
      throw new Error('Le prénom et le nom sont requis pour l\'enregistrement.');
    }

    // Hachage du mot de passe avant la création de l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserDto = {
      email,
      password: hashedPassword,
      firstname: firstName,
      lastname: lastName,
    };

    return this.usersService.create(createUserDto);
  }
}
