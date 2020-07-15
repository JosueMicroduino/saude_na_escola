import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuspeitoPage } from './suspeito.page';

const routes: Routes = [
  {
    path: '',
    component: SuspeitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspeitoPageRoutingModule {}
