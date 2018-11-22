import { Component, OnInit } from '@angular/core';
import { Concert } from '../concert';
import { ConcertService } from '../concert.service';
import { PanierServiceService } from '../panier-service.service';

@Component({
  selector: 'app-list-concert',
  templateUrl: './list-concert.component.html',
  styleUrls: ['./list-concert.component.css']
})
export class ListConcertComponent implements OnInit {

  rechercheAvancee: boolean

  concerts: Array<Concert> = new Array();

  constructor( private concertService: ConcertService, private panierService: PanierServiceService ) {
    this.rechercheAvancee = false;
   }

  ngOnInit() {
    this.concertService.getConcerts().subscribe((listeConcert) => {
      this.concerts = listeConcert;
   });
  }

  addPanier(concert: Concert) {
    this.panierService.addPanier(concert);
  }

}
