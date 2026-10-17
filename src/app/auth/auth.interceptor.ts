import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { API_CONFIG } from "./api.config";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const apiBaseUrl = inject(API_CONFIG).baseUrl.replace(/\/$/, "");
  if (request.url !== apiBaseUrl && !request.url.startsWith(`${apiBaseUrl}/`)) {
    return next(request);
  }

  const token = inject(AuthService).getToken();

  if (!token) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
