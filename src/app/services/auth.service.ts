import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/auth.response.data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { autoLogout } from '../auth/state/auth.actions';
import { SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, 
              private store: Store<AppState>) {}

  getUserAuthorities(): Observable<AuthResponseData> {
    return this.http.get<AuthResponseData>(``);
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      ``, // TODO: Add URL
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      ``, // TODO: Add URL
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    let expirationDate;
    if (data.expiresIn !== undefined) {
      expirationDate = new Date(
        new Date().getTime() + +data.expiresIn * 1000
      );
    }
    const user = new User(
      data.name,
      data.firstName,
      data.lastName,
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  formatSocialUser(data: SocialUser) {
    const user = new User(
      data.name,
      data.firstName,
      data.lastName,
      data.email,
      data.idToken,
      data.id,
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    if (user.getExpireDate !== undefined) {
      const expirationDate = user.getExpireDate.getTime();
      const timeInterval = expirationDate - todaysDate;
  
      this.timeoutInterval = setTimeout(() => {
        this.store.dispatch(autoLogout());
        //logout functionality or get the refresh token
      }, timeInterval);
    }
  }

  getUserFromLocalStorage() : User | null {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.name,
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
