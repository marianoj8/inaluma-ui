import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LandingPageComponent } from './shared/visitor/landing-page/landing-page.component';
import { ItemFormComponent } from './shared/components/item-form/item-form.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { LogInComponent } from './core/auth/components/log-in/log-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { UserComponent } from './core/components/user/user.component';
import { CarrinhoListComponent } from './core/components/carrinho/carrinho-list.component';
import { ItemsDataResolver } from './shared/components/items-data.resolver';
import { AgendamentoListComponent } from './core/components/documentos/agendamento/agendamento-list.component';
import { SectionActivationGuard as SectionActivationGuard } from './core/services/section-activation.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { EmployeeGuard } from './core/services/employee.guard';
import { DOCUMENTO_OPEARATION_TYPE, DOCUMENTO_TYPE } from './shared/config';
import { FacturaComponent } from './core/components/documentos/factura/factura.component';

const _routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'log-in',
        component: LogInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'produtos',
        data: {isProduto: true, hideShopping: false},
        children: [
          {
            path: '',
            component: ItemListComponent
          },
          {
            path: 'add',
            canActivate: [EmployeeGuard],
            component: ItemFormComponent
          },
          {
            path: 'edit',
            canActivate: [EmployeeGuard],
            resolve: {dynamic: ItemsDataResolver},
            component: ItemFormComponent
          }
        ],
      },
      {
        path: 'servicos',
        data: {isProduto: false, hideShopping: false},
        children: [
          {
            path: '',
            component: ItemListComponent
          },
          {
            path: 'add',
            canActivate: [EmployeeGuard],
            component: ItemFormComponent
          },
          {
            path: 'edit',
            canActivate: [EmployeeGuard],
            resolve: {dynamic: ItemsDataResolver},
            component: ItemFormComponent
          }
        ],
      },
      {
        path: 'user',
        canActivate: [EmployeeGuard],
        children: [
          {
            path: 'funcionario',
            component: UserComponent
          },
          {
            path: 'cliente',
            component: UserComponent
          }
        ]
      },
      {
        path: 'carrinho',
        canActivate: [SectionActivationGuard],
        component: CarrinhoListComponent,
        data: {hideShopping: true}
      },
      {
        path: 'agendamentos',
        canActivate: [SectionActivationGuard],
        children: [
          {path: '', component: AgendamentoListComponent},
          {
            path: 'confirmar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.confirmar,
              documento: DOCUMENTO_TYPE.agendamento
            },
            component: FacturaComponent
          },
          {
            path: 'visualizar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.visualizar,
              documento: DOCUMENTO_TYPE.agendamento
            },
            component: FacturaComponent
          },
          {
            path: 'editar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.visualizar,
              documento: DOCUMENTO_TYPE.agendamento
            },
            component: FacturaComponent
          },
        ]
      },
      {
        path: 'compras',
        canActivate: [SectionActivationGuard],
        children: [
          {path: '', component: AgendamentoListComponent},
          {
            path: 'confirmar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.confirmar,
              documento: DOCUMENTO_TYPE.compra
            },
            component: FacturaComponent
          },
          {
            path: 'visualizar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.visualizar,
              documento: DOCUMENTO_TYPE.compra
            },
            component: FacturaComponent
          },
          {
            path: 'editar',
            data: {
              operation: DOCUMENTO_OPEARATION_TYPE.visualizar,
              documento: DOCUMENTO_TYPE.compra
            },
            component: FacturaComponent
          },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(_routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
