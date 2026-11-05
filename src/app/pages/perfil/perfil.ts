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
  foto: string | null = null;
  capa: string | null = null;
  imageError = "";

  get iniciais(): string {
    const nome = this.profile?.nome || this.profile?.login || "";
    return nome
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join("");
  }

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

  selecionarFoto(event: Event): void {
    this.lerImagem(event, (imagem) => {
      this.foto = imagem;
    });
  }

  selecionarCapa(event: Event): void {
    this.lerImagem(event, (imagem) => {
      this.capa = imagem;
    });
  }

  removerCapa(): void {
    this.capa = null;
  }

  private lerImagem(event: Event, aoCarregar: (imagem: string) => void): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) {
      this.imageError = "Não foi possível selecionar a imagem.";
      return;
    }

    const [arquivo] = input.files ?? [];
    input.value = "";
    this.imageError = "";

    if (!arquivo) {
      return;
    }

    if (!arquivo.type.startsWith("image/")) {
      this.imageError = "Selecione um arquivo de imagem válido.";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        this.imageError = "Não foi possível carregar a imagem selecionada.";
        return;
      }

      aoCarregar(reader.result);
    };
    reader.onerror = () => {
      this.imageError = "Ocorreu um erro ao ler a imagem. Tente novamente.";
    };
    reader.readAsDataURL(arquivo);
  }
}
