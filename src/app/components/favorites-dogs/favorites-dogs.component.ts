import { Component, OnInit } from '@angular/core';
import { FromFirestoreService } from 'src/app/services/from-fairestore.service';
import { StorageService } from 'src/app/services/storage.service';
import { Animal } from 'src/app/inrefaces/animal';

@Component({
  selector: 'app-favorites-dogs',
  templateUrl: './favorites-dogs.component.html',
  styleUrls: ['./favorites-dogs.component.css']
})
export class FavoritesDogsComponent implements OnInit {
  favorites: Animal[];

  constructor(
    private storageService: StorageService,
    ) { }

  ngOnInit(): void {
    this.favorites = this.storageService.getDogFavorite();
  }

  deleteDogfromFavorites(id: number) {
    const index = this.favorites.findIndex(dog => dog.id === id);
    this.favorites.splice(index, 1);
    this.storageService.updateDogFavorite(this.favorites)
  }

  like(like:string, id:number):void{
    const dogs = this.storageService.getDogFavorite()
    const index = dogs.findIndex(dog => dog.id === id);
    if (like === 'like') {
      if (dogs[index].like) { (dogs[index].like as number) += 1 } else { dogs[index].like = 1 }
      this.favorites[index].like = dogs[index].like
    }
    if (like === 'dislike') {
      if (dogs[index].dislike) { (dogs[index].dislike as number) += 1 } else { dogs[index].dislike = 1 }
      this.favorites[index].dislike = dogs[index].dislike
    }
    this.storageService.updateDogFavorite(dogs);
  }

}
