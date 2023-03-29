import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/inrefaces/animal';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favorites-cats',
  templateUrl: './favorites-cats.component.html',
  styleUrls: ['./favorites-cats.component.css']
})
export class FavoritesCatsComponent implements OnInit {
  favorites: Animal[];

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.favorites = this.storageService.getCatFavorite();
  }

  deleteCatfromFavorites(id: number) {
    const index = this.favorites.findIndex(cat => cat.id === id);
    this.favorites.splice(index, 1);
    this.storageService.updateCatFavorite(this.favorites)
  }

  like(like: string, id: number): void {
    const cats = this.storageService.getCatFavorite()
    const index = cats.findIndex(cat => cat.id === id);
    if (like === 'like') {
      if (cats[index].like) { (cats[index].like as number) += 1 } else { cats[index].like = 1 }
      this.favorites[index].like = cats[index].like
    }
    if (like === 'dislike') {
      if (cats[index].dislike) { (cats[index].dislike as number) += 1 } else { cats[index].dislike = 1 }
      this.favorites[index].dislike = cats[index].dislike
    }
    this.storageService.updateCatFavorite(cats);
  }
}
