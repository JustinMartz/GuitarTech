import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Setup } from '../models/setup';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetupService {
  private url = environment.baseUrl + 'api/setups';

  private primarySetupsList: Setup[] = [new Setup()];

  constructor(private http: HttpClient, private authServ: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authServ.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  indexByUser(): Observable<Setup[]> {
    return this.http.get<Setup[]>(this.url + "/users", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'SetupService.indexByUser(): error retrieving Setup list: ' + err
          )
        );
      })
    );
  }

  indexBySortedDate(): Observable<Setup[]> {
    return this.http.get<Setup[]>(this.url + "/sorted", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'SetupService.indexBySortedDate(): error retrieving Setups: ' + err
          )
        );
      })
    );
  }

  indexByTuning(tuningId: number): Observable<Setup[]> {
    return this.http.get<Setup[]>(this.url + "/tunings/" + tuningId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
              'SetupService.indexByTuning(): error retrieving Setups: ' + err
          )
        );
      })
    );
  }

  create(newSetup: Setup): Observable<Setup> {
    return this.http.post<Setup>(this.url, newSetup, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'SetupService.create(): error creating Setup: ' + err )
        );
      })
    );
  }

  loadSetups(setups: Setup[]) {
    this.primarySetupsList = setups;
  }

  clearSetups() {
    this.primarySetupsList = [];
  }

  get setupsList(): Setup[] {
    return this.primarySetupsList;
  }
}
