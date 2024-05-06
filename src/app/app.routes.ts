import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ClientComponent } from './components/client/client.component';
import { FactureComponent } from './components/facture/facture.component';

export const routes: Routes = [

    {path: '', component: AccueilComponent},
    {path: 'produit', component: ProduitComponent},
    {path: 'client', component: ClientComponent},
    {path: 'facture', component: FactureComponent}


];
