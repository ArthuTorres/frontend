import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/JwtInterceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuickFormsModule, UiModule } from '@gimmeapps/gquicklib-angular';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    UiModule,
    QuickFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    UiModule,
    QuickFormsModule,
    LogoComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
