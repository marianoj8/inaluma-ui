import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { LandingPageComponent } from './shared/visitor/landing-page/landing-page.component';
import { ItemFormComponent } from './shared/components/item-form/item-form.component';
import { ItemListComponent } from './shared/components/item-list/item-list.component';

const _routes: Routes = [
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
        data: {isProduto: true},
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
            component: ItemFormComponent
          }
        ],
      },
      {
        path: 'servicos',
        data: {isProduto: false},
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
            component: ItemFormComponent
          },
          {
            path: 'agendar',
            redirectTo: ''
          }
        ],
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
