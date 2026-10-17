import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG, apiUrl } from "./api.config";

export interface UserProfile {
  login: string;
  nome?: string;
  email?: string;
}

export interface UserAd {
  id: string | number;
  title: string;
  description: string;
  price?: number;
  condition?: string;
}

export type UpdateAdRequest = Pick<
  UserAd,
  "title" | "description" | "price" | "condition"
>;

@Injectable({ providedIn: "root" })
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);

  getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      apiUrl(this.apiConfig, this.apiConfig.endpoints.currentProfile),
    );
  }

  getMyAds(): Observable<UserAd[]> {
    return this.http.get<UserAd[]>(
      apiUrl(this.apiConfig, this.apiConfig.endpoints.currentAds),
    );
  }

  getMyAd(id: string): Observable<UserAd> {
    return this.http.get<UserAd>(this.adUrl(id));
  }

  updateMyAd(id: string, changes: UpdateAdRequest): Observable<UserAd> {
    return this.http.put<UserAd>(this.adUrl(id), changes);
  }

  private adUrl(id: string): string {
    const endpoint = this.apiConfig.endpoints.adById.replace(/\/$/, "");
    return apiUrl(this.apiConfig, `${endpoint}/${encodeURIComponent(id)}`);
  }
}
