import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

import { CadastroUser } from "./cadastro-user";

describe("CadastroUser", () => {
  let component: CadastroUser;
  let fixture: ComponentFixture<CadastroUser>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUser],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CadastroUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shows the organization form first and advances to the responsible form", () => {
    const organizationForm = fixture.nativeElement.querySelector('[aria-label="Cadastro de organização"]');
    expect(organizationForm).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Cadastro de responsável"]')).toBeNull();

    fixture.nativeElement.querySelector(".login-form-footer button").click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-label="Cadastro de organização"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[aria-label="Cadastro de responsável"]')).toBeTruthy();
  });

  it("returns to the organization form from the responsible form", () => {
    fixture.nativeElement.querySelector(".login-form-footer button").click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector(".login-form-footer button").click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[aria-label="Cadastro de organização"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[aria-label="Cadastro de responsável"]')).toBeNull();
  });

  it("fills the address fields from Brasil API when the CEP is valid", () => {
    component.organization.cep = "11310-060";

    component.lookupAddressByCep();

    const request = httpTestingController.expectOne(
      "https://brasilapi.com.br/api/cep/v1/11310060",
    );
    expect(request.request.method).toBe("GET");
    request.flush({
      street: "Frei Gaspar",
      neighborhood: "Centro",
      city: "São Vicente",
      state: "SP",
    });

    expect(component.organization.logradouro).toBe("Frei Gaspar");
    expect(component.organization.bairro).toBe("Centro");
    expect(component.organization.cidade).toBe("São Vicente");
    expect(component.organization.uf).toBe("SP");
    expect(component.cepLookupMessage).toBe("Endereço preenchido pelo CEP.");
    expect(component.isLookingUpCep).toBe(false);
  });

  it("does not call Brasil API when the CEP does not have eight digits", () => {
    component.organization.cep = "1234";

    component.lookupAddressByCep();

    httpTestingController.expectNone(
      (request) => request.url.startsWith("https://brasilapi.com.br/"),
    );
    expect(component.cepLookupError).toBe("Informe um CEP válido com 8 dígitos.");
    expect(component.isLookingUpCep).toBe(false);
  });

  it("shows an error when Brasil API cannot find the CEP", () => {
    component.organization.cep = "00000-000";

    component.lookupAddressByCep();

    const request = httpTestingController.expectOne(
      "https://brasilapi.com.br/api/cep/v1/00000000",
    );
    request.flush({ message: "CEP not found" }, { status: 404, statusText: "Not Found" });

    expect(component.cepLookupError).toBe(
      "Não foi possível consultar o CEP. Confira o número e tente novamente.",
    );
    expect(component.isLookingUpCep).toBe(false);
  });
});
