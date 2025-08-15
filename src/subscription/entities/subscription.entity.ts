export class Subscription {
    id: number;
    user_id: number;
    plan_id: number;
    start_date: Date;
    end_date: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
    payment_method_id: string;
    audits_used_this_month: number;
}
