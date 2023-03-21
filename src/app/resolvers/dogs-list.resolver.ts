import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Animal, AnimalDictionary } from '../inrefaces/animal';
import { FromFirestoreService } from '../services/from-fairestore.service';

@Injectable({
  providedIn: 'root'
})
export class DogsListResolver implements Resolve<AnimalDictionary> {
  constructor(private fromFairebase: FromFirestoreService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<AnimalDictionary> {
    return this.fromFairebase.getDogsList();
  }
}
