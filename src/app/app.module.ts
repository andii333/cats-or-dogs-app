import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VotingActionComponent } from './components/voting-action/voting-action.component';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from './material/material.module';
import { FromFirestoreService } from './services/from-fairestore.service';
import { VotingComponent } from './components/voting/voting.component';
import { FavoritesDogsComponent } from './components/favorites-dogs/favorites-dogs.component';
import { FavoritesCatsComponent } from './components/favorite-cat/favorites-cats.component';


@NgModule({
  declarations: [
    AppComponent,
    VotingActionComponent,
    VotingComponent,
    FavoritesDogsComponent,
    FavoritesCatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [FromFirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
