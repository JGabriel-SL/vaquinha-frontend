// src/app/conta/conta.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  userInfo: any = {
    nome: '',
    email: '',
    imagemUrl: ''
  };

  constructor(
    private navCtrl: NavController,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadAccountInfo();
  }

  // Carregar informações do usuário
  loadAccountInfo() {
    this.accountService.getAccountInfo().subscribe((data) => {
      this.userInfo = data;
    });
  }

  logout() {
    // Simulação de logout redirecionando para a página de login
    this.navCtrl.navigateRoot('/home');
  }
}
