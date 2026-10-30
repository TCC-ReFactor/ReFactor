import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { CadastroUser } from "./cadastro-user";

describe("CadastroUser", () => {
  let component: CadastroUser;
  let fixture: ComponentFixture<CadastroUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUser],
      providers: [provideRouter([])],
    }).compileComponents();

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
});
