import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  user: Partial<User>={};

  springBaseUrl: string = 'http://localhost:8080/users';

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(loginData: LoginDTO) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(loginData.username+":"+loginData.password)
        })
      };

    
    return this.httpClient.get<Partial<LoginDTO>>(`${this.springBaseUrl}/username/${loginData.username}/password/${loginData.password}`, httpOptions);

  }

  saveUser(userData: Partial<User>){
    localStorage.setItem("user", JSON.stringify(userData));
    return of('login ok');
  }

  register(registerData: Partial<RegisterDTO>, fazione?: string) {
    if(fazione!=null){
      registerData.faction=fazione;
    }
    return this.httpClient.post<Partial<RegisterDTO>>(`${this.springBaseUrl}/`, registerData);
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || '') as User;
    return user;
  }

  getAllUser(){
    return this.httpClient.get<User[]>(`${this.springBaseUrl}/`);
  }

  getUserById(id: number){
    return this.httpClient.get<Partial<User>>(`${this.springBaseUrl}/${id}`);
  }
}
