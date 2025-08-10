import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuditDto: CreateAuditDto) {
    // Calculer overall_score basé sur raw_data (exemple simple)
    const calculateOverallScore = (rawData: any): number => {
      if (rawData.performance && rawData.accessibility && rawData.best_practices && rawData.seo) {
        return (rawData.performance + rawData.accessibility + rawData.best_practices + rawData.seo) / 4;
      }
      return 0;
    };

    const overall_score = calculateOverallScore(createAuditDto.raw_data);

    return this.prisma.audit.create({
      data: {
        ...createAuditDto,
        overall_score,
        created_at: new Date(),
      },
      include: {
        user: {
          select: { id: true, email: true, firstname: true, lastname: true }
        },
        site: {
          select: { id: true, name: true, url: true }
        },
      },
    });
  }

  findAll() {
    return this.prisma.audit.findMany({
      include: {
        user: {
          select: { id: true, email: true, firstname: true, lastname: true }
        },
        site: {
          select: { id: true, name: true, url: true }
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    const audit = await this.prisma.audit.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, firstname: true, lastname: true }
        },
        site: {
          select: { id: true, name: true, url: true }
        },
      },
    });

    if (!audit) {
      throw new NotFoundException(`Audit avec l'ID ${id} non trouvé`);
    }

    return audit;
  }

  async update(id: number, updateAuditDto: UpdateAuditDto) {
    await this.findOne(id);

    // Recalculer overall_score si raw_data est mis à jour
    const updateData: any = { ...updateAuditDto };
    if (updateAuditDto.raw_data) {
      const calculateOverallScore = (rawData: any): number => {
        if (rawData.performance && rawData.accessibility && rawData.best_practices && rawData.seo) {
          return (rawData.performance + rawData.accessibility + rawData.best_practices + rawData.seo) / 4;
        }
        return 0;
      };
      updateData.overall_score = calculateOverallScore(updateAuditDto.raw_data);
    }

    return this.prisma.audit.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, email: true, firstname: true, lastname: true }
        },
        site: {
          select: { id: true, name: true, url: true }
        },
      },
    });
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
