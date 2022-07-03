import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { LoginDTO, RegisterDTO, User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  springBaseUrl : string = "http://localhost:4200/users/"
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(loginData: LoginDTO) {
    // TODO Chiamare il servizio per l'autenticazione e salvare l'utente corrente nel localStorage
    const response: User = {
      name: "Paolino",
      surname: "Paperino",
      username: "paolino504"
    };

    localStorage.setItem("user", JSON.stringify(response));

    return of('login ok');
  }

  register(registerData: Partial<RegisterDTO>) {
    // TODO Chiamare il servizio per la registrazione e redirigere l'utente alla root per il login
    return this.httpClient.post<RegisterDTO>("http://localhost:82", registerData);
    //this.router.navigateByUrl("/");
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
}
