import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private _userRepo: Repository<User>,

    private readonly _jwtService: JwtService,
  ) {}
  async create(loginUserDto: LoginUserDto) {
    const { correo, contrasena } = loginUserDto;

    const user = await this._userRepo.findOneBy({
      correo,
      activo: true,
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
    if (!bcrypt.compareSync(contrasena, user.contrasena)) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
    const payload: JwtPayload = {
      identidad: user.identidad,
      correo: user.correo,
      nombre: user.nombre,
      apellido: user.apellido,
      activo: user.activo,
    };
    return {
      token: this._jwtService.sign(payload),
    };
  }
}
