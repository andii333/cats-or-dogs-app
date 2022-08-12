import { Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { ServiceService } from '../service.service';
import { VotingAction } from './voting-action/voting-action';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  animal: any
  animals: any[]
  animalImage: any = false
  animalId: any
  animalLike: any
  animalDislike: any
  breed: any
  breedName: String
  cats = this.service.cats
  choose: boolean = true
  count = 0
  dogs = this.service.dogs
  favorites: any[]
  favoritesCats: any[]
  favoritesDogs: any[]
  myDate: Date = new Date();
  num:number
  votingActions: VotingAction[] = [];


  constructor(public service: ServiceService, public serviceCount: CountService) {
  }

  ngOnInit(): void {
    if (this.favoritesCats) {
      this.favoritesCats = JSON.parse(localStorage.getItem("favoritesCats") as any)
    } else {
      this.favoritesCats = []
    }
    if (this.favoritesDogs) {
      this.favoritesDogs = JSON.parse(localStorage.getItem("favoritesDogs") as any)
    } else {
      this.favoritesDogs = []
    }
    this.chooseAnimal("cat")
  }

  chooseAnimal(event: string) {
    if (event === "cat") {
      this.animals = this.cats;
      this.choose = true
    } else {
      this.animals = this.dogs;
      this.choose = false
    }
  }

  search() {
    if (this.choose) {
      this.animal = this.cats.filter((e: any) => e.name === this.breed)[0]
    } else {
      this.animal = this.dogs.filter((e: any) => e.name == this.breed)[0];
    }
    this.service.chooseAnimal = this.animal
    this.animalImage = this.animal.image
    this.breedName = this.breed
  }

  onVotingActionClick(destination: string): void {
    this.choose ? this.favorites = this.favoritesCats : this.favorites = this.favoritesDogs
    const index = this.favorites.findIndex((e: { name: any; }) => e.name === this.animal.name);

    if (index > -1 && destination === "favorite") {
      this.favorites.splice(index, 1)
      this.choose ? localStorage.setItem("favoritesCats", JSON.stringify(this.favorites)) :
        localStorage.setItem("favoritesDogs", JSON.stringify(this.favorites))
      destination = "notFavorite"
    }

    if (index === -1 && destination === "favorite") {
      this.favorites.push(this.animal)
      this.choose ? localStorage.setItem("favoritesCats", JSON.stringify(this.favorites)) :
        localStorage.setItem("favoritesDogs", JSON.stringify(this.favorites))
      destination = "favorite"
    }

    if (destination === "like" && this.choose) {
      console.log(this.animal.name);
      
      this.serviceCount.getLikeCats() ? this.animalLike = this.serviceCount.getLikeCats() : this.animalLike = []
      if (this.animalLike.length) {
        let index = this.animalLike.findIndex((e: { name: any; }) => e.name === this.animal.name);
        console.log('index', index)

        if (index > -1) {

          this.animalLike[index].like++
          console.log('this.animalLike[index].like++', this.animalLike[index].like++)
          this.serviceCount.addLikeCats(this.animalLike)
        }
      } 
        this.animal.like++
        console.log('this.animal.like++', this.animal.like++)
        this.animalLike.push({ 'name': this.animal.name, 'like': this.animal.like, 'disLike': this.animal.disLike })
        this.serviceCount.addLikeCats(this.animalLike)
      
    }

    if (destination === "like" && !this.choose) {
      this.serviceCount.getLikeDogs() ? this.animalLike = this.serviceCount.getLikeDogs() : this.animalLike = []
      if (this.animalLike.length) {
        let index = this.animalLike.findIndex((e: { name: any; }) => e.name === this.animal.name);

        if (index > -1) {
          this.animalLike[index].like++
          this.serviceCount.addLikeDogs(this.animalLike)
        }
      } else {
        this.animal.like++
        this.animalLike.push({ 'name': this.animal.name, 'like': this.animal.like, 'disLike': this.animal.disLike })
        this.serviceCount.addLikeDogs(this.animalLike)
      }
    }

    if (destination === "disLike" && this.choose) {
      this.serviceCount.getLikeCats() ? this.animalLike = this.serviceCount.getLikeCats() : this.animalLike = []
      if (this.animalLike.length) {
        console.log('sdf');
        
        let index = this.animalLike.findIndex((e: { name: any; }) => e.name === this.animal.name);

        if (index > -1) {
          this.animalLike[index].disLike++
          this.serviceCount.addLikeCats(this.animalLike)
        }
      } else {
        console.log('qq');
        
        this.animal.disLike++
        this.animalLike.push({ 'name': this.animal.name, 'like': this.animal.like, 'disLike': this.animal.disLike })
        this.serviceCount.addLikeCats(this.animalLike)
      }
    }

    if (destination === "disLike" && !this.choose) {
      this.serviceCount.getLikeDogs() ? this.animalLike = this.serviceCount.getLikeDogs() : this.animalLike = []
      if (this.animalLike.length) {
        let index = this.animalLike.findIndex((e: { name: any; }) => e.name === this.animal.name);

        if (index > -1) {
          this.animalLike[index].dislike++
          this.serviceCount.addLikeDogs(this.animalLike)
        }
      } else {
        this.animal.dislike++
        this.animalLike.push({ 'name': this.animal.name, 'like': this.animal.like, 'disLike': this.animal.disLike })
        this.serviceCount.addLikeDogs(this.animalLike)
      }
    }

    this.votingActions.push(new VotingAction(destination));
  }

 changeImage(event:string) {
   this.choose ? this.animals = this.service.cats : this.animals = this.service.dogs
   this.num = this.animals.findIndex((e: any) => e.name === this.breed)
event === 'next' ? this.num++ :this.num--
if (this.num < 0) { this.num = this.service.cats.length - 1 }
if (this.num > this.service.cats.length - 1) { this.num = 0 }
    this.animalImage = this.animals[this.num].image
    this.breedName = this.animals[this.num].name
    this.breed = this.animals[this.num].name
    this.service.chooseAnimal = this.animals[this.num]
   this.animal = this.animals[this.num]
    this.animalId = this.animals[this.num].id
  }
}
