import { Component, OnInit } from '@angular/core';
import { Pet } from 'pet-entity';
import { HttpService } from '../../app/http.service';
@Component({
  selector: 'pets',
  templateUrl: 'pets.html',
  styleUrls: ['pets.css']
})
export class PetsComponent implements OnInit {
  private pets: Array<Pet>;

  constructor (private http: HttpService) {

  }

  ngOnInit () {
    this.refresh();
  }

  refresh () {
    this.http.getPets()
      .subscribe((pets: Array<Pet>) => {
        this.pets = pets;
      });
  }
}
