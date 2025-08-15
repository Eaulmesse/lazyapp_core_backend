import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionDto } from './create-subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {
    id: number;
    user_id: number;
    plan_id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    payment_method_id: string;
    audits_used_this_month: number;
}
