// src/app/ver-detalhes-help/ver-detalhes-help.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';

@Component({
  selector: 'app-ver-detalhes-help',
  templateUrl: './ver-detalhes-help.page.html',
  styleUrls: ['./ver-detalhes-help.page.scss'],
})
export class VerDetalhesHelpPage implements OnInit {
  helpDetails!: Help | undefined; // Define como Help ou undefined para segurança

  constructor(
    private route: ActivatedRoute,
    private helpService: HelpService,
    private router: Router
  ) {}

  ngOnInit() {
    const helpId = this.route.snapshot.paramMap.get('id'); // Obtém o ID da rota
    if (helpId) {
      // Chamando o serviço para buscar os detalhes do help
      this.helpService.getHelpById(helpId).subscribe(
        (help: Help | undefined) => {
          if (help) {
            this.helpDetails = help; // Armazena os detalhes se encontrados
          } else {
            console.error('Help não encontrado'); // Mensagem de erro
            this.router.navigate(['/feed']); // Redireciona ao feed se não encontrado
          }
        },
        (error) => {
          console.error('Erro ao buscar Help:', error); // Log de erro
          this.router.navigate(['/feed']); // Redireciona ao feed em caso de erro
        }
      );
    } else {
      console.error('ID inválido'); // Log de erro se o ID for inválido
      this.router.navigate(['/feed']); // Redireciona se o ID não for fornecido
    }
  }
}

