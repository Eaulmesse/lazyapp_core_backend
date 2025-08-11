import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Vérifier si l'email existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    // Ne pas hasher à nouveau si le mot de passe semble déjà être haché
    // (Cette vérification simpliste est basée sur la longueur typique d'un hash bcrypt)
    const password = createUserDto.password.length >= 60 
      ? createUserDto.password 
      : await bcrypt.hash(createUserDto.password, 12);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: password,
        created_at: new Date(),
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        email_verified_at: true,
        created_at: true,
        updated_at: true,
        // Pas de password dans la réponse
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        email_verified_at: true,
        password: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        email_verified_at: true,
        created_at: true,
        _count: {
          select: {
            sites: true,
            audits: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        email_verified_at: true,
        created_at: true,
        updated_at: true,
        sites: {
          select: {
            id: true,
            name: true,
            url: true,
            _count: {
              select: { audits: true },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Vérifier existence

    const updateData = { ...updateUserDto };

    // Hash du nouveau mot de passe si fourni
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        email_verified_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Vérifier existence

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });
  }

  // Méthode utile pour l'authentification
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      // Inclure le password pour la vérification auth
    });
  }
}
