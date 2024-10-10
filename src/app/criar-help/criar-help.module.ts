import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarHelpPageRoutingModule } from './criar-help-routing.module';

import { CriarHelpPage } from './criar-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarHelpPageRoutingModule
  ],
  declarations: [CriarHelpPage]
})
export class CriarHelpPageModule {}
