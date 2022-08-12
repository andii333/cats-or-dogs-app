import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-favorites-dogs',
  templateUrl: './favorites-dogs.component.html',
  styleUrls: ['./favorites-dogs.component.css']
})
export class FavoritesDogsComponent implements OnInit {
  favorites: any

  constructor(public service: ServiceService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem(("favoritesDogs")) as any)
  }
  ngOnChanges(): void {

  }

  deleteDogfromFavorites(del: any) {
    const index = this.favorites.findIndex((e: { name: any; }) => e === del);
    this.favorites.splice(index, 1)
    localStorage.setItem("favoritesDogs", JSON.stringify(this.favorites))
  }
}
