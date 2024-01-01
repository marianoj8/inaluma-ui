import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuncionarioComponent } from "../container/funcionario.component";
import { FuncionarioListPageComponent } from "../components/funcionario-list-page/funcionario-list-page.component";
import { FuncionarioFormPageComponent } from "../components/funcionario-form-page/funcionario-form-page.component";

const routes: Routes = [
  {
    path: '',
    component: FuncionarioComponent,
    children: [
      {
        path: '',
        component: FuncionarioListPageComponent,
      },
      {
        path: 'add',
        component: FuncionarioFormPageComponent,
      },
      {
        path: 'edit/:id',
        component: FuncionarioFormPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
