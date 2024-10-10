import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDetalhesHelpPageRoutingModule } from './ver-detalhes-help-routing.module';

import { VerDetalhesHelpPage } from './ver-detalhes-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDetalhesHelpPageRoutingModule
  ],
  declarations: [VerDetalhesHelpPage]
})
export class VerDetalhesHelpPageModule {}
