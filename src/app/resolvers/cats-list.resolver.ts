import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AnimalDictionary } from '../inrefaces/animal';
import { FromFirestoreService } from '../services/from-fairestore.service';

@Injectable({
  providedIn: 'root'
})
export class CatsListResolver implements Resolve<AnimalDictionary> {
  constructor(private fromFairebase:FromFirestoreService){}
  resolve(): Promise<AnimalDictionary> {
    return this.fromFairebase.getCatsList();
  }
}
