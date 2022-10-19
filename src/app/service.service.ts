import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnimalClass } from './voting/animalClass';

@Injectable()
export class ServiceService {

  catsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dogsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cats: AnimalClass[] = [];
  dogs: AnimalClass[] = [];
  chooseAnimal: any;

  constructor(private http: HttpClient) { }

  fetchCats(): void {
    this.http.get("https://api.thecatapi.com/v1/breeds?"
    ).subscribe((response) => {
       let catsList = response as any[]
      catsList = catsList.filter(e => e.image != undefined)
      this.catsList$.next(catsList)
      catsList = this.catsList$.getValue()
      for (let iterator of catsList) {
        if (iterator.image) {
          iterator = new AnimalClass (iterator.name,iterator.image.id,iterator.image.url)
          this.cats.push(iterator)
        }
      }
    })
  }

  fetchDogs(): void {
    this.http.get("https://api.thedogapi.com/v1/breeds?"
    ).subscribe((response) => {
      let dogsList = response as any[]
      dogsList = dogsList.filter(e => e.image != undefined)
      this.dogsList$.next(dogsList)
      dogsList = this.dogsList$.getValue()
      for (let iterator of dogsList) {
        if (iterator.image) {
          iterator = new AnimalClass(iterator.name, iterator.image.id, iterator.image.url)
          this.dogs.push(iterator)
        }
      }
    })
  }
}