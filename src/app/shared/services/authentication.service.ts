import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(email, password){
    return this.http.post(`${this.baseUrl}/login`, { email : email, password: password });
  }


}
