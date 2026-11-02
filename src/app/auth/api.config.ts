import { InjectionToken } from "@angular/core";

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    login: string;
    currentProfile: string;
    currentAds: string;
    adById: string;
  };
}

export const API_CONFIG = new InjectionToken<ApiConfig>("API_CONFIG", {
  providedIn: "root",
  factory: () => ({
    baseUrl: "https://refact-api-gteq.onrender.com/api",
    endpoints: {
      login: "/logInto",
      currentProfile: "/perfil/me",
      currentAds: "/anuncios/me",
      adById: "/anuncios",
    },
  }),
});

export function apiUrl(config: ApiConfig, endpoint: string): string {
  return `${config.baseUrl.replace(/\/$/, "")}${endpoint}`;
}
