import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuSaldoPage } from './meu-saldo.page';

describe('MeuSaldoPage', () => {
  let component: MeuSaldoPage;
  let fixture: ComponentFixture<MeuSaldoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuSaldoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
