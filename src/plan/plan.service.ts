import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createPlanDto: CreatePlanDto) {
    return this.prisma.plan.create({
      data: createPlanDto,
    });
  }

  findAll() {
    return this.prisma.plan.findMany();
  }

  findOne(id: number) {
    return this.prisma.plan.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return this.prisma.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  remove(id: number) {
    return this.prisma.plan.delete({
      where: { id },
    });
  }
}
