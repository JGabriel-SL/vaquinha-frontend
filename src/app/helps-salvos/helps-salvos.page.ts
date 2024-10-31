import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Help } from '../models/help.model';
import { HelpService } from '../services/help.service';
import { Router } from '@angular/router'; // Import para navegação

@Component({
  selector: 'app-helps-salvos',
  templateUrl: './helps-salvos.page.html',
  styleUrls: ['./helps-salvos.page.scss'],
})
export class HelpsSalvosPage implements OnInit {
  helps$: Observable<Help[]> = of([]);

  constructor(private helpService: HelpService, private router: Router) {} // Adicionar Router

  ngOnInit() {
    this.helps$ = this.helpService.getHelpsSalvos(); // Obtém os Helps Salvos do serviço
  }

  salvarHelp(help: Help): void {
    this.helpService.salvarHelp(help);
    console.log('Help salvo:', help);
  }

  // Método para redirecionar para a página de detalhes do help
  verDetalhes(helpId: string): void {
    this.router.navigate(['/ver-detalhes-feed', helpId]); // Navega para a página de detalhes do help
  }
}
