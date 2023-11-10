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

  private primaryGuitarsList: Guitar[] = [new Guitar()];

  constructor(private http: HttpClient, private authServ: AuthService) { console.log('in GuitarService constructor'); }

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

  update(guitarToUpdate: Guitar): Observable<Guitar> {
    return this.http.put<Guitar>(this.url + '/' + guitarToUpdate.id, guitarToUpdate, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GuitarService.update(): error updating Guitar: ' + err )
        );
      })
    );
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GuitarService.delete(): error utterly destroying Guitar: ' + err )
        );
      })
    );
  }

  create(newGuitar: Guitar): Observable<Guitar> {
    return this.http.post<Guitar>(this.url, newGuitar, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'GuitarService.create(): error creating Guitar: ' + err )
        );
      })
    );
  }

  loadGuitars(guitars: Guitar[]) {
    this.primaryGuitarsList = guitars;
    console.log('guitars loaded in service');
    console.log(this.primaryGuitarsList);
  }

  get guitarsList(): Guitar[] {
    return this.primaryGuitarsList;
  }
}
