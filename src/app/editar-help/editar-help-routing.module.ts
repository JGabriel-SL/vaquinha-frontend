import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarHelpPage } from './editar-help.page';

const routes: Routes = [
  {
    path: '', // Rota com o parâmetro ID
    component: EditarHelpPage
  },
  {
    path: '', // Rota sem ID para evitar redirecionamento errado
    redirectTo: '/feed', // Você pode redirecionar para uma página específica se o ID não estiver presente
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarHelpPageRoutingModule {}
