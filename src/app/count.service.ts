import { Injectable } from "@angular/core";


@Injectable()
export class CountService {
    chooseAnimalType = true;

    getLike() {
        if (this.chooseAnimalType) {
            return JSON.parse(localStorage.getItem("likesCat") as string)
        } else {
            return JSON.parse(localStorage.getItem("likesDog") as string)
        }

    }
    addLike(event: []) {
        if (this.chooseAnimalType) {
            localStorage.setItem("likesCat", JSON.stringify(event))
        } else {
            localStorage.setItem("likesDog", JSON.stringify(event))
        }
    }
}