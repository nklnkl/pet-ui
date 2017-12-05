import { Component } from '@angular/core';
@Component({
  selector: 'new-pet',
  templateUrl: 'new-pet.html',
  styleUrls: ['new-pet.css']
})
export class NewPetComponent {
  private name: string;
  private age: string;
  private breed: number;
  private species: number;
  private status: number;
}
