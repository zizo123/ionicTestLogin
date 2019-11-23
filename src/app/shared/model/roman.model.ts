import {Personne} from './personne.model';

export interface IRoman {
    id?: number;
    nom?: string;
    auteur?: string;
    personnes?: Array<Personne>;
}

export class Roman implements IRoman {
    constructor(public id?: number, public nom?: string, public auteur?: string, public personnes?: Array<Personne>) {}
}
