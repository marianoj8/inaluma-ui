import { Routes } from '@angular/router';
import { FuncionarioComponent } from './modules/funcionario/container/funcionario.component';
import { FuncionarioListPageComponent } from './modules/funcionario/funcionario-list-page/funcionario-list-page.component';

export const routes: Routes = [
  { path:'', pathMatch:'full', redirectTo: 'funcionarios'},
  {
    path: 'funcionarios',
    component: FuncionarioComponent,
    children:[
      {
        path: '',
        component: FuncionarioListPageComponent
      }
    ]
  }
];
