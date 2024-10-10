import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarHelpPage } from './editar-help.page';

const routes: Routes = [
  {
    path: '',
    component: EditarHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarHelpPageRoutingModule {}
