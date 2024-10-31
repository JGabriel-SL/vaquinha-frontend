import { Component } from '@angular/core';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-meus-helps',
  templateUrl: './meus-helps.page.html',
  styleUrls: ['./meus-helps.page.scss'],
})
export class MeusHelpsPage {
  meusHelps$: Observable<Help[]>;

  constructor(
    private helpService: HelpService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.meusHelps$ = this.helpService.getHelps();
  }

  async gerenciarHelp(event: any, helpId: string): Promise<void> {
    const selectedValue = event.detail.value;

    const help = await this.helpService.getHelpById(helpId).toPromise();

    if (!help) {
      this.exibirToast('Help não encontrado. Tente novamente.', 'danger');
      return;
    }

    switch (selectedValue) {
      case 'ver-detalhes':
      case 'editar-help':
        if (help.status !== 'encerrado') {
          this.router.navigate([`/${selectedValue === 'ver-detalhes' ? 'meus-helps/ver-detalhes-help' : 'editar-help'}/${helpId}`]);
        } else {
          this.exibirToast('Help já está encerrado e não pode ser editado.', 'warning');
        }
        break;

      case 'encerrar-help':
        await this.confirmarEncerramento(helpId);
        break;

      case 'sacar-agora':
        await this.sacarAgora(helpId);
        break;
    }
  }

  private async confirmarEncerramento(helpId: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Encerramento',
      message: 'Tem certeza de que deseja encerrar este help?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Encerrar',
          handler: async () => {
            await this.endHelp(helpId);
          },
        },
      ],
    });
    await alert.present();
  }

  private async endHelp(helpId: string): Promise<void> {
    try {
      await this.helpService.endHelp(helpId);

      this.exibirToast('Help encerrado com sucesso!', 'success');

      this.meusHelps$ = this.meusHelps$.pipe(
        map((helps) =>
          helps.map((help) => {
            if (help.id === helpId) {
              help.status = 'encerrado';
            }
            return help;
          })
        )
      );
    } catch (error) {
      console.error('Erro ao encerrar o help', error);
      this.exibirToast('Erro ao encerrar o help. Tente novamente.', 'danger');
    }
  }

  private async sacarAgora(helpId: string): Promise<void> {
    try {
      const help = await this.helpService.getHelpById(helpId).toPromise();

      if (help && help.status === 'encerrado') {
        // Redireciona para a página 'meu-saldo' com os detalhes do help
        this.router.navigate(['/meu-saldo'], { queryParams: { 
          helpId: help.id, 
          valorArrecadado: help.valorArrecadado, 
          dataInicio: help.dataInicio, 
          dataEncerramento: help.dataEncerramento, 
          imagemUrl: help.imagemUrl, 
          nome: help.nome 
        } });
      } else {
        this.exibirToast('Help não encontrado ou não está encerrado.', 'danger');
      }
    } catch (error) {
      console.error('Erro ao buscar o help', error);
      this.exibirToast('Erro ao buscar o help. Tente novamente.', 'danger');
    }
  }

  private async exibirToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}

