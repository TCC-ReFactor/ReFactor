import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  AccountService,
  UpdateAdRequest,
  UserAd,
} from "../../auth/account.service";

@Component({
  selector: "app-editar-anuncio",
  imports: [FormsModule, RouterLink],
  templateUrl: "./editar-anuncio.html",
  styleUrl: "./editar-anuncio.css",
})
export class EditarAnuncio implements OnInit {
  ad: UserAd | null = null;
  errorMessage = "";
  isLoading = true;
  isSaving = false;
  saved = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountService: AccountService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.errorMessage = "Anúncio inválido.";
      this.isLoading = false;
      return;
    }

    this.accountService.getMyAd(id).subscribe({
      next: (ad: UserAd) => {
        this.ad = ad;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error("Erro ao carregar anúncio para edição:", error);
        this.errorMessage =
          "Não foi possível carregar este anúncio. Verifique se ele pertence à sua conta.";
        this.isLoading = false;
      },
    });
  }

  save(): void {
    if (!this.ad || this.isSaving) {
      return;
    }

    const changes: UpdateAdRequest = {
      title: this.ad.title,
      description: this.ad.description,
      price: this.ad.price,
      condition: this.ad.condition,
    };

    this.errorMessage = "";
    this.saved = false;
    this.isSaving = true;

    this.accountService.updateMyAd(String(this.ad.id), changes).subscribe({
      next: (ad: UserAd) => {
        this.ad = ad;
        this.saved = true;
        this.isSaving = false;
      },
      error: (error: unknown) => {
        console.error("Erro ao atualizar anúncio:", error);
        this.errorMessage =
          "Não foi possível salvar. Verifique se este anúncio pertence à sua conta.";
        this.isSaving = false;
      },
    });
  }
}
