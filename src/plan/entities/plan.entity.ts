export class Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
}
