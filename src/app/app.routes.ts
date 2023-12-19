import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'funcionarios' },
  {
    path: 'funcionarios',
    loadChildren: (() => import('./modules/funcionario/modules/funcionario-routing.module').then((f) => f.FuncionarioRoutingModule)),
  }
];
