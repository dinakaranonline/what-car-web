import { Injectable } from '@angular/core';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { Observable, of } from 'rxjs';
import { LOGIN_MOCKS } from 'src/app/security/login-mocks';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();

  constructor() { }

  // tslint:disable-next-line:one-line
  login(entity: AppUser ): Observable<AppUserAuth>{

    this.resetSecurityObject();

    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(user => user.userName.toLowerCase() ===
                               entity.userName.toLowerCase()));
    if (this.securityObject.userName !== "") {
      // Store into local storage
      localStorage.setItem("bearerToken",
         this.securityObject.bearerToken);
    }
  
    return of<AppUserAuth>(this.securityObject);

   
  }


  logout(): void {

    return this.resetSecurityObject();

  }

  resetSecurityObject(): void {

    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
  
    this.securityObject.canAccessCars = false;
    this.securityObject.canAddCars = false;
    this.securityObject.canSaveCars = false;

    localStorage.removeItem("bearerToken");

  }
}
