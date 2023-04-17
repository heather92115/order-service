export const KAFKA_CLIENT = 'KAFKA_CLIENT';

export const KAFKA_HEALTH_CHECK_TIMEOUT_MS = 10000;

export enum Topics {
  HEALTH_CHECK = 'service.health',
  USER_CREATE = 'user.create',
}
