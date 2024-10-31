import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';

@Component({
  selector: 'app-editar-help',
  templateUrl: './editar-help.page.html', // Caminho correto para o template
  styleUrls: ['./editar-help.page.scss'], // Caminho correto para o estilo
})
export class EditarHelpPage implements OnInit {
  helpId!: string; // ID do help a ser editado
  helpInfo!: Help; // Objeto do help a ser editado

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpService: HelpService,
    private router: Router // Injetando o Router
  ) {}

  ngOnInit() {
    // Pega o ID do help da rota
    this.helpId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.helpId) {
      // Busca os detalhes do help pelo ID
      this.helpService.getHelpById(this.helpId).subscribe(
        (data) => {
          if (data) {
            this.helpInfo = { ...data };

            // Carrega as imagens existentes (se houver)
            this.loadImage(this.helpInfo.imagemUrl);

            // Carrega os comprovantes existentes (se houver)
            this.loadComprovantes(this.helpInfo.comprovantes);
          } else {
            console.error('Help não encontrado');
            this.router.navigate(['/feed']); // Redireciona se o help não for encontrado
          }
        },
        (error) => {
          console.error('Erro ao buscar Help:', error);
          this.router.navigate(['/feed']); // Redireciona em caso de erro
        }
      );
    } else {
      console.error('ID não fornecido');
      this.router.navigate(['/feed']); // Redireciona se o ID não for válido
    }
  }

  // Método para carregar a imagem principal já existente
  loadImage(imageUrl: string) {
    if (imageUrl) {
      this.helpInfo.imagemUrl = imageUrl; // Atualiza a URL da imagem
    }
  }

  // Método para carregar os comprovantes já existentes
  loadComprovantes(comprovantesUrls: string[]) {
    if (comprovantesUrls && comprovantesUrls.length > 0) {
      this.helpInfo.comprovantes = [...comprovantesUrls]; // Atualiza a lista de comprovantes
    }
  }

  // Método para atualizar o help
  atualizarHelp() {
    this.helpService.updateHelp(this.helpId, this.helpInfo).subscribe(
      (response) => {
        console.log('Help atualizado com sucesso:', response);
        this.router.navigate(['/feed']); // Redireciona após a atualização
      },
      (error) => {
        console.error('Erro ao atualizar Help:', error);
      }
    );
  }

  // Método para lidar com a seleção da imagem principal
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.helpInfo.imagemUrl = e.target.result; // Atualiza a URL da imagem
      };
      reader.readAsDataURL(file); // Converte o arquivo para base64
    }
  }

  // Método para lidar com a seleção das imagens de comprovantes
  onComprovantesSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (!this.helpInfo.comprovantes) {
          this.helpInfo.comprovantes = [];
        }
        this.helpInfo.comprovantes.push(e.target.result); // Adiciona a URL do comprovante na lista
      };
      reader.readAsDataURL(files[i]); // Converte os arquivos para base64
    }
  }

  // Método para remover a imagem principal
  removerImagem() {
    this.helpInfo.imagemUrl = ''; // Remove a imagem principal
  }

  // Método para remover um comprovante selecionado
  removerComprovante(index: number) {
    this.helpInfo.comprovantes.splice(index, 1); // Remove o comprovante selecionado da lista
  }

  // Método para gerenciar ações do help
  gerenciarHelp(event: any, helpId: string) {
    if (event.detail.value === 'editar-help') {
      this.router.navigate(['/editar-help', helpId]);
    }
  }

  // Método para navegar para a página de edição do help
  verDetalhes(helpId: string): void {
    this.router.navigate(['/editar-help', helpId]); // Navega para a página de edição
  }
}
