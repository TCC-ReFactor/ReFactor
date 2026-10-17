import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, tap } from "rxjs";
import { API_CONFIG, apiUrl } from "./api.config";

interface LoginResponse {
  message: string;
  auth_token: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiConfig = inject(API_CONFIG);
  private readonly tokenKey = "auth_token";

  login(login: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        apiUrl(this.apiConfig, this.apiConfig.endpoints.login),
        { login, senha },
      )
      .pipe(tap((response: LoginResponse) => this.setToken(response.auth_token)));
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  private setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }
}
