import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityPage } from './quality.page';

const routes: Routes = [
  {
    path: '',
    component: QualityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityPageRoutingModule {}
