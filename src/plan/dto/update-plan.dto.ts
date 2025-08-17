import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
    name: string;
    description: string;
    price: number;
    features: string[];
    duration: number;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt: Date;
    updatedAt: Date;
}
