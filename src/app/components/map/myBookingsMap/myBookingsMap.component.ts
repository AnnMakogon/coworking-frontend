import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CredentialUser } from 'src/app/dto/CredentialUser';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-myBookingsMap',
  templateUrl: './myBookingsMap.component.html',
  styleUrls: ['./myBookingsMap.component.scss']
})
export class MyBookingsMapComponent implements OnInit {
 persUser: CredentialUser;
  map: any;

  constructor(private router: Router,
              private mapService: MapServiceService
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

  cancel() {
    this.router.navigate(['map/myWorkspaces']);
  }

  loadMap(): void {
    console.log("loadMap");
    if (typeof (window as any).ymaps != 'undefined') {
      (window as any).ymaps.ready(() => {
        this.map = new (window as any).ymaps.Map('map', {
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
        this.map.controls.add(zoomControl); //контроллер зума

        this.addPointsToMap(); // установка всех точек
      });
    }
  }

  private addPointsToMap(): void {
    this.getProtectedData().subscribe(data => { //точки на карте (все)
      console.log(data);
      const points: number[][] = [];
      points.push(...data);

      points.forEach((item) => {
        const coords = [item[0], item[1]];
        const id = item[2];
        const placemark = new (window as any).ymaps.Placemark(coords, {
          balloonContent: `This is point with id ${id}`
        });
        placemark.properties.set('id', id);
        this.map.geoObjects.add(placemark);
        placemark.events.add('click', () => {
          console.log('Enter to point with coord ' + coords);
        });
      });
    }
    );
  }

    getProtectedData() {
      return this.mapService.getConcretePoint(this.persUser.id).pipe(  //сюда попадает bookings со всеми внутреностями
        map(data => {
          return data.content.map((item: any) => [item.table.workspace.latitude, item.table.workspace.longitude, item.id,]);
        })
      );
    }

}
