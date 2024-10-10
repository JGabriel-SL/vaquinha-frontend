import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeuSaldoPageRoutingModule } from './meu-saldo-routing.module';

import { MeuSaldoPage } from './meu-saldo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeuSaldoPageRoutingModule
  ],
  declarations: [MeuSaldoPage]
})
export class MeuSaldoPageModule {}
