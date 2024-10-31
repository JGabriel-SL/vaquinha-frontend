/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

}
*/
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Para armazenar mensagens de erro

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    console.log('Tentando fazer login com:', this.email); // Para depuração
    this.errorMessage = ''; // Limpa a mensagem de erro ao tentar fazer login

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/feed']); // Navega para a página Home após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login', error);
      this.errorMessage = 'Login falhou. Verifique suas credenciais e tente novamente.'; // Define uma mensagem de erro para exibir
    }
  }
}
