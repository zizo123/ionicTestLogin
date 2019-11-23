

export interface IEchange {
    id?: number;
    dateEchange?: Date;
}

export class Echange implements IEchange {
    constructor(public id?: number, public dateEchange?: Date) {}
}
