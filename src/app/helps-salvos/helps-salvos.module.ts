import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpsSalvosPageRoutingModule } from './helps-salvos-routing.module';

import { HelpsSalvosPage } from './helps-salvos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpsSalvosPageRoutingModule
  ],
  declarations: [HelpsSalvosPage]
})
export class HelpsSalvosPageModule {}
