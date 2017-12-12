import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../app/http.service';
import * as Moment from 'moment';
import { Species, Breeds, PetInterface } from 'pet-entity';
@Component({
  selector: 'new-pet',
  templateUrl: 'new-pet.html',
  styleUrls: ['new-pet.css']
})
export class NewPetComponent {
  private name: string;
  private birthDate: string;
  private breed: number;
  private species: number;
  private status: number;

  private speciesList: Array<string>;
  private breedsList: Array<string>;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor (private http: HttpService, private router: Router) {
    this.error = false;
    this.speciesList = Species.getList();
  }

  onSpeciesChange () {
    this.breedsList = Breeds.getList()[this.species];
  }

  submit () {
    let pet: PetInterface = {
      id: undefined,
      created: undefined,
      updated: undefined,
      name: this.name,
      birthDate: Moment(this.birthDate).valueOf(),
      breed: this.breed,
      species: this.species,
      status: this.status
    };
    this.http.submitPet(pet)
      .subscribe((result: number) => {
        this.router.navigate(['pets']);
        return;
      },
      (err) => {
        this.error = true;
        this.errorTitle = 'Error!';
        this.errorMessage = 'We have encountered a server error, please try again later.';
        return;
      });
  }
}
