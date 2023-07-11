import { Subscription, SubscriptionRequest } from '../models/Subscription';

interface ISubscriptionRepository {
  createSubscription(request: SubscriptionRequest): Subscription;
  getSubscriptionForUser(userName: string): Subscription;
}

export { ISubscriptionRepository };
