import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-conta',
  templateUrl: './editar-conta.page.html',
  styleUrls: ['./editar-conta.page.scss'],
})
export class EditarContaPage implements OnInit {
  userId: string = '2';
  userInfo: any = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    senha: '',
    imagemUrl: ''
  };

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private accountService: AccountService,
    private router: Router // Adicione o roteador ao construtor
  ) {}

  ngOnInit() {
    this.loadAccountInfo();
  }

  async loadAccountInfo() {
    const loading = await this.loadingController.create({
      message: 'Carregando informações...',
    });
    await loading.present();

    this.accountService.getAccountInfo().subscribe(
      (data) => {
        const userData = data.data.find((user: any) => user.id === parseInt(this.userId));
        if (userData) {
          this.userInfo = {
            nome: `${userData.first_name} ${userData.last_name}`,
            cpf: '',
            email: userData.email,
            telefone: '',
            cep: '',
            senha: '',
            imagemUrl: userData.avatar
          };
        }
        loading.dismiss();
      },
      (error) => {
        console.error('Erro ao carregar as informações da conta:', error);
        loading.dismiss();
      }
    );
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userInfo.imagemUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm() {
    this.userInfo = {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      senha: '',
      imagemUrl: ''
    };
  }

  async saveChanges() {
    const loading = await this.loadingController.create({
      message: 'Salvando alterações...',
    });
    await loading.present();

    this.accountService.updateAccountInfo(this.userId, this.userInfo).subscribe(
      async () => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'As informações da conta foram atualizadas com sucesso.',
          buttons: ['OK'],
        });
        await alert.present();

        this.resetForm(); // Limpa os campos após salvar
        this.router.navigate(['/conta']); // Redireciona para a página de conta
      },
      async (error) => {
        console.error('Erro ao salvar as informações:', error);
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível salvar as alterações.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
