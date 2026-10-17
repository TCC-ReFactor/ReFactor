import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Componente } from "./componente";

describe("Componente", () => {
  let component: Componente;
  let fixture: ComponentFixture<Componente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Componente],
    }).compileComponents();

    fixture = TestBed.createComponent(Componente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
