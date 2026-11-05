import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  ADS,
  AdCategory,
  AdCondition,
  AdSortOrder,
  CONDITION_LABELS,
  PriceSortOrder,
  formatBRL,
  initials,
} from "./ads-data";

@Component({
  selector: "app-feed",
  imports: [FormsModule, RouterLink],
  templateUrl: "./feed.html",
  styleUrl: "./feed.css",
})
export class Feed {
  private readonly route = inject(ActivatedRoute);

  readonly ads = ADS;
  readonly conditionLabels = CONDITION_LABELS;
  readonly categories: { value: AdCategory; label: string }[] = [
    { value: "notebook", label: "Notebook" },
    { value: "desktop", label: "Desktop" },
    { value: "monitores", label: "Monitores" },
    { value: "componentes", label: "Componentes" },
    { value: "perifericos", label: "Periféricos" },
  ];
  readonly conditions: { value: AdCondition; label: string }[] = [
    { value: "novo", label: "Novo" },
    { value: "usado", label: "Usado" },
    { value: "avarias", label: "Com avarias" },
  ];

  readonly searchTerm = signal(this.route.snapshot.queryParamMap.get("q") ?? "");
  readonly sortOrder = signal<AdSortOrder>("relevantes");
  readonly priceOrder = signal<PriceSortOrder>("padrao");
  readonly selectedCategories = signal(new Set<AdCategory>(this.categories.map(({ value }) => value)));
  readonly selectedConditions = signal(new Set<AdCondition>(["usado", "avarias"]));
  readonly temaEscuro = signal(false);

  readonly filteredAds = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase("pt-BR");
    const categories = this.selectedCategories();
    const conditions = this.selectedConditions();

    const filtered = this.ads.filter((ad) => {
      const matchesTerm = !term || `${ad.title} ${ad.description} ${ad.op}`.toLocaleLowerCase("pt-BR").includes(term);
      return matchesTerm && categories.has(ad.categoria) && conditions.has(ad.condicao);
    });

    const sorted = filtered.slice();
    const priceOrder = this.priceOrder();
    if (priceOrder === "crescente") return sorted.sort((a, b) => a.price - b.price);
    if (priceOrder === "decrescente") return sorted.sort((a, b) => b.price - a.price);
    if (this.sortOrder() === "recentes") return sorted.sort((a, b) => a.publishedHoursAgo - b.publishedHoursAgo);
    if (this.sortOrder() === "antigos") return sorted.sort((a, b) => b.publishedHoursAgo - a.publishedHoursAgo);
    return sorted;
  });

  formatBRL = formatBRL;
  initials = initials;

  toggleCategory(category: AdCategory, checked: boolean): void {
    this.selectedCategories.update((selected) => {
      const updated = new Set(selected);
      checked ? updated.add(category) : updated.delete(category);
      return updated;
    });
  }

  updateCategory(category: AdCategory, event: Event): void {
    this.toggleCategory(category, (event.target as HTMLInputElement).checked);
  }

  toggleCondition(condition: AdCondition, checked: boolean): void {
    this.selectedConditions.update((selected) => {
      const updated = new Set(selected);
      checked ? updated.add(condition) : updated.delete(condition);
      return updated;
    });
  }

  updateCondition(condition: AdCondition, event: Event): void {
    this.toggleCondition(condition, (event.target as HTMLInputElement).checked);
  }

  isCategorySelected(category: AdCategory): boolean {
    return this.selectedCategories().has(category);
  }

  isConditionSelected(condition: AdCondition): boolean {
    return this.selectedConditions().has(condition);
  }

  isDarkTheme(): boolean {
    return this.temaEscuro();
  }

  toggleTheme(): void {
    this.temaEscuro.update((dark) => !dark);
  }
}
