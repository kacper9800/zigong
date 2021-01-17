import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = '/api/users';

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  getUser(id: number) {
    return this.http.get(this.token.getBaseUrlForUser() + this.usersUrl, httpOptions);
  }

  getAllUsers() {
    return this.http.get(this.token.getBaseUrlForUser() + this.usersUrl, httpOptions);
  }
}
