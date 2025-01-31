import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinatService {

  private addressSourse = new BehaviorSubject<string>('');
  currentAddress = this.addressSourse.asObservable();

  private coordinatesSource = new BehaviorSubject<{lat: number | null; lng: number | null; address: string}>({lat: null, lng: null, address: ""});
  currentCoordinates = this.coordinatesSource.asObservable();

  updateCoordinates(coords: {lat: number | null; lng: number | null; address: string}) {
    this.coordinatesSource.next(coords);
  }

  constructor() { }

  changeAddress(address: string) {
    this.addressSourse.next(address);
  }
}
