import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './voting/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { VotingActionComponent } from './voting/voting-action/voting-action.component';
import { MatSelectModule } from '@angular/material/select';
import { CountService } from './count.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    VotingActionComponent,
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
  providers: [ServiceService, CountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
