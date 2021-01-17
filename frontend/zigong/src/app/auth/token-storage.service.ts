import {Injectable} from '@angular/core';
import global from '../../global';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  /* ToDo
  Implement jwt token logic
  */
  getBaseUrlForUser() {
    return global.API;
  }
}
