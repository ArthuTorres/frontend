import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../_shared/services/cliente.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../../_shared/services/local-storage.service';
import { PrestadorServicoService } from '../../../_shared/services/prestador-servico.service';
import { Router } from '@angular/router';

export type eProfile = "cliente" | "prestador-servico"
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
  $userdata = this.authService.$userData
  _profile?: eProfile

  posssuiPerfilCliente = false
  posssuiPerfilPrestadorServico = false
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private clienteService: ClienteService,
    private prestadorServicoService: PrestadorServicoService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    this.loading = true
    const filter = { "user_id": this.authService.userData?.id }
    this.posssuiPerfilCliente = (await firstValueFrom(this.clienteService.query(filter))).length > 0
    this.posssuiPerfilPrestadorServico = (await firstValueFrom(this.prestadorServicoService.query(filter))).length > 0

    if (!this.profile)
      if (this.posssuiPerfilCliente)
        this.profile = 'cliente'
      else if (this.posssuiPerfilPrestadorServico)
        this.profile = 'prestador-servico'
    this.loading = false
    this.changeDetector.detectChanges()
  }

  get profile() {
    if (!this._profile) {
      this._profile = <eProfile>this.localStorageService.retrieve('user-mode')
    }

    return this._profile
  }

  set profile(value: eProfile) {
    this.localStorageService.store('user-mode', value)
    this._profile = value
  }

  public alterarPerfil(perfil: string) {
    this.profile = <eProfile>perfil;
    this.changeDetector.detectChanges()
  }

  async vincularCliente() {
    await firstValueFrom(this.clienteService.insert({ user_id: this.authService.userData?.id }))
    this.posssuiPerfilCliente = true
    this.alterarPerfil('cliente');
  }


  async vincularPrestadorServico() {
    await firstValueFrom(this.prestadorServicoService.insert({ user_id: this.authService.userData?.id }))
    this.posssuiPerfilPrestadorServico = true
    this.alterarPerfil('prestador-servico')
  }

  abrirPerfil() {
    this.router.navigate(['/perfil'])
  }

  logoff() {
    this.authService.logout()
  }
}
