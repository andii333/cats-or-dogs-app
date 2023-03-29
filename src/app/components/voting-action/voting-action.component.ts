import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Animal } from 'src/app/inrefaces/animal';
import { FromFirestoreService } from 'src/app/services/from-fairestore.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-voting-action',
  templateUrl: './voting-action.component.html',
  styleUrls: ['./voting-action.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingActionComponent implements OnInit, OnDestroy {

  animal$: Observable<Animal> = this.fromFirestoreService.animal$;
  animals$: Observable<Animal[]> = this.fromFirestoreService.animals$;
  subscriptions = new Subscription;
  date: Date = new Date();
  animalId: number;
  favorite!: boolean;
  like = 0;
  dislike = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fromFirestoreService: FromFirestoreService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      this.fromFirestoreService.search(+params["id"]);
      this.animalId = +params["id"];
      if (this.fromFirestoreService.type === 'cat') {this.catFavorite()} else {this.dogFavorite()};
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  search(id: any) {
    this.router.navigate([`search/${this.fromFirestoreService.type}/${+id.value}`])
  }

  changeImage(event: string) {
    if (event === 'next') {
      this.animalId += 1
      if (this.fromFirestoreService.type === 'cat' && this.animalId === 68) { this.animalId = 1 }
      if (this.fromFirestoreService.type === 'dog' && this.animalId === 173) { this.animalId = 1 }
      this.router.navigate([`search/${this.fromFirestoreService.type}/${this.animalId}`]);
    } else {
      this.animalId -= 1
      if (this.fromFirestoreService.type === 'cat' && this.animalId === 0) { this.animalId = 67 }
      if (this.fromFirestoreService.type === 'dog' && this.animalId === 0) { this.animalId = 172 }
      this.router.navigate([`search/${this.fromFirestoreService.type}/${this.animalId}`])
    }
  }

  catFavorite():void{
    if (this.storageService.getCatFavorite().findIndex(cat => cat.id === this.animalId) !== -1) {
      this.favorite = true
    } else {
      this.favorite = false
    }
    const like = this.storageService.getCatFavorite().find(animal => animal.id === this.animalId)?.like
    like ? this.like = like : this.like = 0;
    const dislike = this.storageService.getCatFavorite().find(animal => animal.id === this.animalId)?.dislike
    dislike ? this.dislike = dislike : this.dislike = 0;
  }

  dogFavorite():void{
    if (this.storageService.getDogFavorite().findIndex(dog => dog.id === this.animalId) !== -1) {
      this.favorite = true
    } else {
      this.favorite = false
    }
    const like = this.storageService.getDogFavorite().find(animal => animal.id === this.animalId)?.like
    like ? this.like = like : this.like = 0;
    const dislike = this.storageService.getDogFavorite().find(animal => animal.id === this.animalId)?.dislike
    dislike ? this.dislike = dislike : this.dislike = 0;
  }

  toFavorite(animal: Animal): void {
    if (this.fromFirestoreService.type === 'cat') {
      this.storageService.addToCatFavorite(this.fromFirestoreService.catDictionary[animal.id]);
    }
    if (this.fromFirestoreService.type === 'dog') {
      this.storageService.addToDogFavorite(this.fromFirestoreService.dogDictionary[animal.id]);
    }
    this.favorite = !this.favorite;
  }

  addLike(id: number, like: string): void {
    if (this.fromFirestoreService.type === 'cat') {
      const cats = this.storageService.getCatFavorite()
      const index = cats.findIndex(cat => cat.id === id);
      if (like === 'like') {
        if (cats[index].like) { (cats[index].like as number) += 1 } else { cats[index].like = 1 }
      }
      if (like === 'dislike') {
        if (cats[index].dislike) { (cats[index].dislike as number) += 1 } else { cats[index].dislike = 1 }
      }
      this.storageService.updateCatFavorite(cats)
    } else {
      const dogs = this.storageService.getDogFavorite()
      const index = dogs.findIndex(dog => dog.id === id);
      if (like === 'like') {
        if (dogs[index].like) { (dogs[index].like as number) += 1 } else { dogs[index].like = 1 }
      }
      if (like === 'dislike') {
        if (dogs[index].dislike) { (dogs[index].dislike as number) += 1 } else { dogs[index].dislike = 1 }
      }
      this.storageService.updateDogFavorite(dogs)
    }
    if (like === 'like') { this.like += 1 } else { this.dislike += 1 }
  }

}
