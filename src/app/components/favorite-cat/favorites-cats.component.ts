import { Component, OnInit } from '@angular/core';
import { AnimalClass } from '../../classes/animalClass';

@Component({
  selector: 'app-favorites-cats',
  templateUrl: './favorites-cats.component.html',
  styleUrls: ['./favorites-cats.component.css']
})
export class FavoritesCatsComponent implements OnInit {
  favorites: AnimalClass[];
  likes: AnimalClass[];

  // constructor(public service: ServiceService) { }

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem(("catFavorite")) as string);
    console.log('this.favorite', this.favorites)
    // this.likes = JSON.parse(localStorage.getItem(("likesCat")) as string);
    // this.likes.forEach((l) => {
    //   this.favorites.forEach((f) => {
    //     if (l.name === f.name) {
    //       f.dislike = l.dislike;
    //       f.like = l.like;
    //     }
    //   }
    //   )
    // })
  }

  deleteCatfromFavorites(del: any) {
    const index = this.favorites.findIndex((e: { name: any; }) => e === del);
    this.favorites.splice(index, 1)
    localStorage.setItem("catFavorite", JSON.stringify(this.favorites))
  }
}
