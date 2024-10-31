// src/app/ver-detalhes-feed/ver-detalhes-feed.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpService } from '../services/help.service';
import { Help } from '../models/help.model';

@Component({
  selector: 'app-ver-detalhes-feed',
  templateUrl: './ver-detalhes-feed.page.html',
  styleUrls: ['./ver-detalhes-feed.page.scss'],
})
export class VerDetalhesFeedPage implements OnInit {
  helpDetails!: Help | undefined; // Declare como Help ou undefined

  constructor(
    private route: ActivatedRoute,
    private helpService: HelpService
  ) {}

  ngOnInit() {
    const helpId = this.route.snapshot.paramMap.get('id'); // Obtendo o ID da rota
    if (helpId) {
      // Use o método correto getHelpById
      this.helpService.getHelpById(helpId).subscribe((help: Help | undefined) => {
        this.helpDetails = help;
      });
    }
  }
}
