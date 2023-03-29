export interface Animal {
  id: number;
  name: string;
  image: string;
  like?: number
  dislike?: number
  wikipediaUrl?: string;
  description?: string;
}

export interface AnimalDictionary {
 [id: number]: Animal
}
