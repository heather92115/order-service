import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(_: unknown, next: CallHandler): Observable<any> {
    return next.handle().pipe(tap({ error: Sentry.captureException }));
  }
}
