// src/app/criar-help/criar-help.page.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { HelpService, Help } from '../services/help.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-criar-help',
  templateUrl: './criar-help.page.html',
  styleUrls: ['./criar-help.page.scss'],
})
export class CriarHelpPage {
  imagem: string | ArrayBuffer | null = null; // Para exibir a imagem selecionada
  arquivoSelecionado: File | null = null; // Para armazenar o arquivo selecionado

  // Campos do formulário
  nome: string = '';
  quantia: string = '';
  dataEncerramento: string = '';
  categoria: string = '';
  descricao: string = '';
  chavePix: string = '';
  termosAceitos: boolean = false;

  // Para múltiplas provas
  provas: File[] = [];
  imagensProvas: string[] = [];

  // Referências de Template para inputs de arquivo
  @ViewChild('fileInputMain') fileInputMain!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputProvas') fileInputProvas!: ElementRef<HTMLInputElement>;

  constructor(
    private helpService: HelpService, 
    private router: Router,
    private loadingController: LoadingController
  ) {}

  // Método para abrir o input de arquivo baseado no tipo
  abrirFileInput(tipo: 'main' | 'provas'): void {
    if (tipo === 'main' && this.fileInputMain) {
      this.fileInputMain.nativeElement.click();
    } else if (tipo === 'provas' && this.fileInputProvas) {
      this.fileInputProvas.nativeElement.click();
    }
  }

  // Método para capturar a imagem principal
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Verifica o tamanho do arquivo (5 MB neste exemplo)
      const maxSizeInMB = 5; // Defina o tamanho máximo permitido
      const fileSizeInMB = file.size / (1024 * 1024);
      
      if (fileSizeInMB > maxSizeInMB) {
        alert(`O arquivo deve ter no máximo ${maxSizeInMB} MB.`);
        return;
      }

      this.compressImage(file, 'capa');
    }
  }

  // Método para capturar múltiplas provas
  onProvasSelected(event: any): void {
    const files: FileList = event.target.files;
    const maxSizeInMB = 5; // Defina o tamanho máximo permitido por arquivo

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileSizeInMB = file.size / (1024 * 1024);
      
      if (fileSizeInMB > maxSizeInMB) {
        alert(`Cada arquivo deve ter no máximo ${maxSizeInMB} MB.`);
        continue; // Ignora o arquivo e continua com os próximos
      }

      this.compressImage(file, 'provas');
    }
  }

  // Método para comprimir a imagem
  compressImage(file: File, tipo: 'capa' | 'provas'): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const MAX_WIDTH = 800; // largura máxima
        const MAX_HEIGHT = 800; // altura máxima
        let width = img.width;
        let height = img.height;

        // Calcular nova largura e altura mantendo a proporção
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, { type: file.type });
            if (tipo === 'capa') {
              this.arquivoSelecionado = compressedFile;
              const newReader = new FileReader();
              newReader.onload = () => {
                this.imagem = newReader.result;
              };
              newReader.readAsDataURL(compressedFile);
            } else if (tipo === 'provas') {
              this.provas.push(compressedFile);
              const newReader = new FileReader();
              newReader.onload = () => {
                this.imagensProvas.push(newReader.result as string);
              };
              newReader.readAsDataURL(compressedFile);
            }
          }
        }, file.type, 0.7); // 0.7 é a qualidade da compressão (70%)
      };
    };
    reader.readAsDataURL(file);
  }

  // Método para apagar a imagem principal
  apagarImagem(): void {
    this.imagem = null;
    this.arquivoSelecionado = null;
    if (this.fileInputMain) {
      this.fileInputMain.nativeElement.value = '';
    }
  }

  // Método para apagar as provas
  apagarProvas(): void {
    this.provas = [];
    this.imagensProvas = [];
    if (this.fileInputProvas) {
      this.fileInputProvas.nativeElement.value = '';
    }
  }

  // Método para criar o help
  async criarHelp(): Promise<void> {
    if (!this.termosAceitos) {
      alert('Você deve aceitar os termos de uso e condições.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando Help...',
    });
    await loading.present();

    // Preparar os dados para Firestore
    const helpData: Help = {
      nome: this.nome,
      quantia: this.quantia,
      dataEncerramento: this.dataEncerramento,
      categoria: this.categoria,
      descricao: this.descricao,
      chavePix: this.chavePix,
      createdAt: new Date(),
      imagemUrl: '',
      provasUrls: []
    };

    // Chama o serviço para enviar o formulário com upload de imagens
    this.helpService.criarHelp(helpData, this.arquivoSelecionado, this.provas).then(() => {
      loading.dismiss();
      alert('Help criado com sucesso!');
      this.router.navigate(['/feed']); // Redireciona para a página de Feed ou outra página de sua escolha
    }).catch((error) => {
      loading.dismiss();
      console.error('Erro ao criar o Help', error);
      const errorMessage = error.message || 'Erro desconhecido';
      alert(`Erro ao criar o Help: ${errorMessage}`);
    });
  }
}
