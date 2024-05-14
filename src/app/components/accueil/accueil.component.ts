import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SpaService } from '../../services/spa.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {


  constructor(private spaService: SpaService) {}

  redirectTo(section: string): void {
    this.spaService.changeSection(section);
  }
}
