import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Lote } from "./lote";

describe("Lote", () => {
  let component: Lote;
  let fixture: ComponentFixture<Lote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lote],
    }).compileComponents();

    fixture = TestBed.createComponent(Lote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
