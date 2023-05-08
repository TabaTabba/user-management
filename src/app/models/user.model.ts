export class User{
    id?: number;
    email?: string;
    personalId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    category?: string;
    status?: string;
    [key: string]: any;
}