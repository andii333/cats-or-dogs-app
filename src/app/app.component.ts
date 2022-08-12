import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = "cat-app"
  constructor(
    private router: Router,
    public service: ServiceService
  ) { }

  ngOnInit(): void {
    this.service.fetchCats();
    this.service.fetchDogs();
  }

  toVoting(): void {
    this.router.navigate(["voting"]);
  }
  toFavoritesDogs(): void {
    this.router.navigate(["favorites-dogs"]);
  }
  toFavoritesCats(): void {
    this.router.navigate(["favorites-cats"]);
  }
}