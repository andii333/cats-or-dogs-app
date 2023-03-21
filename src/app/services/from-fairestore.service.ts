import { Injectable } from '@angular/core';
import { doc, DocumentData, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Animal, AnimalDictionary } from '../inrefaces/animal';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FromFirestoreService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  private _animals = new ReplaySubject<Animal[]>();
  animals$: Observable<Animal[]> = this._animals.asObservable();
  private _animal = new ReplaySubject<Animal>();
  animal$: Observable<Animal> = this._animal.asObservable();
  // private _catFavorite = new ReplaySubject<Animal[]>();
  // catFavorite$: Observable<Animal[]> = this._catFavorite.asObservable();
  // private _dogFavorite = new ReplaySubject<Animal[]>();
  // dogFavorite$: Observable<Animal[]> = this._dogFavorite.asObservable();

  catsList: Animal[] = [];
  dogsList: Animal[] = [];
  catDictionary: AnimalDictionary = {};
  dogDictionary: AnimalDictionary = {};
  type!: string;
  constructor() { }

  async getCatsList(): Promise<Animal[]> {
    const docRef = doc(this.db, "animals", "cats");
    const docSnap = await getDoc(docRef);
    const list = docSnap.data() as DocumentData;
    this.catsList = list['catsList'] as Array<Animal>;
    this._animals.next(this.catsList)
    for (let index = 0; index < this.catsList.length; index++) {
      this.catDictionary[this.catsList[index].id] = this.catsList[index]
    }
    return this.catsList
  }

  async getDogsList(): Promise<Animal[]> {
    const docRef = doc(this.db, "animals", "dogs");
    const docSnap = await getDoc(docRef);
    const list = docSnap.data() as DocumentData;
    this.dogsList = list['dogs'] as Array<Animal>;
    for (let index = 0; index < this.dogsList.length; index++) {
      this.dogDictionary[this.dogsList[index].id] = this.dogsList[index]
      this.dogsList[index].id = index + 1
    }
    return this.dogsList
  }

  getCatFavorite(): Animal[] {
    if (localStorage.getItem('catFavorite') === null) { return [] } else {
      return JSON.parse(localStorage.getItem('catFavorite') as string)
    }
  }
  getDogFavorite(): Animal[] {
    if (localStorage.getItem('dogFavorite') === null) { return [] } else {
      return JSON.parse(localStorage.getItem('dogFavorite') as string)
    }
  }

  addToCatFavorite(animal: Animal): void {
    const catFavorite = JSON.parse(localStorage.getItem('catFavorite') as string)
    if (catFavorite) {
      const index = catFavorite.findIndex((e: Animal) => e.name === animal.name)
      console.log('index', index)
      if (index === -1) {
        localStorage.setItem('catFavorite', JSON.stringify([...catFavorite, animal]))
      } else {
        catFavorite.splice(index, 1);
        localStorage.setItem('catFavorite', JSON.stringify(catFavorite))
      }
    } else {
      localStorage.setItem('catFavorite', JSON.stringify([animal]))
    }
  }

  addToDogFavorite(animal: Animal): void {
    const dogFavorite = JSON.parse(localStorage.getItem('dogFavorite') as string)
    if (dogFavorite) {
      const index = dogFavorite.findIndex((e: Animal) => e.name === animal.name)
      console.log('index', index)
      if (index === -1) {
        localStorage.setItem('dogFavorite', JSON.stringify([...dogFavorite, animal]))
      } else {
        dogFavorite.splice(index, 1);
        localStorage.setItem('dogFavorite', JSON.stringify(dogFavorite))
      }
    } else {
      localStorage.setItem('dogFavorite', JSON.stringify([animal]))
    }
  }

  chooseAnimals(type: string): void {
    this.type = type;
    type === 'cat' ? this._animals.next(this.catsList) : this._animals.next(this.dogsList);
  }

  search(id: number): void {
    this.type === 'cat' ? this._animal.next(this.catDictionary[id]) : this._animal.next(this.dogDictionary[id]);
  }
}

