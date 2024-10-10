import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusHelpsPage } from './meus-helps.page';

describe('MeusHelpsPage', () => {
  let component: MeusHelpsPage;
  let fixture: ComponentFixture<MeusHelpsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusHelpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
