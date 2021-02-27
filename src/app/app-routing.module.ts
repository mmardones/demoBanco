import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'crops',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  { path: 'recuperar', loadChildren: './recuperar/recuperar.module#RecuperarPageModule' }
  /*{ path: 'app',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' }, 
  { path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'soil', loadChildren: './soil/soil.module#SoilPageModule' },
  { path: 'flow', loadChildren: './flow/flow.module#FlowPageModule' }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    //RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

