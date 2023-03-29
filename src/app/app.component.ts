import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FromFirestoreService } from './services/from-fairestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
active:boolean;
  title = "Cats-or-Dogs-app"
  constructor(
    private router: Router,
    public fromFirebase: FromFirestoreService,
  ) { }

  ngOnInit(): void {
    this.active = true;
  }

  toVoting(): void {
    this.router.navigate(["search/cat/1"]);
    this.active = false;
  }
  toFavoritesDogs(): void {
    this.router.navigate(["favorites-dogs"]);
    this.active = false;

  }
  toFavoritesCats(): void {
    this.router.navigate(["favorites-cats"]);
    this.active = false;

  }
}
