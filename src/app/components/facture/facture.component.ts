import { Component, ElementRef, OnInit } from '@angular/core';
import { IFacture } from '../../Interfaces/IFacture';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IClient } from '../../Interfaces/IClient';
import { Observable, map } from 'rxjs';
import { IProduit } from '../../Interfaces/IProduit';


@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.scss'
})
export class FactureComponent implements OnInit {
  factures: IFacture[] = [];
  factureForm: FormGroup = new FormGroup({});
  editMode: boolean = false;
  editedFactureId: string = '';
  clients: IClient[] = [];
  currentPage: number = 1;
  facturesPerPage: number = 15;
  produits: IProduit[] = [];
  selectedProduct: IProduit | undefined;

  constructor(private fb: FormBuilder, private apiService: ApiService, private elementRef: ElementRef) { 
    this.factureForm = this.fb.group({
      dateEmission: ['', Validators.required],
      client: ['', Validators.required],
      prix: ['', Validators.required],
      estPayee: [false],
      produit: ['']
    });
  }

  ngOnInit(): void {
    this.loadFactures();
    this.loadClients();
    this.loadProduits();
    this.initFactureForm();
  }

  initFactureForm(): void {
    this.factureForm = this.fb.group({
      dateEmission: ['', Validators.required],
      client: ['', Validators.required],
      prix: ['', Validators.required],
      estPayee: [false],
      produit: ['']
    });
  }

  getPaginatedFactures(): IFacture[] {
    const startIndex = (this.currentPage - 1) * this.facturesPerPage;
    const endIndex = startIndex + this.facturesPerPage;
    return this.factures.slice(startIndex, endIndex);
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFactures(); 
    }
  }
  
  nextPage() {
    const maxPage = Math.ceil(this.factures.length / this.facturesPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.loadFactures(); 
    }
  }
  
  onPageSizeChange(event: any) {
    this.facturesPerPage = parseInt(event.target.value, 10); 
    this.currentPage = 1; 
    this.loadFactures(); 
  }
  

  loadFactures(): void {
    this.apiService.getFactures().subscribe((data: any) => {
      this.factures = data;
      this.factures.sort((a: IFacture, b: IFacture) => {
        return new Date(b.dateEmission).getTime() - new Date(a.dateEmission).getTime();
      });
    });
  }

  loadClients(): void {
    this.apiService.getClients().subscribe((clientData: any) => {
      this.clients = clientData;
    });
  }

  loadProduits(): void {
    this.apiService.getProduits().subscribe((produitData: any) => {
      this.produits = produitData;
    });
  }
  getClientName(clientId: string): string {
    const client = this.clients.find(c => c._id === clientId);
    return client ? `${client.nom} ${client.prenom}` : 'Client inconnu';
  }

  getProductName(productId: string): string {
    const product = this.produits.find(p => p._id === productId);
    return product ? product.nom : 'Produit inconnu';
  }

  updatePrice(event: Event): void {
    const selectedProductId = (event.target as HTMLSelectElement)['value'];
    if (selectedProductId) {
      this.selectedProduct = this.produits.find(p => p._id === selectedProductId);
      if (this.selectedProduct) {
        this.factureForm.patchValue({
          prix: this.selectedProduct.prix
        });
      }
    }
  }
  
  
  
  



  onCancel(): void {
    this.factureForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  editFacture(facture: IFacture): void {
    this.editMode = true;
    if (facture._id !== undefined) {
      this.editedFactureId = facture._id;
      const formElement = this.elementRef.nativeElement.querySelector('.add-facture-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.factureForm.patchValue({
        dateEmission: facture.dateEmission,
        client: facture.client,
        prix: facture.prix,
        estPayee: facture.estPayee,
        produit: facture.produits
      });
    }
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const factureData: IFacture = {
        client: this.factureForm.value.client,
        produits: [this.factureForm.value.produit],
        dateEmission: this.factureForm.value.dateEmission,
        estPayee: this.factureForm.value.estPayee,
        prix: this.factureForm.value.prix,
        creationDate: new Date(),
        modificationDate: new Date(),
        creationUser: 'admin',
        modificationUser: 'admin',
        active: true,
        datePaiement: this.factureForm.value.estPayee ? new Date() : null,
      };
  
      if (this.editMode) {
        this.apiService.updateFacture(this.editedFactureId, factureData).subscribe(
          () => {
            this.editMode = false;
            this.factureForm.reset();
            this.loadFactures();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la facture : ', error);
          }
        );
      } else {
        this.apiService.createFacture(factureData).subscribe(
          () => {
            this.factureForm.reset();
            this.loadFactures();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la facture : ', error);
          }
        );
      }
    } else {
      console.log('Données non valides');
    }
  }
  


  deleteFacture(factureId: string): void {
    this.apiService.deleteFacture(factureId).subscribe(
      (response) => {
        this.loadFactures();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la facture : ', error);
      }
    );
  }

  
} 