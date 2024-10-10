import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerDetalhesFeedPage } from './ver-detalhes-feed.page';

describe('VerDetalhesFeedPage', () => {
  let component: VerDetalhesFeedPage;
  let fixture: ComponentFixture<VerDetalhesFeedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalhesFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
