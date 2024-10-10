import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarHelpPage } from './editar-help.page';

describe('EditarHelpPage', () => {
  let component: EditarHelpPage;
  let fixture: ComponentFixture<EditarHelpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
