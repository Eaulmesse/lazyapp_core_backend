import { Controller, HttpCode, Post, Body, HttpStatus, UseGuards, Get, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import csrf from 'csrf';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('csrf-token')
  getCsrfToken(@Res({ passthrough: true }) res: express.Response) {
    const tokens = new csrf();
    const secret = tokens.secretSync();
    const token = tokens.create(secret);
    
    // Définir le cookie HttpOnly avec l'attribut SameSite
    res.cookie('csrf-token', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 heure
    });
    
    return { token };
  }
}
