import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import csrf from 'csrf';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private tokens = new csrf();
  
  use(req: Request, res: Response, next: NextFunction) {
    // Ignorer les requêtes GET, HEAD, OPTIONS et TRACE
    if (['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(req.method)) {
      return next();
    }
    
    const csrfToken = req.headers['x-csrf-token'] as string;
    const csrfCookie = req.cookies['csrf-token'];
    
    if (!csrfToken || !csrfCookie) {
      throw new UnauthorizedException('Token CSRF manquant');
    }
    
    // Vérifier que le token dans l'en-tête correspond au cookie
    if (!this.tokens.verify(csrfCookie, csrfToken)) {
      throw new UnauthorizedException('Token CSRF invalide');
    }
    
    next();
  }
}