import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusHelpsPage } from './meus-helps.page';

const routes: Routes = [
  {
    path: '',
    component: MeusHelpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusHelpsPageRoutingModule {}
