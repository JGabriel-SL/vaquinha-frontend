// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    email: 'test@example.com',
    password: '123456',
    displayName: 'Lucas Marinho',
    photoURL: 'https://i.pinimg.com/474x/98/43/1a/98431a96f44d5e42094cab4db691901a.jpg' // URL da imagem do usuário
  };

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      localStorage.setItem('user', JSON.stringify(this.mockUser));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
