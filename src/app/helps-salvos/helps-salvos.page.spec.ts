import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelpsSalvosPage } from './helps-salvos.page';

describe('HelpsSalvosPage', () => {
  let component: HelpsSalvosPage;
  let fixture: ComponentFixture<HelpsSalvosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpsSalvosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
