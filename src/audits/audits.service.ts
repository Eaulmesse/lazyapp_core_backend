import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuditDto: CreateAuditDto) {
    // On suppose que le champ unique est 'id', pas 'site_id'
    const existingAudit = await this.prisma.audit.findFirst({
      where: { site_id: createAuditDto.site_id },
    });

    if (existingAudit) {
      throw new ConflictException('Un audit pour ce site existe déjà');
    }

    return this.prisma.audit.create({
      data: {
        ...createAuditDto,
        created_at: new Date(),
      },
      select: {
        id: true,
        overall_score: true,
        raw_data: true,
        created_at: true,
      }
    })
  }

  findAll() {
    return this.prisma.audit.findMany({
      select: {
        id: true,
        overall_score: true,
        raw_data: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
    }) ;
  }

  findOne(id: number) {
    const audit = this.prisma.audit.findUnique({
      where: { id },
      select: {
        id: true,
        overall_score: true,
        raw_data: true,
        created_at: true,
      }
    })

    if (!audit) {
      throw new NotFoundException(`Audit avec l'ID ${id} non trouvé`);
    }

    return audit;
  }

  async update(id: number, updateAuditDto: UpdateAuditDto) {
    await this.findOne(id);

    return this.prisma.audit.update({
      where: { id },
      data: {
        ...updateAuditDto,
      },
      select: {
        id: true,
        overall_score: true,
        raw_data: true,
        created_at: true,
      }
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.audit.delete({
      where: { id },
      select: {
        id: true,
        overall_score: true,
      }
    })
  }
}
