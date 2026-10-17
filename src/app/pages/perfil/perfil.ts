import { Component, OnInit } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { forkJoin } from "rxjs";
import { AccountService, UserAd, UserProfile } from "../../auth/account.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-perfil",
  imports: [CurrencyPipe, RouterLink],
  templateUrl: "./perfil.html",
  styleUrl: "./perfil.css",
})
export class Perfil implements OnInit {
  profile: UserProfile | null = null;
  ads: UserAd[] = [];
  errorMessage = "";
  isLoading = true;

  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    forkJoin({
      profile: this.accountService.getMyProfile(),
      ads: this.accountService.getMyAds(),
    }).subscribe({
      next: (result: { profile: UserProfile; ads: UserAd[] }) => {
        const { profile, ads } = result;
        this.profile = profile;
        this.ads = ads;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error("Erro ao carregar perfil e anúncios:", error);
        this.errorMessage =
          "Não foi possível carregar seu perfil e seus anúncios.";
        this.isLoading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl("/login");
  }
}
