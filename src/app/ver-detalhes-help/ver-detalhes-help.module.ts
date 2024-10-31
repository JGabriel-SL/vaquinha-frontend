import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VerDetalhesHelpPageRoutingModule } from './ver-detalhes-help-routing.module';

import { VerDetalhesHelpPage } from './ver-detalhes-help.page'; // Certifique-se de que está correto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDetalhesHelpPageRoutingModule
  ],
  declarations: [VerDetalhesHelpPage] // Certifique-se de que está declarado corretamente
})
export class VerDetalhesHelpPageModule {}
