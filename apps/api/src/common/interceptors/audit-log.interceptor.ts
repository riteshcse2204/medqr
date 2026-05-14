import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;

    // Only log mutations
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      return next.handle().pipe(
        tap(async (data) => {
          try {
            const tenantId = request.headers['x-tenant-id'] || user?.tenantId;
            if (!tenantId) return;

            // Determine entity and action
            const parts = url.split('/');
            const entity = parts[2] || 'unknown';
            const action = method;

            await this.prisma.auditLog.create({
              data: {
                tenantId,
                userId: user?.id,
                action,
                entity,
                entityId: data?.id || 'n/a',
                changes: body,
                ipAddress: request.ip,
              },
            });
          } catch (error) {
            console.error('Failed to log audit:', error);
          }
        }),
      );
    }

    return next.handle();
  }
}
