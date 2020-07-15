import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    //path: '',
    //loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    path: '',
    redirectTo: '/login',pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then(m => m.MapaPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'termo',
    loadChildren: () => import('./pages/termos-de-uso/termos-de-uso.module').then(m => m.TermosDeUsoPageModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./pages/stories/stories.module').then(m => m.StoriesPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'saude',
    loadChildren: () => import('./pages/saude/saude.module').then( m => m.SaudePageModule)
  },
  {
    path: 'improvavel',
    loadChildren: () => import('./pages/improvavel/improvavel.module').then( m => m.ImprovavelPageModule)
  },
  {
    path: 'atendimento',
    loadChildren: () => import('./pages/atendimento/atendimento.module').then( m => m.AtendimentoPageModule)
  },
  {
    path: 'suspeito',
    loadChildren: () => import('./pages/suspeito/suspeito.module').then( m => m.SuspeitoPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
