import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerDetalhesHelpPage } from './ver-detalhes-help.page'; // Verifique a importação

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
