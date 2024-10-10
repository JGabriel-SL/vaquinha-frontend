import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDetalhesFeedPageRoutingModule } from './ver-detalhes-feed-routing.module';

import { VerDetalhesFeedPage } from './ver-detalhes-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDetalhesFeedPageRoutingModule
  ],
  declarations: [VerDetalhesFeedPage]
})
export class VerDetalhesFeedPageModule {}
