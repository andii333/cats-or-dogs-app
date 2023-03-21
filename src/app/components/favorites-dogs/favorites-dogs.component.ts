import { Component, OnInit } from '@angular/core';
import { AnimalClass } from '../../classes/animalClass';
import { FromFirestoreService } from 'src/app/services/from-fairestore.service';

@Component({
  selector: 'app-favorites-dogs',
  templateUrl: './favorites-dogs.component.html',
  styleUrls: ['./favorites-dogs.component.css']
})
export class FavoritesDogsComponent implements OnInit {
  favorites: AnimalClass[];
  likes: AnimalClass[];

  constructor(private serviceFrom: FromFirestoreService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem(("dogFavorite")) as string);
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
    localStorage.setItem("dogFavorite", JSON.stringify(this.favorites))
  }
}
