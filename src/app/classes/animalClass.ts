export class AnimalClass {

    id: string;
    name: string;
    image: string;
    like?: number
    dislike?: number
    wikipedia_url?: string;
    description?: string;
    constructor(
        name: string, id: string, image: string, like: number = 0, dislike: number = 0, wikipedia_url?: string,
        description?: string
        ) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.like = like;
        this.dislike = dislike;
        this.wikipedia_url = wikipedia_url ;
        this.description = description;
    }
}