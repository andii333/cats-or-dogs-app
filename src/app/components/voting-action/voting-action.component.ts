import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Animal } from 'src/app/inrefaces/animal';
import { FromFirestoreService } from 'src/app/services/from-fairestore.service';
import { VotingComponent } from '../voting/voting.component';

@Component({
  selector: 'app-voting-action',
  templateUrl: './voting-action.component.html',
  styleUrls: ['./voting-action.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingActionComponent implements OnInit, OnDestroy {

  animal$: Observable<Animal> = this.serviceFromFirestore.animal$;
  animals$: Observable<Animal[]> = this.serviceFromFirestore.animals$;
  subscriptions = new Subscription;
  date: Date = new Date();
  animalId: number;
  favorite!:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceFromFirestore: FromFirestoreService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      this.serviceFromFirestore.search(+params["id"]);
      this.animalId = +params["id"];
       if ( this.serviceFromFirestore.getCatFavorite().findIndex(e => e.id === this.animalId) !== -1) {
        this.favorite = true
       } else {
         this.favorite = false
       }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  search(id: any) {
    this.router.navigate([`search/${this.serviceFromFirestore.type}/${+id.value}`])
  }

  changeImage(event: string) {
    if (event === 'next') {
      this.animalId += 1
      if (this.serviceFromFirestore.type === 'cat' && this.animalId === 68) { this.animalId = 1 }
      if (this.serviceFromFirestore.type === 'dog' && this.animalId === 173) { this.animalId = 1 }
      this.router.navigate([`search/${this.serviceFromFirestore.type}/${this.animalId}`]);
    } else {
      this.animalId -= 1
      if (this.serviceFromFirestore.type === 'cat' && this.animalId === 0) { this.animalId = 67 }
      if (this.serviceFromFirestore.type === 'dog' && this.animalId === 0) { this.animalId = 172 }
      this.router.navigate([`search/${this.serviceFromFirestore.type}/${this.animalId}`])
    }
  }

  toFavorite(animal: Animal): void {
    if (this.serviceFromFirestore.type === 'cat') {
      this.serviceFromFirestore.addToCatFavorite(this.serviceFromFirestore.catDictionary[animal.id]);
    }
    if (this.serviceFromFirestore.type === 'dog') {
      this.serviceFromFirestore.addToDogFavorite(this.serviceFromFirestore.dogDictionary[animal.id]);
    }
    this.favorite = !this.favorite;
  }

  addLike(id: number): void {

   }

  addDislike(id: number): void { }

}
