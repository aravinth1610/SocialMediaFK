import { Injectable } from '@angular/core';
import { LoginModal } from '../modal/login-modal';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstant } from '../constant/app-constant';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenType } from '@angular/compiler';
import { JwtTokenModal } from '../modal/jwt-token-modal';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtServices = new JwtHelperService();

  constructor(private httpClient: HttpClient, private toast: NgToastService) { }

  login(loginModal: LoginModal): Observable<void | HttpErrorResponse> {
    return this.httpClient.post<LoginModal>(environment.apiUrl + AppConstant.LOGIN_API_URL, loginModal, { observe: 'response' })
      .pipe(map((data: any) => {
        this.storeTokenInCache(data.headers.get('Jwt-Token'));
      }));
  }


  storeTokenInCache(authToken: string): void {
    if (authToken != null && authToken != '') {
      localStorage.setItem('authToken', authToken);
    }
  }

  getAuthTokenFromCache(): string {
    return localStorage.getItem('authToken');
  }
  isUserLoggedIn(): boolean {

    const authToken = this.getAuthTokenFromCache();
    console.log(authToken);
    if (authToken != null && authToken != '') {
      if (this.getAuthUsername() != null) {
        return true;
      }
    }
    return false;
  }

  getAuthUser(): JwtTokenModal {
    const authToken = this.getAuthTokenFromCache()
    const authUser = this.jwtServices.decodeToken(authToken);
    if (this.isTokenExpired(authToken)) {
      const jwtTokenModal = new JwtTokenModal();
      jwtTokenModal.username = authUser.sub;
      jwtTokenModal.role = authUser.authorities;
      return jwtTokenModal;
    } else {
      return null;
    }
  }

  getAuthUsername(): string {
    const authToken = this.getAuthTokenFromCache();
    const authId = this.jwtServices.decodeToken(authToken).sub;
    if (this.isTokenExpired(authToken)) {
      return authId;
    } else {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    return !this.jwtServices.isTokenExpired(token);
  }

  showSuccess(successMessage: string) {
    this.toast.success({ detail: "SUCCESS", summary: successMessage, duration: 5000, position: 'topCenter' });
  }

  showError(errorMessage: string) {
    this.toast.error({ detail: "ERROR", summary: errorMessage, duration: 5000, sticky: true, position: 'topCenter' });

  }

}
