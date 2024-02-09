import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LandingPageComponent } from './shared/visitor/landing-page/landing-page.component';
import { ItemFormComponent } from './shared/components/item-form/item-form.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';
import { LogoutGuard } from './core/auth/guards/log-out.guard';
import { LogInComponent } from './core/auth/components/log-in/log-in.component';
import { SignUpComponent } from './core/auth/components/sign-up/sign-up.component';
import { UserComponent } from './core/components/user/user.component';
import { CarrinhoListComponent } from './core/components/carrinho/carrinho-list.component';
import { ItemsDataResolver } from './shared/components/items-data.resolver';
import { AgendamentoListComponent } from './core/components/documentos/agendamento/agendamento-list.component';
import { CarrinhoLoadGuard } from './core/components/carrinho/carrinho-load.guard';

const _routes: Routes = [
  {
    path: 'auth',
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
            component: ItemFormComponent
          },
          {
            path: 'edit',
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
            component: ItemFormComponent
          },
          {
            path: 'edit',
            resolve: {dynamic: ItemsDataResolver},
            component: ItemFormComponent
          },
          {
            path: 'agendar',
            redirectTo: ''
          }
        ],
      },
      {
        path: 'user',
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
        canActivate: [CarrinhoLoadGuard],
        component: CarrinhoListComponent,
        data: {hideShopping: true}
      },
      {
        path: 'agendamentos',
        component: AgendamentoListComponent
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'prefix' }
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
