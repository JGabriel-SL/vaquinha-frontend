import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusHelpsPageRoutingModule } from './meus-helps-routing.module';

import { MeusHelpsPage } from './meus-helps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusHelpsPageRoutingModule
  ],
  declarations: [MeusHelpsPage]
})
export class MeusHelpsPageModule {}
