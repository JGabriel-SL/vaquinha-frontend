import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDetalhesFeedPage } from './ver-detalhes-feed.page';

const routes: Routes = [
  {
    path: '',
    component: VerDetalhesFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDetalhesFeedPageRoutingModule {}
