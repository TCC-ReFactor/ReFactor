import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { of } from "rxjs";
import { AccountService } from "../../auth/account.service";
import { AuthService } from "../../auth/auth.service";

import { Perfil } from "./perfil";

describe("Perfil", () => {
  let component: Perfil;
  let fixture: ComponentFixture<Perfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfil],
      providers: [
        provideRouter([]),
        {
          provide: AccountService,
          useValue: {
            getMyProfile: () => of({ login: "usuario-teste" }),
            getMyAds: () =>
              of([
                {
                  id: "anuncio-teste",
                  title: "Notebook de teste",
                  description: "Anúncio para validar a edição.",
                  price: 1200,
                },
              ]),
          },
        },
        { provide: AuthService, useValue: { logout: () => undefined } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Perfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("provides image selectors for the profile photo and cover", () => {
    fixture.detectChanges();

    const photoInput: HTMLInputElement = fixture.nativeElement.querySelector("#upload-foto");
    const coverInput: HTMLInputElement = fixture.nativeElement.querySelector("#upload-capa");

    expect(photoInput).toBeTruthy();
    expect(photoInput.accept).toBe("image/*");
    expect(coverInput).toBeTruthy();
    expect(coverInput.accept).toBe("image/*");
  });

  it("shows an edit link for each ad", () => {
    fixture.detectChanges();

    const editLink: HTMLAnchorElement = fixture.nativeElement.querySelector(".anuncio__editar");

    expect(editLink).toBeTruthy();
    expect(editLink.textContent).toContain("Editar anúncio");
    expect(editLink.getAttribute("href")).toBe("/anuncios/anuncio-teste/editar");
  });
});
