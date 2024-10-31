import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarHelpPageRoutingModule } from './editar-help-routing.module';
import { EditarHelpPage } from './editar-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarHelpPageRoutingModule // Certifique-se de que o módulo de rotas está importado
  ],
  declarations: [EditarHelpPage]
})
export class EditarHelpPageModule {}
