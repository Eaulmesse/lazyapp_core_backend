import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const existingSubscription = await this.prisma.subscription.findUnique({
      where: { user_id: createSubscriptionDto.user_id },
    });

    if (existingSubscription) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    return this.prisma.subscription.create({
      data: createSubscriptionDto,
    });
  }

  findAll() {
    return this.prisma.subscription.findMany({
      select: {
        id: true,
        user_id: true,
        plan_id: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.subscription.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        plan_id: true,
        start_date: true,
        end_date: true,
      },
    });
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.prisma.subscription.update({
      where: { id },
      data: updateSubscriptionDto,
    });
  }

  remove(id: number) {
    return this.prisma.subscription.delete({
      where: { id },
    });
  }
}
