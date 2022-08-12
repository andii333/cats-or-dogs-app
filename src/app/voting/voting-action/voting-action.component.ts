import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import { VotingComponent } from '../voting.component';
import { VotingAction } from './voting-action';

@Component({
  selector: 'app-voting-action',
  templateUrl: './voting-action.component.html',
  styleUrls: ['./voting-action.component.css']
})
export class VotingActionComponent implements OnInit {

  @Input()
  votingAction: VotingAction;
  date: Date = new Date();
  catId: any []
  breedName:string

  constructor(public service: ServiceService) {
  }



  ngOnInit(): void {
    this.catId = this.service.chooseAnimal.id
    this.breedName = this.service.chooseAnimal.name
  }

}
