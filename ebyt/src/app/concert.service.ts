import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Concert } from './concert';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
	providedIn: 'root'
})

export class ConcertService {
	
	private concerts: Concert[];
	
	url = 'http://localhost:8070/concert';	
	httpOptions = {
		headers: new HttpHeaders({'Content-type': 'application/json'}),
		reportProgress: true
	};
	
	constructor(private http: HttpClient, private router: Router) {
	}
	
	// La on met les méthodes qui discutent avec le back
	
	addConcert(concert : Concert){
		this.http.post(this.url + '/', concert, this.httpOptions).subscribe(() => this.router.navigate(['/']));
	}
	
	updateConcert(concert : Concert){
		this.http.put(this.url + '/' + concert.id, concert, this.httpOptions).subscribe( () => this.router.navigate(['/admin/concerts']));
	}
	
	getConcert(id : number) : Observable<Concert>{
		return this.http.get<Concert>(this.url + '/' + id, this.httpOptions);
	}
	
	getConcerts() : Observable<Array<Concert>>{
		return this.http.get<Array<Concert>>(this.url + '/all', this.httpOptions);
	}
	
	deleteConcert(id: number): Observable<any> {
		return this.http.delete(this.url + "/" + id, this.httpOptions);
	}
	
	getFameConcerts() : Observable<Array<Concert>>{
		return this.http.get<Array<Concert>>(this.url + '/fame', this.httpOptions);
	}
	
	getLastConcerts() : Observable<Array<Concert>>{
		return this.http.get<Array<Concert>>(this.url + '/last', this.httpOptions);
	}
	
	concertCount() : Observable<number> {
		return this.http.get<number>(this.url + '/count', this.httpOptions);
	}
	
	search(name?:string, artist?:string, date?:Date, place?:string, priceMax?:number, active?:boolean, pageNumber?:number, pageSize?:number ) : Observable<Array<Concert>> {
		
		let optionsParams = 
		{ 	params: new HttpParams(),
			headers: new HttpHeaders({'Content-type': 'application/json'}),
			reportProgress: true
		};
		console.log(optionsParams);
		if (name) {
			optionsParams.params = optionsParams.params.set('name', name);
		}
		if (artist) {
			optionsParams.params = optionsParams.params.set('artist',artist);
		}
		if (date) {
			optionsParams.params = optionsParams.params.set('date', date.toString());
		}
		if (place) {
			optionsParams.params = optionsParams.params.append('place', place);
		}
		if (priceMax < 200) {
			optionsParams.params = optionsParams.params.set('priceMax', priceMax.toString());
		}
		if (active) {
			optionsParams.params = optionsParams.params.set('active', active.toString());
		}
		optionsParams.params = optionsParams.params.set('pageNumber', "1");
		optionsParams.params = optionsParams.params.set('pageSize', "10");
		
		if (sessionStorage.getItem('role') === "ROLE_ADMIN") {
			return this.http.get<Array<Concert>>(this.url + '/getAllAdmin', optionsParams);
		} else {
			console.log("coucou c mwa");
			return this.http.get<Array<Concert>>(this.url + '/getAll', optionsParams);
		}
	}
	
	addImage(data: FormData) {
		//TODO: A faire
		
	}
}
