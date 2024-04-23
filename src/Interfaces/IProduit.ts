import { IFacture } from "./IFacture";

export interface IProduit {
    nom: string;
    stock: number;
    photo: string;
    prix: number;
    factures: Array<IFacture>;
    creationDate: Date;
    modificationDate: Date;
    creationUser: string;
    modificationUser: string;
    active: boolean;
}