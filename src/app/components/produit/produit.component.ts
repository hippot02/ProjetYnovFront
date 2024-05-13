import { Component, ElementRef, OnInit } from '@angular/core';
import { IProduit } from '../../Interfaces/IProduit';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IFacture } from '../../Interfaces/IFacture';
import { IClient } from '../../Interfaces/IClient';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent implements OnInit {
  produits: IProduit[] = [];
  produitForm: FormGroup = new FormGroup({});
  editMode: boolean = false;
  editedProduitId: string = '';
  factures: IFacture[] = [];
  currentPage: number = 1;
  produitPerPage: number = 15;

  constructor(private fb: FormBuilder, private apiService: ApiService, private elementRef: ElementRef) {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      stock: ['', Validators.required],
      photo: ['', Validators.required],
      prix: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProduits();
    this.initProduitForm();
  }

  initProduitForm(): void {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      stock: ['', Validators.required],
      photo: ['', Validators.required],
      prix: ['', Validators.required]
    });
  }

  getPaginatedproduit(): IProduit[] {
    const startIndex = (this.currentPage - 1) * this.produitPerPage;
    const endIndex = startIndex + this.produitPerPage;
    return this.produits.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const maxPage = Math.ceil(this.produits.length / this.produitPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }

  onPageSizeChange(event: any) {
    this.produitPerPage = parseInt(event.target.value, 10); 
    this.currentPage = Math.floor((this.currentPage - 1) * (this.produitPerPage / this.produits.length)) + 1; 
  }


  loadProduits(): void {
    this.apiService.getProduits().subscribe((data: any) => {
      this.produits = data;
    });
  }

  loadFactures(): void {
    this.apiService.getFactures().subscribe((data: any) => {
      this.factures = data;
    });
  }

  onCancel(): void {
    this.produitForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  

  editProduit(produit: IProduit): void {
    this.editMode = true;
    if (produit._id !== undefined) {
      this.editedProduitId = produit._id;
      const formElement = this.elementRef.nativeElement.querySelector('.add-produit-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.produitForm.patchValue({
        nom: produit.nom,
        stock: produit.stock,
        photo: produit.photo,
        prix: produit.prix
      });
    } else {
      console.error('L\'ID du produit est undefined.');
    }
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      const produitData: IProduit = {
        nom: this.produitForm.value.nom,
        stock: this.produitForm.value.stock,
        photo: this.produitForm.value.photo,
        prix: this.produitForm.value.prix,
        creationDate: new Date(),
        modificationDate: new Date(),
        creationUser: 'admin',
        modificationUser: 'admin',
        active: true,
        factures: []
      };

      if (this.editMode) {
        this.apiService.updateProduit(this.editedProduitId, produitData).subscribe(
          () => {
            this.editMode = false;
            this.produitForm.reset();
            this.loadProduits();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du produit : ', error);
          }
        );
      } else {
        this.apiService.createProduit(produitData).subscribe(
          () => {
            console.log('Produit ajouté avec succès.');
            this.produitForm.reset();
            this.loadProduits();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du produit : ', error);
          }
        );
      }
    } else {
      console.log('Données non valides');
    }
  }

  deleteProduit(produitId: string): void {
    this.apiService.deleteProduit(produitId).subscribe(
      () => {
        console.log('Produit supprimé avec succès.');
        this.loadProduits();
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit : ', error);
      }
    );
  }
}