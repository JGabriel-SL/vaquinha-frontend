import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpService } from '../services/help.service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-meu-saldo',
  templateUrl: './meu-saldo.page.html',
  styleUrls: ['./meu-saldo.page.scss'],
})
export class MeuSaldoPage implements OnInit, OnDestroy {
  valorArrecadado: number = 0;
  dataInicio: string = '';
  dataEncerramento: string = '';
  imagemUrl: string = '';
  nome: string = '';
  saldoTotal: number = 0;
  saldoEncerrados: number = 0;
  isHelpEncerrado: boolean = false;
  helpId: string = '';
  helpSelecionado: boolean = false;

  private queryParamsSubscription: Subscription | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private helpService: HelpService
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.pipe(
      tap((params) => this.extractQueryParams(params)),
      tap(() => this.calcularSaldos())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  private extractQueryParams(params: { [key: string]: any }): void {
    this.helpId = params['helpId'] || '';
    this.valorArrecadado = Number(params['valorArrecadado']) || 0;
    this.dataInicio = params['dataInicio'] || '';
    this.dataEncerramento = params['dataEncerramento'] || '';
    this.imagemUrl = params['imagemUrl'] || '';
    this.nome = params['nome'] || '';
    this.isHelpEncerrado = params['isEncerrado'] === 'true';

    if (this.helpId) {
      this.loadHelpDetails(this.helpId);
    } else {
      console.warn('Help ID não fornecido');
    }

    console.log('Dados extraídos do Help:', {
      valorArrecadado: this.valorArrecadado,
      dataInicio: this.dataInicio,
      dataEncerramento: this.dataEncerramento,
      imagemUrl: this.imagemUrl,
      nome: this.nome,
      isHelpEncerrado: this.isHelpEncerrado,
    });
  }

  private loadHelpDetails(helpId: string): void {
    this.helpService.getHelpById(helpId).subscribe(
      (help) => {
        if (help) {
          this.valorArrecadado = help.valorArrecadado ?? 0;
          this.nome = help.nome ?? '';
          this.imagemUrl = help.imagemUrl ?? '';
          this.dataInicio = help.dataInicio ?? '';
          this.dataEncerramento = help.dataEncerramento ?? '';
          this.isHelpEncerrado = !!help.encerradoEm;
          this.helpSelecionado = true;
        } else {
          console.warn('Help não encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao carregar detalhes do help:', error);
      }
    );
  }

  private calcularSaldos(): void {
    try {
      if (this.helpId) {
        this.saldoTotal = this.helpService.getTotalArrecadado();
        this.saldoEncerrados = this.helpService.getTotalArrecadadoEncerrados();
      }
    } catch (error) {
      console.error('Erro ao calcular saldos:', error);
    }
  }

  async sacar(): Promise<void> {
    if (this.isHelpEncerrado && this.helpId) {
      console.log('Saque solicitado para:', this.nome);
      await this.helpService.sacarHelp(this.helpId);
    } else {
      console.warn('Saque não disponível. O help ainda não está encerrado.');
    }
  }
}
