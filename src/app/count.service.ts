import { Injectable } from "@angular/core";


@Injectable()
export class CountService{
getLikeCats(){
 return  JSON.parse(localStorage.getItem("likesCat") as string)
}
addLikeCats(event:[]){
    localStorage.setItem("likesCat", JSON.stringify(event))
}

getLikeDogs(){
 return  JSON.parse(localStorage.getItem("likesDog") as string)
}
addLikeDogs(event:[]){
    localStorage.setItem("likesDog", JSON.stringify(event))
}
}