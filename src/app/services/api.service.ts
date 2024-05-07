import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFacture } from '../Interfaces/IFacture';
import { IProduit } from '../Interfaces/IProduit';
import { IClient } from '../Interfaces/IClient';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private apiRoutes: any = {
    api: "https://projetynovapi.onrender.com/api",
    clients: "https://projetynovapi.onrender.com/client",
    factures: "https://projetynovapi.onrender.com/facture",
    produits: "https://projetynovapi.onrender.com/produit"
  };

 // Route Api  ------------------------------------------------------------------------

  public getModelData() {
    const url = `${this.apiRoutes.api}/modeldata`;
    return this.http.get(url);
  }

  // Route Clients  ------------------------------------------------------------------------

  public getClients() {
    return this.http.get(this.apiRoutes.clients);
  }

  public createClient(clientData: IClient) {
    return this.http.post(this.apiRoutes.clients, clientData);
  }

  public getClientById(clientId: string) {
    const url = `${this.apiRoutes.clients}/${clientId}`;
    return this.http.get(url);
  }

  public updateClient(clientId: string, clientData: IClient) {
    const url = `${this.apiRoutes.clients}/${clientId}`;
    return this.http.put(url, clientData);
  }

  public deleteClient(clientId: string) {
    const url = `${this.apiRoutes.clients}/${clientId}`;
    return this.http.delete(url);
  }


  // Routes produits  ------------------------------------------------------------------------

  public createProduit(produitData: IProduit) {
    return this.http.post(this.apiRoutes.produits, produitData);
  }

  public getProduits() {
    return this.http.get(this.apiRoutes.produits);
  }

  public getProduitById(produitId: string) {
    const url = `${this.apiRoutes.produits}/${produitId}`;
    return this.http.get(url);
  }

  public updateProduit(produitId: string, produitData: IProduit) {
    const url = `${this.apiRoutes.produits}/${produitId}`;
    return this.http.put(url, produitData);
  }

  public deleteProduit(produitId: string) {
    const url = `${this.apiRoutes.produits}/${produitId}`;
    return this.http.delete(url);
  }


  // Routes factures  ------------------------------------------------------------------------

  public createFacture(factureData: IFacture) {
    return this.http.post(this.apiRoutes.factures, factureData);
  }

  public getFactures() {
    return this.http.get(this.apiRoutes.factures);
  }

  public getFactureById(factureId: string) {
    const url = `${this.apiRoutes.factures}/${factureId}`;
    return this.http.get(url);
  }

  public updateFacture(factureId: string, factureData: IFacture) {
    const url = `${this.apiRoutes.factures}/${factureId}`;
    return this.http.put(url, factureData);
  }

  public deleteFacture(factureId: string) {
    const url = `${this.apiRoutes.factures}/${factureId}`;
    return this.http.delete(url);
  }
}
