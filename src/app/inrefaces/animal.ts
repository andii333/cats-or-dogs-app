export interface Animal {
  id: number;
  name: string;
  image: string;
  like?: number
  dislike?: number
  wikipedia_url?: string;
  description?: string;
}

export interface AnimalDictionary {
 [id: number]: Animal
}
