import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { ServiceService } from '../service.service';
import { AnimalClass } from './animalClass';
import { VotingAction } from './voting-action/voting-action';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit, AfterContentChecked {

  animal: AnimalClass;
  animals: AnimalClass[];
  animalImage: string;
  animalId: string;
  breed: string;
  breedName: string;
  choose:boolean = this.serviceCount.chooseAnimalType;
  count:number = 0;
  favorites: AnimalClass[];
  favoritesCats: AnimalClass[];
  favoritesDogs: AnimalClass[];
  myDate: Date = new Date();
  num: number;
  votingActions: VotingAction[] = [];


  constructor(public service: ServiceService,
    public serviceCount: CountService,
    private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("favoritesCats") != null ) {
      this.favoritesCats = JSON.parse(localStorage.getItem("favoritesCats") as string)
    } else {
      this.favoritesCats = []
    }
    if (localStorage.getItem("favoritesDogs") != null ) {
      this.favoritesDogs = JSON.parse(localStorage.getItem("favoritesDogs") as string)
    } else {
      this.favoritesDogs = []
    }
    this.chooseAnimal("cat")
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  chooseAnimal(event: string) {
    if (event === "cat") {
      this.animals = this.service.cats;
      this.serviceCount.chooseAnimalType = true
      this.choose = true
    } else {
      this.animals = this.service.dogs;
      this.serviceCount.chooseAnimalType = false
      this.choose = false
    }
  }

  search() {
    this.animal = this.animals.filter((e: any) => e.name === this.breed)[0]
    if (this.serviceCount.getLike()) {
      const index = this.serviceCount.getLike().findIndex((e: { name: string; }) => e.name === this.animal.name);

      if (index > -1) {
        this.animal.like = this.serviceCount.getLike()[index].like
        this.animal.dislike = this.serviceCount.getLike()[index].dislike
      }

    }
    this.animal.like = 0;
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

    if (destination === "like") {
      let countLike: any;
      let index;
      let arr;
      if (this.serviceCount.getLike()) {
        countLike = this.serviceCount.getLike();
        index = countLike.findIndex((e: { name: any; }) => e.name === this.animal.name);
        if (index > -1) {
          countLike[index].like++;
          this.serviceCount.addLike(countLike);
        } else {
          countLike.push(new AnimalClass(this.animal.name, '', '', 1, this.animal.dislike));
          this.serviceCount.addLike(countLike);
        }
      } else {
        countLike = [];
        countLike.push(
          new AnimalClass(this.animal.name, '', '', 1, this.animal.dislike))
        this.serviceCount.addLike(countLike)
      }
    }

    if (destination === "dislike") {
      let countLike: any;
      let index;
      if (this.serviceCount.getLike()) {
        countLike = this.serviceCount.getLike();
        index = countLike.findIndex((e: { name: any; }) => e.name === this.animal.name);
        if (index > -1) {
          countLike[index].dislike++;
          this.serviceCount.addLike(countLike);
        } else {
          countLike.push(new AnimalClass(this.animal.name, '', '', this.animal.like, 1));
          this.serviceCount.addLike(countLike);
        }
      } else {
        countLike = [];
        countLike.push(
          new AnimalClass(this.animal.name, '', '', this.animal.like, 1))
        this.serviceCount.addLike(countLike)
      }
    }

    this.votingActions.push(new VotingAction(destination));
  }

  changeImage(event: string) {
    this.choose ? this.animals = this.service.cats : this.animals = this.service.dogs
    this.num = this.animals.findIndex((e: any) => e.name === this.breed)
    event === 'next' ? this.num++ : this.num--
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
