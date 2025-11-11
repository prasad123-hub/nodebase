'use client';

import { useQuery } from '@tanstack/react-query';

import { customer } from '@/lib/auth-client';

interface SubscriptionState {
  activeSubscriptions?: Array<{
    id: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

export const subscriptionQueryKey = ['subscription', 'state'] as const;

const fetchSubscriptionState = async (): Promise<SubscriptionState | null> => {
  const { data } = await customer.state();
  return data;
};

export const useSubscription = () => {
  const {
    data: subscriptionState,
    isLoading,
    error,
  } = useQuery({
    queryKey: subscriptionQueryKey,
    queryFn: fetchSubscriptionState,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    retry: 1,
  });

  return {
    subscriptionState: subscriptionState ?? null,
    isLoading,
    error,
  };
};

export const useHasActiveSubscription = () => {
  const { subscriptionState, isLoading, error } = useSubscription();
  const isActiveSubscription =
    subscriptionState?.activeSubscriptions && subscriptionState.activeSubscriptions.length > 0;

  return {
    isActiveSubscription,
    activeSubscription: subscriptionState?.activeSubscriptions?.[0],
    isLoading,
    error,
  };
};
