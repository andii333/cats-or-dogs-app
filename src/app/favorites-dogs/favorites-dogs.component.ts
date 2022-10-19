import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { AnimalClass } from '../voting/animalClass';

@Component({
  selector: 'app-favorites-dogs',
  templateUrl: './favorites-dogs.component.html',
  styleUrls: ['./favorites-dogs.component.css']
})
export class FavoritesDogsComponent implements OnInit {
  favorites: AnimalClass[];
  likes: AnimalClass[];

  constructor(public service: ServiceService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem(("favoritesDogs")) as string);
    this.likes = JSON.parse(localStorage.getItem(("likesDog")) as string);
    if (this.likes){
      this.likes.forEach((l) => {
      this.favorites.forEach((f) => {
        if (l.name === f.name) {
          f.dislike = l.dislike;
          f.like = l.like;
        }
      }
      )
    })
    }
    
  }

  deleteDogfromFavorites(del: any) {
    const index = this.favorites.findIndex((e: { name: any; }) => e === del);
    this.favorites.splice(index, 1)
    localStorage.setItem("favoritesDogs", JSON.stringify(this.favorites))
  }
}
