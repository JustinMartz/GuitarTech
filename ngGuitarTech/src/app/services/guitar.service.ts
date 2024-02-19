import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar';
import { AuthService } from './auth.service';
import { GuitarPictureService } from './guitar-picture.service';

@Injectable({
  providedIn: 'root'
})
export class GuitarService {
  private url = environment.baseUrl + 'api/guitars';

  private primaryGuitarsList: Guitar[] = [new Guitar()];

  constructor(
    private http: HttpClient,
    private authServ: AuthService) {}

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

  filterByColor(color: string): Observable<Guitar[]> {
    // encode string
    // const queryString = encodeURIComponent(color);
    return this.http.get<Guitar[]>(this.url + "/colors/" + color, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'GuitarService.filterByColor(): error retrieving Guitar list: ' + err
          )
        );
      })
    );
  }

  loadGuitars(guitars: Guitar[]) {
    this.primaryGuitarsList = guitars;
  }

  clearGuitars() {
    this.primaryGuitarsList = [];
  }

  updateGuitarInGuitarList(guitar: Guitar) {
    console.log('updated guitar: ' + JSON.stringify(guitar));
    // this.primaryGuitarsList[guitar.id - 1] = guitar;
    // guitar.picture = pictureFilename;
    const isGuitarId = (element: Guitar) => element.id == guitar.id;
    const guitarIndex = this.primaryGuitarsList.findIndex(isGuitarId);
    this.primaryGuitarsList[guitarIndex] = guitar;
  }

  get guitarsList(): Guitar[] {
    return this.primaryGuitarsList;
  }
}
