import { IClient } from "./IClient";
import { IProduit } from "./IProduit";

export interface IFacture {
    client: IClient;
    dateEmission: Date;
    estPayee: boolean;
    datePaiement: Date;
    prix: number;
    produit: Array<IProduit>;
    creationDate: Date;
    modificationDate: Date;
    creationUser: string;
    modificationUser: string;
    active: boolean;
}