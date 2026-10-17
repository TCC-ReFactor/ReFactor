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
            getMyAds: () => of([]),
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
});
