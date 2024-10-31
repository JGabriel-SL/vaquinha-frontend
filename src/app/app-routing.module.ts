import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'ver-detalhes-feed/:id',
    loadChildren: () => import('./ver-detalhes-feed/ver-detalhes-feed.module').then( m => m.VerDetalhesFeedPageModule)
  },
  {
    path: 'criar-help',
    loadChildren: () => import('./criar-help/criar-help.module').then( m => m.CriarHelpPageModule)
  },
  {
    path: 'termos-uso',
    loadChildren: () => import('./termos-uso/termos-uso.module').then( m => m.TermosUsoPageModule)
  },
  {
    path: 'meus-helps/:id',
    loadChildren: () => import('./meus-helps/meus-helps.module').then( m => m.MeusHelpsPageModule)
  },
  {
    path: 'editar-help/:id',
    loadChildren: () => import('./editar-help/editar-help.module').then( m => m.EditarHelpPageModule)
  },
  {
    path: 'meus-helps/ver-detalhes-help/:id',
    loadChildren: () => import('./ver-detalhes-help/ver-detalhes-help.module').then( m => m.VerDetalhesHelpPageModule)
  },
  {
    path: 'editar-conta',
    loadChildren: () => import('./editar-conta/editar-conta.module').then( m => m.EditarContaPageModule)
  },
  {
    path: 'helps-salvos',
    loadChildren: () => import('./helps-salvos/helps-salvos.module').then( m => m.HelpsSalvosPageModule)
  },
  {
    path: 'meu-saldo',
    loadChildren: () => import('./meu-saldo/meu-saldo.module').then( m => m.MeuSaldoPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./conta/conta.module').then( m => m.ContaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}