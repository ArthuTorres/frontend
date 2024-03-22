import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: "perfil", loadChildren: () => import('./modules/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: "auth", loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: "cadastro-cliente", loadChildren: () => import('./modules/cadastro-cliente/cadastro-cliente.module').then(m => m.CadastroClienteModule) },
  { path: "cadastro-prestador-servico", loadChildren: () => import('./modules/cadastro-prestador-servico/cadastro-prestador-servico.module').then(m => m.CadastroPrestadorServicoModule) },
  { path: "**", pathMatch: "full", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
