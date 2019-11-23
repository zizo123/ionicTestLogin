import {Personne} from './personne.model';
import {Roman} from './roman.model';

export interface ICaracteristicRoman {
    id?: number;
    etat?: string;
    prix?: number;
    photo?: string;
    personne?: Personne;
    roman?: Roman;
}

export class CaracteristicRoman implements ICaracteristicRoman {
    constructor(public id?: number, public etat?: string, public prix?: number, public photo?: string,
                public personne?: Personne, public roman?: Roman) {}
}
