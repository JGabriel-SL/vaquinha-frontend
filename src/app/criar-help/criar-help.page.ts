// src/app/criar-help/criar-help.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid'; // Import para gerar ID único

@Component({
  selector: 'app-criar-help',
  templateUrl: './criar-help.page.html',
  styleUrls: ['./criar-help.page.scss'],
})
export class CriarHelpPage {
  @ViewChild('fileInputMain') fileInputMain!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputProvas') fileInputProvas!: ElementRef<HTMLInputElement>;

  // Campos do formulário
  nome: string = '';
  quantia: string = ''; // Mantém como string para capturar entrada do usuário
  dataInicio: string = new Date().toISOString(); // Adicionado para capturar a data de início
  dataEncerramento: string = ''; // String para a data
  categoria: string = '';
  descricao: string = '';
  chavePix: string = '';
  termosAceitos: boolean = false;
  loading: boolean = false; // Estado de carregamento

  // Imagens selecionadas
  imagem: string = '';
  imagensProvas: string[] = [];

  constructor(
    private helpService: HelpService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  // Método para abrir o input de arquivo
  abrirFileInput(tipo: 'main' | 'provas'): void {
    if (tipo === 'main' && this.fileInputMain) {
      this.fileInputMain.nativeElement.click();
    } else if (tipo === 'provas' && this.fileInputProvas) {
      this.fileInputProvas.nativeElement.click();
    }
  }

  // Método para capturar a imagem principal
  onFileSelectedMain(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file: File = fileInput.files[0];
      this.readFile(file).then((dataUrl) => {
        this.imagem = dataUrl;
      }).catch((error) => {
        console.error('Erro ao ler a imagem principal:', error);
      });
    }
  }

  // Método para capturar as provas
  onProvasSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      Array.from(fileInput.files).forEach(file => {
        this.readFile(file).then((dataUrl) => {
          this.imagensProvas.push(dataUrl);
        }).catch((error) => {
          console.error('Erro ao ler uma prova:', error);
        });
      });
    }
  }

  // Função para ler um arquivo e retornar uma Data URL
  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  // Método para remover a imagem principal
  apagarImagem(): void {
    this.imagem = '';
    if (this.fileInputMain) {
      this.fileInputMain.nativeElement.value = '';
    }
  }

  // Método para apagar todas as provas
  apagarProvas(): void {
    this.imagensProvas = [];
    if (this.fileInputProvas) {
      this.fileInputProvas.nativeElement.value = '';
    }
  }

  // Método para criar o Help
  async criarHelp(): Promise<void> {
    if (!this.termosAceitos) {
      this.presentAlert('Termos de Uso', 'Você deve aceitar os termos de uso e condições.');
      return;
    }

    if (!this.imagem) {
      this.presentAlert('Imagem Principal', 'Por favor, selecione uma imagem principal.');
      return;
    }

    if (this.quantia && isNaN(parseFloat(this.quantia))) {
      this.presentAlert('Quantia Inválida', 'Por favor, insira uma quantia válida.');
      return;
    }

    if (this.dataEncerramento && new Date(this.dataEncerramento) < new Date()) {
      this.presentAlert('Data Inválida', 'A data de encerramento não pode ser no passado.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Criando Help...',
    });
    await loading.present();
    this.loading = true; // Ativa o estado de carregamento

    // Preparar os dados do Help
    const helpData: Help = {
      id: uuidv4(),
      nome: this.nome,
      valorArrecadado: 0, // Inicializando como 0
      valorMeta: parseFloat(this.quantia) || 0, // Meta de arrecadação
      status: 'Em andamento', // Status inicial ao criar
      quantia: parseFloat(this.quantia) || 0,
      dataInicio: this.dataInicio, // Adicionando a data de início
      dataEncerramento: new Date(this.dataEncerramento).toISOString(), // Converte para ISO
      categoria: this.categoria,
      descricao: this.descricao,
      chavePix: this.chavePix,
      imagemUrl: this.imagem,
      criador: {
        nome: 'Nome do Criador', // Substitua pelo nome real do criador
        imagemUrl: 'URL da imagem do criador', // Substitua pela URL real da imagem
      },
      comprovantes: this.imagensProvas,
      createdAt: new Date(), // Data de criação
      encerradoEm: null // Inicialmente null, será preenchido ao encerrar o help
    };

    try {
      // Adicionar o Help através do serviço
      await this.helpService.addHelp(helpData);
      this.presentAlert('Sucesso', 'Help criado com sucesso!');
      this.limparCampos();
      this.router.navigate(['/feed']);
    } catch (error) {
      console.error('Erro ao criar Help:', error);
      this.presentAlert('Erro', 'Ocorreu um erro ao criar o Help. Tente novamente.');
    } finally {
      loading.dismiss();
      this.loading = false; // Desativa o estado de carregamento
    }
  }

  // Método para limpar os campos após a criação do Help
  limparCampos(): void {
    this.nome = '';
    this.quantia = '';
    this.dataEncerramento = '';
    this.categoria = '';
    this.descricao = '';
    this.chavePix = '';
    this.termosAceitos = false;
    this.imagem = '';
    this.imagensProvas = [];
    if (this.fileInputMain) {
      this.fileInputMain.nativeElement.value = '';
    }
    if (this.fileInputProvas) {
      this.fileInputProvas.nativeElement.value = '';
    }
  }

  // Método para apresentar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
