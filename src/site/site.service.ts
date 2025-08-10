import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class SiteService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createSiteDto: CreateSiteDto) {
    const existingSite = await this.prisma.site.findUnique({
      where: { url: createSiteDto.url },
    })

    if (existingSite) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    return this.prisma.site.create({
      data: {
        ...createSiteDto,
        created_at: new Date(),
        
      },
      select: {
        id: true,
        name: true,
        url: true,
        description: true,
        last_audit: true,
        created_at: true,
      }
    })

  }

  findAll() {
    return this.prisma.site.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        description: true,
        last_audit: true,
        created_at: true,
        _count: {
          select: { audits: true },
        },
      },
      orderBy: { created_at: 'desc' },
    })
  }

  findOne(id: number) {
    const site = this.prisma.site.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        url: true,
        description: true,
        last_audit: true,
        created_at: true,
        _count: {
          select: { audits: true },
        },
      }

    })

    if (!site) {
      throw new NotFoundException(`Site avec l'ID ${id} non trouvé`);
    }

    return site;
  }

  async update(id: number, updateSiteDto: UpdateSiteDto) {
    await this.findOne(id);

    return this.prisma.site.update({
      where: { id },
      data: {
        ...updateSiteDto,
        name: updateSiteDto.name,
        url: updateSiteDto.url,
        description: updateSiteDto.description,
      },
      select: {
        id: true,
        name: true,
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.site.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      }
    });
  }
}
