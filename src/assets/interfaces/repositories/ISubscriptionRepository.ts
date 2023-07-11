import { Subscription, SubscriptionRequest } from '../models/Subscription';

export interface ISubscriptionRepository {
  createSubscription(request: SubscriptionRequest): Subscription;
  getSubscriptionForUser(userName: string): Subscription;
}
