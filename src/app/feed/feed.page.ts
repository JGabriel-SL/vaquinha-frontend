import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  helps$: Observable<Help[]>;
  filteredHelps: Help[] = []; // Lista filtrada de helps
  searchTerm: string = ''; // Termo de pesquisa

  constructor(private helpService: HelpService, private router: Router) {
    this.helps$ = this.helpService.getHelps();
  }

  ngOnInit() {
    // Carregar os Helps e inicializar a lista filtrada
    this.loadHelps();
  }

  loadHelps() {
    this.helps$.subscribe((data) => {
      this.filteredHelps = data; // Inicializa a lista filtrada com todos os helps
    });
  }

  salvarHelp(help: Help): void {
    help.salvo = !help.salvo; // Alterna o estado salvo do help
    this.helpService.salvarHelp(help); // Chama o método para salvar o Help no serviço
    console.log(`Help ${help.salvo ? 'salvo' : 'removido'}:`, help); // Exibe no console o estado atual do help
  }

  // Função para navegar para a página de detalhes
  verDetalhes(helpId: string) {
    this.router.navigate(['/ver-detalhes-feed', helpId]); // Navega para a página de detalhes com o ID do help
  }

  // Método para filtrar os helps com base no termo de pesquisa
  filterHelps() {
    this.helps$.subscribe((data) => {
      this.filteredHelps = data.filter(help => 
        help.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
