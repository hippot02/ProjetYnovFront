import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaService {

  private sectionSource = new BehaviorSubject<string>('accueil');
  currentSection = this.sectionSource.asObservable();

  constructor() { }

  changeSection(section: string) {
    this.sectionSource.next(section);
  }
}
