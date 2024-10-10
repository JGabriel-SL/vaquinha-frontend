import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpsSalvosPage } from './helps-salvos.page';

const routes: Routes = [
  {
    path: '',
    component: HelpsSalvosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpsSalvosPageRoutingModule {}
