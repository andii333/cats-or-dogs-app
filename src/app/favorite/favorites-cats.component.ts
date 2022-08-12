import { Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-favorites-cats',
  templateUrl: './favorites-cats.component.html',
  styleUrls: ['./favorites-cats.component.css']
})
export class FavoritesCatsComponent implements OnInit {
  favorites: any
  likes:[]
  like:number
  dislike:number
  favorit:any

  constructor(public service: ServiceService){}
  
  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem(("favoritesCats")) as any)
    console.log(this.favorit);
    this.likes = JSON.parse(localStorage.getItem(("likesCat")) as any)
    console.log('this.likes', this.likes)
    // const index = this.likes.findIndex((e: { name: any; }) => e === this.favorit.name)
  }
  ngOnChanges(): void {
    
  }

  deleteCatfromFavorites(del: any){
    const index = this.favorites.findIndex((e: { name: any; }) => e === del);
    this.favorites.splice(index, 1)
    localStorage.setItem("favoritesCats", JSON.stringify(this.favorites)) 
  }
}
