import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerDetalhesHelpPage } from './ver-detalhes-help.page';

describe('VerDetalhesHelpPage', () => {
  let component: VerDetalhesHelpPage;
  let fixture: ComponentFixture<VerDetalhesHelpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalhesHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
