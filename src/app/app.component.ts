import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ProduitComponent } from './components/produit/produit.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FactoryTarget } from '@angular/compiler';
import { FactureComponent } from './components/facture/facture.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ClientComponent,
    ProduitComponent,
    AccueilComponent,
    FactureComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProjetYnovFront';
}
