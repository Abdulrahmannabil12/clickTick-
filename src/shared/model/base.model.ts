export class Base {
    id: number;
    active: boolean;
    IsDeleted: boolean;
    CreateDate: Date;

    constructor() {
        this.id = 0;
        this.active = true;
        this.IsDeleted = false;
        this.CreateDate = new Date();
    }
}
