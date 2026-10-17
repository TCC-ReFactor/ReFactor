import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CadastroUser } from "./cadastro-user";

describe("CadastroUser", () => {
  let component: CadastroUser;
  let fixture: ComponentFixture<CadastroUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroUser],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
