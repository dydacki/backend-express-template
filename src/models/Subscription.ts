import { Currency } from './Currencry';
import { SubscriptionStatus } from './SubscriptionStatus';

export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  recurring: boolean;
  startDate: string;
  endDate: string | null;
  paymentDate: string | null;
  cancelDate: string | null;
  totalCost: number;
  amountPaid: number;
  currency: Currency;
  createdDate: string;
  modifiedDate: string;
}
