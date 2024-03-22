import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    PerfilPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
