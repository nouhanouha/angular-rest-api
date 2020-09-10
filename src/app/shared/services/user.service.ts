import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.baseUrl}/users`);
  }

  createUser(user: User){
    return this.http.post(`${this.baseUrl}/user`, user)
  }
  updateUser(user: User, id: number){
    return this.http.put(`${this.baseUrl}/user/${id}`, user)
  }
  remove(id: number){
    return this.http.delete(`${this.baseUrl}/user/${id}`)
  }
}
