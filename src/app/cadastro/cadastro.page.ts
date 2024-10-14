import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome: string = '';
  cpf: string = '';
  email: string = '';
  telefone: string = '';
  cep: string = '';
  senha: string = '';
  imagem: string | ArrayBuffer | null = null; // Para armazenar a imagem selecionada

  constructor() { }

  ngOnInit() { }

  uploadImage() {
    const fileInput: HTMLElement = document.getElementById('file-input')!;
    fileInput.click(); // Simula um clique no input de arquivo
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagem = reader.result; // Armazena a imagem no estado
      };
      reader.readAsDataURL(target.files[0]); // Lê a imagem como URL de dados
    }
  }

  async cadastrar(event: Event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('cpf', this.cpf);
    formData.append('email', this.email);
    formData.append('telefone', this.telefone);
    formData.append('cep', this.cep);
    formData.append('senha', this.senha);
    
    const fileInput: HTMLInputElement = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      formData.append('imagem', fileInput.files[0]); // Enviar a imagem original
    }

    try {
      const resposta = await fetch('https://mp077e7780abbd5c8b94.free.beeceptor.com', {
        method: 'POST',
        body: formData,
      });

      const respostaBruta = await resposta.text(); // Captura a resposta como texto
      console.log('Resposta bruta:', respostaBruta); // Registra a resposta bruta

      if (!resposta.ok) {
        // Mostra detalhes do erro se a resposta não for ok
        console.error('Erro na requisição:', respostaBruta);
        throw new Error('Erro na requisição: ' + respostaBruta);
      }

      // Tenta analisar a resposta como JSON, se possível
      let dadosRecebidos;
      try {
        dadosRecebidos = JSON.parse(respostaBruta);
      } catch (e) {
        dadosRecebidos = {}; // ou algum valor padrão
      }

      console.log('Dados recebidos:', dadosRecebidos);
      alert('Cadastro realizado com sucesso!');

      // Limpar os campos após o cadastro
      this.limparFormulario();

    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
  }

  limparFormulario() {
    this.nome = '';
    this.cpf = '';
    this.email = '';
    this.telefone = '';
    this.cep = '';
    this.senha = '';
    this.imagem = null;

    const fileInput: HTMLInputElement = document.getElementById('file-input') as HTMLInputElement;
    fileInput.value = '';

    const imagemPerfilDiv = document.getElementById('imagem-perfil');
    if (imagemPerfilDiv) {
      imagemPerfilDiv.innerHTML = '';
    }
  }
}
