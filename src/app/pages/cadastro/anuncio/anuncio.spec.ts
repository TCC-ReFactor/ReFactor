import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Anuncio } from "./anuncio";

describe("Anuncio", () => {
  let component: Anuncio;
  let fixture: ComponentFixture<Anuncio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anuncio],
    }).compileComponents();

    fixture = TestBed.createComponent(Anuncio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
