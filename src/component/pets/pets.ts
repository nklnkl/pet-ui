import { Component } from '@angular/core';
import { Pet } from 'pet-entity';
@Component({
  selector: 'pets',
  templateUrl: 'pets.html',
  styleUrls: ['pets.css']
})
export class PetsComponent {
  private pets: Array<Pet>;
}
