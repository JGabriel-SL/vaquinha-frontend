// src/app/criar-help/criar-help.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule
import { IonicModule } from '@ionic/angular';
import { CriarHelpPageRoutingModule } from './criar-help-routing.module';
import { CriarHelpPage } from './criar-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Adiciona o FormsModule aqui
    IonicModule,
    CriarHelpPageRoutingModule
  ],
  declarations: [CriarHelpPage]
})
export class CriarHelpPageModule {}
