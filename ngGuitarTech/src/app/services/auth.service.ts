import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  constructor(private http: HttpClientModule) { }

  checkLogin(): boolean {
    if (localStorage.getItem('credentials')) {
      return true;
    }

    return false;
  }
}
