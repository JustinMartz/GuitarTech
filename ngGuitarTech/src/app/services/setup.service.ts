import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Setup } from '../models/setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  private url = environment.baseUrl + 'api/setups';

  private primarySetupsList: Setup[] = [new Setup()];

  constructor() { }

}
