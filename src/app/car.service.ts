import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { Car } from './car';
import { CARS } from './mock-cars';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})



export class CarService {
   
   constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private carsUrl = 'api/cars'; 

  

  private log(message: string) {
  this.messageService.add('CarService: ' + message);
  }  

   getCars(): Observable<Car[]>{
    /* this.messageService.add('CarService : fetched CARS');
    return of(CARS); */
    return this.http.get<Car[]>(this.carsUrl)
    .pipe(
      tap(cars => this.log('fetched cars')),
      catchError(this.handleError('getCars', []))
    );
  }

  getCar(id: number): Observable<Car>{
    /* this.messageService.add(`Car Service:fetched Car id=${id}`);
    return of(CARS.find(car => car.id ===id)); */
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  updateCar (car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

  addCar (car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, httpOptions).pipe(
      tap((car: Car) => this.log(`added car w/ id=${car.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }

  deleteCar (car: Car | number): Observable<Car> {
    const id = typeof car === 'number' ? car : car.id;
    const url = `${this.carsUrl}/${id}`;
  
    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }

  
searchCars(term: string): Observable<Car[]> {
  if (!term.trim()) {
    // if not search term, return empty car array.
    return of([]);
  }
  return this.http.get<Car[]>(`${this.carsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found cars matching "${term}"`)),
    catchError(this.handleError<Car[]>('searchCars', []))
  );
}
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
