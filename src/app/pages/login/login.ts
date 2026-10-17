import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-login",
  imports: [FormsModule, RouterLink],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  login = "";
  senha = "";
  errorMessage = "";
  isSubmitting = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  submitLogin(): void {
    if (this.isSubmitting) {
      return;
    }

    this.errorMessage = "";
    this.isSubmitting = true;

    this.authService.login(this.login, this.senha).subscribe({
      next: () => {
        const returnUrl = this.router.parseUrl(
          this.router.url,
        ).queryParams["returnUrl"];
        const destination =
          typeof returnUrl === "string" && returnUrl.startsWith("/")
            ? returnUrl
            : "/perfil";

        void this.router.navigateByUrl(destination);
      },
      error: (error: unknown) => {
        console.error("Erro ao realizar login:", error);
        this.errorMessage =
          "Não foi possível realizar o login. Verifique o login e a senha e tente novamente.";
        this.isSubmitting = false;
      },
    });
  }
}
