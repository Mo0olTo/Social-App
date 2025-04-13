import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }


  userPic:BehaviorSubject<string> = new BehaviorSubject('')




  signUp(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}users/signup`,data)
  } 

  signIn(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}users/signin`,data)
  }
  changePassword(data:object):Observable<any>{
    return this.httpClient.patch(`${environment.baseUrl}users/change-password`, data)
  }

  uploadProfilePhoto(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('photo', file);
    return this.httpClient.put(`${environment.baseUrl}users/upload-photo`,formData)
  }

  getLoggedUserData():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}users/profile-data`)
  }





}
