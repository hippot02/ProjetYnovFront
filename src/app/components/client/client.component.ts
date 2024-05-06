import { Component } from '@angular/core';
import { IClient } from '../../../Interfaces/IClient';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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
  clientsPerPage: number = 20;
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder,private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadClients();
    this.initClientForm();
  }

  initClientForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required], // Définir les contrôles du formulaire avec FormBuilder
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


  onSubmit(){
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      console.log('Données du client à ajouter : ', clientData);
    }
    else{
      console.log('Données non valides');
    }
  }

}
