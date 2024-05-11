import { IClient } from "./IClient";
import { IProduit } from "./IProduit";

export interface IFacture {
    _id?: string;
    client: IClient;
    dateEmission: Date;
    estPayee: boolean;
    datePaiement?: Date | null;
    prix: number;
    produit: Array<IProduit>;
    creationDate: Date;
    modificationDate: Date;
    creationUser: string;
    modificationUser: string;
    active: boolean;
}