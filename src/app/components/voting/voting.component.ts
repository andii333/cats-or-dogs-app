import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FromFirestoreService } from 'src/app/services/from-fairestore.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription;
  cats: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceFromFirestore: FromFirestoreService,
    ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe(params => {
      this.serviceFromFirestore.chooseAnimals(params["breed"])
      this.serviceFromFirestore.search(1)
      params["breed"] === 'cat' ? this.cats = true : this.cats = false;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  chooseAnimals(type: string) {
    this.serviceFromFirestore.type = type;
    type === 'cat' ? this.cats = true : this.cats = false;
    this.router.navigate([`search/${type}/1`]);
  }

}
