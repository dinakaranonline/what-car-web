import { Component, OnInit } from '@angular/core';


import { Car } from '../car';
import { CarService } from '../car.service';
import { MessageService } from '../message.service'

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[];

  constructor(private carService: CarService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCars();
  }

   getCars():void{
     this.carService.getCars()
      .subscribe(cars=> this.cars = cars);
   }

   add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.carService.addCar({ name } as Car)
      .subscribe(car => {
        this.cars.push(car);
      });
  }

  delete(car: Car): void {
    this.cars = this.cars.filter(c => c !== car);
    this.carService.deleteCar(car).subscribe();
  }
   
}
