import { Injectable } from '@angular/core';
import { Animal } from '../inrefaces/animal';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getCatFavorite(): Animal[] {
    const emptyArray: Animal[] = [];
    if (localStorage.getItem('catFavorite') === null) { return emptyArray } else {
      return JSON.parse(localStorage.getItem('catFavorite') as string)
    }
  }
  getDogFavorite(): Animal[] {
    const emptyArray: Animal[] = [];
    if (localStorage.getItem('dogFavorite') === null) { return emptyArray } else {
      return JSON.parse(localStorage.getItem('dogFavorite') as string)
    }
  }

  addToCatFavorite(animal: Animal): void {
    const catFavorite = this.getCatFavorite();
    if (catFavorite) {
      const index = catFavorite.findIndex((e: Animal) => e.name === animal.name)
      if (index === -1) {
        this.updateCatFavorite([...catFavorite, animal])
      } else {
        catFavorite.splice(index, 1);
        this.updateCatFavorite(catFavorite)
      }
    } else {
      this.updateCatFavorite([animal])
    }
  }

  addToDogFavorite(animal: Animal): void {
    const dogFavorite = this.getDogFavorite();
    if (dogFavorite) {
      const index = dogFavorite.findIndex((e: Animal) => e.name === animal.name)
      if (index === -1) {
        this.updateDogFavorite([...dogFavorite, animal])
      } else {
        dogFavorite.splice(index, 1);
        this.updateDogFavorite(dogFavorite)
      }
    } else {
      this.updateDogFavorite([animal])
    }
  }

  updateCatFavorite(cats:Animal[]): void {
    localStorage.setItem('catFavorite', JSON.stringify(cats))
   }

  updateDogFavorite(dogs:Animal[]): void {
    localStorage.setItem('dogFavorite', JSON.stringify(dogs))
   }
}
