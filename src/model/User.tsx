export default class User {
    id: number;
    name: string;

    constructor(params: User = {} as User) {
        this.id = params.id;
        this.name = params.name;
    }
}