export class AnimalClass {

    id: string;
    name: string;
    image: string;
    like?: number
    dislike?: number

    constructor(name: string, id: string, image: string, like: number = 0, dislike: number = 0) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.like = like;
        this.dislike = dislike;
    }
}