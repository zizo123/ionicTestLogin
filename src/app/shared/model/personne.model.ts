import {Roman} from './roman.model';

export interface IPersonne {
    id?: number;
    nom?: string;
    prenom?: string;
    sexe?: string;
    age?: number;
    ville?: string;
    numero?: string;
    email?: string;
    romans?: Array<Roman>;
}

export class Personne implements IPersonne {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public sexe?: string,
        public ville?: string,
        public age?: number,
        public numero?: string,
        public email?: string,
        public romans?: Array<Roman>
    ) {}
}
