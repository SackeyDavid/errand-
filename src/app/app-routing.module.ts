import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // for redirecting default route to login
    //redirectTo: 'login', pathMatch: 'full'
    // redirect to tabbed default
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'news-single', loadChildren: './news-single/news-single.module#NewsSinglePageModule' },
  { path: 'errand', loadChildren: './errand/errand.module#ErrandPageModule' },
  { path: 'shop-single', loadChildren: './shop-single/shop-single.module#ShopSinglePageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
