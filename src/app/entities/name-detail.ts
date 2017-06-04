export class NameDetail {
    id: number;
    name: string;
    imageUrl: string;
    about: string;
    stars: number;
    ratings: number;

   public toString = (): string => {
        return `(${this.id}): ${this.name} => ${this.imageUrl}`;
    }
}