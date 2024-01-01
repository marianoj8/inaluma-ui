import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'app' },
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: '**', redirectTo: 'app' },

  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: (() => import('./modules/auth/auth-routing.module').then((a) => a.AuthRoutingModule)),
      },

      {
        path: '',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'funcionarios' },
          {
            path: 'funcionarios',
            loadChildren: (() => import('./modules/funcionario/modules/funcionario-routing.module').then((f) => f.FuncionarioRoutingModule)),
          }
        ]

      }
    ]
  }

];
