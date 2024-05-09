import { Component, ElementRef } from '@angular/core';
import { IClient } from '../../Interfaces/IClient';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  clients: IClient[] = [];
  currentPage: number = 1;
  clientsPerPage: number = 15;
  clientForm: FormGroup = new FormGroup({});
  editMode: boolean = false;
  editedClientId: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private elementRef: ElementRef) { 
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresseMail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.initClientForm();
  }

  initClientForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresseMail: ['', [Validators.required, Validators.email]]
    });
  }

  loadClients(): void {
    this.apiService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

  getPaginatedClients(): IClient[] {
    const startIndex = (this.currentPage - 1) * this.clientsPerPage;
    const endIndex = startIndex + this.clientsPerPage;
    return this.clients.slice(startIndex, endIndex);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const maxPage = Math.ceil(this.clients.length / this.clientsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }

  onPageSizeChange(event: any) {
    this.clientsPerPage = parseInt(event.target.value, 10); 
    this.currentPage = Math.floor((this.currentPage - 1) * (this.clientsPerPage / this.clients.length)) + 1; 
  }

  onCancel(): void {
    this.clientForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  editClient(client: IClient): void {
    this.editMode = true;
    if (client._id !== undefined) {
      this.editedClientId = client._id;
      console.log('ID du client en cours d\'édition :', this.editedClientId);
      const formElement = this.elementRef.nativeElement.querySelector('.add-client-form');
      if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
      this.clientForm.patchValue({
        nom: client.nom,
        prenom: client.prenom,
        adresseMail: client.adresseMail
      });
    } else {
      console.error('L\'ID du client est undefined.');
    }
  }
  

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData: IClient = {
        nom: this.clientForm.value.nom,
        prenom: this.clientForm.value.prenom,
        adresseMail: this.clientForm.value.adresseMail,
        creationDate: new Date(),
        modificationDate: new Date(),
        creationUser: 'admin',
        modificationUser: 'admin',
        active: true
      };

      if (this.editMode) {
        this.apiService.updateClient(this.editedClientId, clientData).subscribe(
          () => {
            this.editMode = false;
            this.clientForm.reset();
            this.loadClients();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du client : ', error);
  
            console.error('Détails de l\'erreur : ', error.message);
          }
        );
      } else {
        this.apiService.createClient(clientData).subscribe(
          () => {
            console.log('Client ajouté avec succès.');
            this.clientForm.reset();
            this.loadClients();
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du client : ', error);
          }
        );
      }
    } else {
      console.log('Données non valides');
    }
  }
  deleteClient(clientId: string): void {
    this.apiService.deleteClient(clientId).subscribe(
      (response) => {
        console.log('Client supprimé avec succès.');
        this.loadClients();
      },
      (error) => {
        console.error('Erreur lors de la suppression du client : ', error);
      }
    );
  }
}