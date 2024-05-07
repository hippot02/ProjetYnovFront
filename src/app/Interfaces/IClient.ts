export interface IClient {
    _id?: string;
    nom: string;
    prenom: string;
    adresseMail:string;
    creatinDate: Date;
    modificationDate: Date;
    creationUser: string;
    modificationUser: string;
    active:boolean;
    
} 