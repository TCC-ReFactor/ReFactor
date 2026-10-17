import { HttpClient } from "@angular/common/http";
import { Component, DestroyRef, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subscription } from "rxjs";

interface BrasilApiCepResponse {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

@Component({
  selector: "app-cadastro-user",
  imports: [FormsModule, RouterLink],
  templateUrl: "./cadastro-user.html",
  styleUrls: [
    "./cadastro-user.css"
  ],
})
export class CadastroUser {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private cepLookupRequest: Subscription | null = null;

  currentStep: 1 | 2 = 1;
  isLookingUpCep = false;
  cepLookupMessage = "";
  cepLookupError = "";
  organization = {
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    ramoAtuacao: "",
    email: "",
    ddd: "",
    telefone: "",
    matriz: false,
    filial: false,
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  };
  responsible = {
    nome: "",
    inscricaoFederal: "",
    cargo: "",
    login: "",
    senha: "",
  };

  goToStep(step: 1 | 2): void {
    this.currentStep = step;
  }

  lookupAddressByCep(): void {
    const cep = this.organization.cep.replace(/\D/g, "");
    this.cepLookupRequest?.unsubscribe();
    this.cepLookupMessage = "";
    this.cepLookupError = "";

    if (!cep) {
      this.isLookingUpCep = false;
      return;
    }

    if (cep.length !== 8) {
      this.isLookingUpCep = false;
      this.cepLookupError = "Informe um CEP válido com 8 dígitos.";
      return;
    }

    this.isLookingUpCep = true;
    this.cepLookupRequest = this.http
      .get<BrasilApiCepResponse>(`https://brasilapi.com.br/api/cep/v1/${cep}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (address: BrasilApiCepResponse) => {
          this.organization.logradouro = address.street;
          this.organization.bairro = address.neighborhood;
          this.organization.cidade = address.city;
          this.organization.uf = address.state;
          this.cepLookupMessage = "Endereço preenchido pelo CEP.";
          this.isLookingUpCep = false;
        },
        error: (error: unknown) => {
          console.error("Erro ao consultar CEP na Brasil API:", error);
          this.cepLookupError =
            "Não foi possível consultar o CEP. Confira o número e tente novamente.";
          this.isLookingUpCep = false;
        },
      });
  }
}
