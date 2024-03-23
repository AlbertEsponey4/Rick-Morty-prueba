import { Component, Input } from '@angular/core';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;

  constructor() { }
}
