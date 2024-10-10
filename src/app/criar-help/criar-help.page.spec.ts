import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarHelpPage } from './criar-help.page';

describe('CriarHelpPage', () => {
  let component: CriarHelpPage;
  let fixture: ComponentFixture<CriarHelpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
