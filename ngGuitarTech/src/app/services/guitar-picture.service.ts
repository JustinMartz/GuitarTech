import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { GuitarPicture } from '../models/guitar-picture';

@Injectable({
  providedIn: 'root'
})
export class GuitarPictureService {

  private url = environment.baseUrl + 'api/guitars/pictures';

  constructor(private http: HttpClient, private authServ: AuthService) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  indexByUser(): Observable<GuitarPicture[]> {
    return this.http.get<GuitarPicture[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarPictureService.indexByUser(): error retrieving pictures: ' + err
          )
        );
      })
    );
  }
}
