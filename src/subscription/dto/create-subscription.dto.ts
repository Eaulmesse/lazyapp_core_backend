export class CreateSubscriptionDto {
    user_id: number;
    plan_id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    payment_method_id: string;
    audits_used_this_month: number;
}
