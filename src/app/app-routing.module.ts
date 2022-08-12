import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesCatsComponent } from './favorite/favorites-cats.component';
import { FavoritesDogsComponent } from './favorites-dogs/favorites-dogs.component';
import { VotingComponent } from './voting/voting.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent , 
  },
  {
    path: 'voting', component: VotingComponent , 
  },
  {
    path: 'favorites-dogs', component: FavoritesDogsComponent , 
  },
  {
    path: 'favorites-cats', component: FavoritesCatsComponent , 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [WelcomeComponent, VotingComponent, FavoritesCatsComponent, FavoritesDogsComponent]