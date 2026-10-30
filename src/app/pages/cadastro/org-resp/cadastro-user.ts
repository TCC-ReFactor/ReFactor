import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-cadastro-user",
  imports: [FormsModule, RouterLink],
  templateUrl: "./cadastro-user.html",
  styleUrls: [
    "./cadastro-user.css"
  ],
})
export class CadastroUser {
  currentStep: 1 | 2 = 1;
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
}
