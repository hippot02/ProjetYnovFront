export interface IClient {
    nom: string;
    prenom: string;
    adresseMail:string;
    creatinDate: Date;
    modificationDate: Date;
    creationUser: string;
    modificationUser: string;
    active:boolean;
}