import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprovavelPage } from './improvavel.page';

const routes: Routes = [
  {
    path: '',
    component: ImprovavelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprovavelPageRoutingModule {}
