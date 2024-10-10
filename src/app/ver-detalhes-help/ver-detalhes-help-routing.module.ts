import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDetalhesHelpPage } from './ver-detalhes-help.page';

const routes: Routes = [
  {
    path: '',
    component: VerDetalhesHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDetalhesHelpPageRoutingModule {}
