import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ProduitComponent } from './components/produit/produit.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FactoryTarget } from '@angular/compiler';
import { FactureComponent } from './components/facture/facture.component';
import { NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
        ClientComponent,
        ProduitComponent,
        AccueilComponent,
        FactureComponent,
        NgIf]
})
export class AppComponent {
  title = 'ProjetYnovFront';

  section: string = 'accueil';

  switchSection(sectionName: string): void {
    this.section = sectionName;
  }
}
