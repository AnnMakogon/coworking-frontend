import { Component, OnInit } from '@angular/core';
import { CredentialUser } from 'src/app/dto/CredentialUser';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workspace-map',
  templateUrl: './create-workspace-map.component.html',
  styleUrls: ['./create-workspace-map.component.scss']
})
export class CreateWorkspaceMapComponent implements OnInit {

  persUser: CredentialUser;
  map: any;

  currentCoordinates: { lat: number; lng: number } | null = null;

  currentAddress: string = "";
  currentBalloon: any = null;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {
    this.persUser = new CredentialUser();
  }

  ngOnInit() {
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    this.loadMap();
  }

  loadMap(): void {
    console.log("loadMap");
    if (typeof (window as any).ymaps != 'undefined') {
      (window as any).ymaps.ready(() => {
        this.map = new (window as any).ymaps.Map('createWorkspaceMap', {
          center: [51.660652, 39.200059],
          zoom: 12,
          controls: []
        });
        this.map.setType('yandex#map');   //инициализация

        const zoomControl = new (window as any).ymaps.control.ZoomControl({
          options: {
            position: {
              top: 'auto',
              bottom: '50px',
              left: 'auto',
              right: '10px'
            }
          }
        });
        this.map.controls.add(zoomControl);

        this.map.events.add('click', async (event: any) => {
          const coords = event.get('coords');

          try {
            this.currentAddress = await this.getAddressFromCoordinates(coords[0], coords[1]);
            this.currentCoordinates = { lat: coords[0], lng: coords[1] };
            this.changeDetectorRef.detectChanges();
            console.log("Address: " + this.currentAddress + "\n Coordinates: " + this.currentCoordinates);

            if (this.currentBalloon) {
              this.map.geoObjects.remove(this.currentBalloon);
            }

            this.currentBalloon = new (window as any).ymaps.Placemark(coords);
            this.map.geoObjects.add(this.currentBalloon);
          } catch (error) {
            console.error('Ошибка геокодирования: ' + error)
          }
        })
      })
    }
  }

  async getAddressFromCoordinates(lat: number, lng: number): Promise<string> { //для получения адреса, async для того, чтобы не стирался объект карты, иначе гет получит ошибку
    try {
      const coordString = `${lat},${lng}`;
      const res = await (window as any).ymaps.geocode(coordString);
      const firstGeoObject = res.geoObjects.get(0);
      return firstGeoObject ? firstGeoObject.getAddressLine() : 'Адрес не найден';
    } catch (error) {
      throw error;
    }
  }

  saveAddress() {
    console.log("Save Address: " + this.currentAddress);
    this.router.navigate(['createWorkspace', this.currentAddress,
      this.currentCoordinates?.lat,
      this.currentCoordinates?.lng]);
  }

  cancel() {
    this.router.navigate(['map/myWorkspaces']);
  }

}
