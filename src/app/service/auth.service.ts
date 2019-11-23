import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../shared/model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private host = 'http://localhost:8383';
  apiUrl = 'http://localhost:8383/apiV2/';
  private jwtToken: string;
  private roles: Array<any> = [];
  
  constructor(private http: HttpClient) { }

  login(user) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/login', user, {observe: 'response'});
  }

  register(user) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/api/users', user);
  }
  updateUserDetails(data) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    this.http.put(this.host + '/api/users' , {
      headers: new HttpHeaders({authorization: this.jwtToken})
    }).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
      console.log(result);
    });
  }
  saveToken(jwtToken) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
    const jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }
  removeRomanToUser(romanTodDelete) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    this.http.delete(this.host + '/api/roman/' + romanTodDelete.id, {
      headers: new HttpHeaders({authorization: this.jwtToken})
    }).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
      console.log(result);
    });
  }
  getRomans() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/api/roman', {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  getPosts() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/api/posts', {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  getListEchange() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/api/echanges', {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  addRomanToUser(username , romanEval) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const data = {username, romanEval};
    this.http.post(this.host + '/api/addRomanToUser' , data , {
      headers: new HttpHeaders({authorization: this.jwtToken})
    }).subscribe((result) => {
      // This code will be executed when the HTTP call returns successfully
      console.log(result);
    });
  }
  getPersonnes() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/api/users', {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }

  saveTask(task) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    return this.http.post(this.host + '/api/personnes', task, {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  saveRoman(roman) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.host + '/api/roman', roman, {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
    return this.jwtToken;
  }
  getCurrentUsername() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
      return user.sub;
    }
  }
  getCurrentUserRomans() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/api/getRomanOfUser/' + this.getCurrentUsername(), {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }
  logout() {
    this.roles = [];
    localStorage.removeItem('token');
  }
  getUsers() {
    return this.http.get<User[]>(this.apiUrl + 'users', {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }

  deleteUser(userId: number) {
    return this.http.delete(this.apiUrl + 'user/' + userId, {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }

  addUser(user: User) {
    console.log(user);
    return this.http.post(this.apiUrl + 'user/', user , {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }

  editUser(user: User) {
    console.log(user);
    return this.http.put(this.apiUrl + 'user/', user , {
      headers: new HttpHeaders({authorization: this.jwtToken})
    });
  }

  isAdmin() {
    let adm = false;
    for (const r of this.roles) {
      if (r.authority === 'ADMIN') {
        adm = true;
        console.log('la valeur de adm :');
        console.log(adm);
        return adm;
      }
    }
    return false;
  }
}
