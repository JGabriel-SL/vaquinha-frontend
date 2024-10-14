// src/app/feed/feed.page.ts
import { Component, OnInit } from '@angular/core';
import { HelpService, Help } from '../services/help.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  helps$: Observable<Help[]>;

  constructor(private helpService: HelpService) {
    this.helps$ = this.helpService.getHelps();
  }

  ngOnInit() {}
}
