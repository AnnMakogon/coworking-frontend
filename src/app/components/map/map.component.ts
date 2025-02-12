import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import { map } from 'rxjs/operators';
import { CredentialUser } from 'src/app/dto/CredentialUser';
import { NavigationEnd, Router } from '@angular/router';
import { CoordinatService } from 'src/app/services/coord.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() addressSelected = new EventEmitter<string>(); //подписка на событие EventEmitter

  map: any;
  isDropWindowVisible: boolean = false;
  persUser: CredentialUser;
  private subscription: any; //временная точка для изменения координат

  private currentPoint: any = null;
  constructor(private mapService: MapServiceService,
    private router: Router,
    private coordService: CoordinatService,
    private authService: AuthService
  ) {
    this.persUser = new CredentialUser();
  }

  onAddressSelected(address: string) {
    this.coordService.changeAddress(address);
  }

  ngOnInit(): void {
    console.log("Map works");
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/map/myWorkspaces') { //отслеживаем, если переходим именно сюда, то очистка карты и заново загрузить
        this.clearMapPoints();
        this.addPointsToMap();
      }
    });
    sessionStorage.setItem("editW", JSON.stringify(false));
    this.loadMap();
    const userData = sessionStorage.getItem("0");
    if (userData) {
      this.persUser = JSON.parse(userData);
    }
    console.log(this.persUser.role);
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

        //далее все для постановки временной точки
        this.map.events.add('click', (event: any) => {
          if (sessionStorage.getItem("editW") == "true") {
            const coords = event.get('coords');
            let addressW = "";
            this.getAddressFromCoordinates(coords[0], coords[1]).then((address: string) => {
              addressW = address;
              console.log('Address: ', address);

              const coordData = { lat: coords[0], lng: coords[1], address: addressW };
              this.coordService.updateCoordinates(coordData);
              console.log(coords[0], " - ", coords[1], " address: ", addressW); // здесь новый адрес уже

              this.addressSelected.emit(addressW);

              const balloon = new (window as any).ymaps.Balloon({
                content: `Coordinates: ${coords[0]}, ${coords[1]}<br>Address: ${addressW}`,
                closeButton: false
              });

              balloon.open(this.map, coords);

            }).catch((error: any) => {
              console.error('Ошибка при геокодировании:', error);
            });

            //удаление изначальной точки
            const idToRemove = sessionStorage.getItem("idEditWorkspace");
            if (idToRemove) {
              const geoObjectCount = this.map.geoObjects.getLength();
              let existPoint = null;
              for (let i = 0; i < geoObjectCount; i++) {
                const geoObject = this.map.geoObjects.get(i);
                if (geoObject.properties.get('id') + '' === idToRemove) {
                  existPoint = geoObject;
                  break;
                }
              }

              if (existPoint) {
                this.map.geoObjects.remove(existPoint);
                console.log(`Remove point with id: ${idToRemove}`);
              }

            }

            if (this.currentPoint) {
              this.currentPoint.geometry.setCoordinates(coords);
            } else {
              this.currentPoint = new (window as any).ymaps.Placemark(coords, {
                balloonContent: `Coordinates: ${coords[0]}, ${coords[1]}`,
                properties: {
                  id: sessionStorage.getItem("idEditWorkspace")
                }
              });
              this.map.geoObjects.add(this.currentPoint);
            }
          }
        });

      });
    }
  }
  // установка изначальных всех точек
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

  dropDownWindow(): void {
    this.isDropWindowVisible = !this.isDropWindowVisible;
  }

  getProtectedData() {
    return this.mapService.getProtectedResource().pipe(
      map(data => {
        return data.map((item: { latitude: any; longitude: any; id: any; }) => [item.latitude, item.longitude, item.id,]);
      })
    );
  }

  clearMapPoints(): void {
    console.log("Clear Map Points");
    if (this.map) {
      this.map.geoObjects.removeAll(); // Удаляем все объекты с карты
    }
    this.currentPoint = null;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log("LOGOUT");
      this.router.navigate(['/login']);
    })
  }

  createWorkspace(): void {
    console.log("router navigate create Workspace");
    this.router.navigate(['/createWorkspaceMap']);
  }

  myBookings(): void {
    this.router.navigate(['/myBookingsMap/']);
  }

}
