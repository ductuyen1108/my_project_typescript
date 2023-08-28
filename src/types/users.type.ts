export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        geolocation: {
            lat: string;
            long: string;
        };
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
    phone: string;
}

export type Users = Pick<User, 'email' | 'phone' | 'name' | 'address'>[];
export type UserInfo = Pick<User, 'id' | 'address' | 'email' | 'name' | 'phone'>;
