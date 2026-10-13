import { Request, Response, NextFunction } from 'express';

/**
 * Enforces strict read-only access for the public API.
 * Any HTTP method attempting to mutate database state (POST, PUT, PATCH, DELETE)
 * is rejected with HTTP 403 Forbidden.
 */
export function enforceReadOnly(req: Request, res: Response, next: NextFunction): void {
  const mutationMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (mutationMethods.includes(req.method)) {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'CloudLab is a read-only educational platform. Database modifications are restricted to administrative migrations and seed scripts.',
    });
    return;
  }

  next();
}
