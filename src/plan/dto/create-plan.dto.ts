export class CreatePlanDto {
    name: string;
    description: string;
    price: number;
    features: string[];
    duration: number;
    isActive: boolean;
    updatedAt: Date;
}
