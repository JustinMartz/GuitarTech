import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private url = environment.baseUrl + 'api/guitars';

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

  indexByUser(): Observable<Guitar[]> {
    return this.http.get<Guitar[]>(this.url + "/users", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.indexByUser(): error retrieving Guitar list: ' + err
          )
        );
      })
    );
  }
}
