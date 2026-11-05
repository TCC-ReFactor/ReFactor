import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ADS, Ad, formatBRL, initials } from "./ads-data";

@Component({
  selector: "app-ad-detail",
  imports: [FormsModule, RouterLink],
  templateUrl: "./ad-detail.html",
  styleUrl: "./feed.css",
})
export class AdDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ad: Ad | undefined = ADS.find((item) => item.id === this.route.snapshot.paramMap.get("id"));
  readonly photoIndexes = [0, 1, 2];
  readonly currentPhoto = signal(0);
  readonly searchTerm = signal("");
  readonly temaEscuro = signal(false);

  formatBRL = formatBRL;
  initials = initials;

  changePhoto(index: number): void {
    this.currentPhoto.set((index + this.photoIndexes.length) % this.photoIndexes.length);
  }

  toggleTheme(): void {
    this.temaEscuro.update((dark) => !dark);
  }

  search(): void {
    void this.router.navigate(["/feed"], {
      queryParams: this.searchTerm().trim() ? { q: this.searchTerm().trim() } : {},
    });
  }
}
