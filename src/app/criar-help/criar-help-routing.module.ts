// src/app/criar-help/criar-help-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarHelpPage } from './criar-help.page';

const routes: Routes = [
  {
    path: '',
    component: CriarHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarHelpPageRoutingModule {}
