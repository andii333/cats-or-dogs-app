import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FavoritesCatsComponent } from './components/favorite-cat/favorites-cats.component';
import { FavoritesDogsComponent } from './components/favorites-dogs/favorites-dogs.component';
import { VotingActionComponent } from './components/voting-action/voting-action.component';
import { VotingComponent } from './components/voting/voting.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CatsListResolver } from './resolvers/cats-list.resolver';
import { DogsListResolver } from './resolvers/dogs-list.resolver';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'search/:breed', component: VotingComponent, resolve: { catsList: CatsListResolver, dogsList: DogsListResolver },
    children:[
      { path: ':id', component: VotingActionComponent, }
    ]
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
