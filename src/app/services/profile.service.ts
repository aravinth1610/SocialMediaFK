import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConstant } from '../constant/app-constant';
import { Observable } from 'rxjs';
import { UserModal } from '../modal/user-modal';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getUserById(userId: string): Observable<UserModal | HttpErrorResponse> {
    return this.httpClient.get<UserModal | HttpErrorResponse>(`${environment.apiUrl}${AppConstant.POST_API_URL}${22}`);
  }

  getUserPost(userId: string, currentPage: number, pageSize: number) {
    const reqParams = new HttpParams().set('page', currentPage).set('size', pageSize);
    return this.httpClient.get(`${environment.apiUrl}${AppConstant.POST_API_URL}${userId}/post`, { params: reqParams });

  }

}
