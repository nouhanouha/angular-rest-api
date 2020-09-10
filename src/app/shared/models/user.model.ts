export class User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address : {
        street : string,
        city: string,
        zip: string
    };
    age: number;
}