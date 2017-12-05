import { Component } from '@angular/core';
@Component({
  selector: 'pet',
  templateUrl: 'pet.html',
  styleUrls: ['pet.css']
})
export class PetComponent {
  private name: string;
  private age: string;
  private breed: number;
  private species: number;
  private status: number;
}
