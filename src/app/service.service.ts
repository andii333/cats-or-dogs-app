import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnimalClass } from './voting/animalClass';

@Injectable()
export class ServiceService {

  catsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  dogsList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  catsList: any[] = []
  dogsList: any[] = []
  cats: any[] = []
  dogs: any[] = []
  chooseAnimal: any
 

  constructor(private http: HttpClient) { }

  fetchCats(): void {
    this.http.get("https://api.thecatapi.com/v1/breeds?"
    //  "https://api.thedogapi.com/v1/breeds?"
      // { headers: new HttpHeaders({ "x-api-key": "c89d00db-95c6-4542-bed0-1e1379eb4dfb" }).set("Content-Type", "application/json") }
    ).subscribe((response) => {
      this.catsList = response as any[]
      this.catsList = this.catsList.filter(e => e.image != undefined)
      this.catsList$.next(this.catsList)
      this.catsList = this.catsList$.getValue()
      for (let iterator of this.catsList) {
        if (iterator.image) {
          iterator = new AnimalClass (iterator.name,iterator.image.id,iterator.image.url)
          this.cats.push(iterator)
        }
      }
    })
  }

  fetchDogs(): void {
    this.http.get("https://api.thedogapi.com/v1/breeds?"
      // { headers: new HttpHeaders({ "x-api-key": "c89d00db-95c6-4542-bed0-1e1379eb4dfb" }).set("Content-Type", "application/json") }
    ).subscribe((response) => {
      this.dogsList = response as any[]
      this.dogsList = this.dogsList.filter(e => e.image != undefined)
      this.dogsList$.next(this.dogsList)
      this.dogsList = this.dogsList$.getValue()
      for (let iterator of this.dogsList) {
        if (iterator.image) {
          iterator = new AnimalClass(iterator.name, iterator.image.id, iterator.image.url)
          this.dogs.push(iterator)
        }
      }
    })
  }
}