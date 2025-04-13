import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ICreatPost } from '../../../shared/interfaces/icreat-post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient:HttpClient) { }

  creatPost(data:FormData):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}posts`,data)
  }

  getAllPosts(page:number):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}posts?limit=50&page=${page}`)
  }

  getUserPosts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}users/${userId}/posts`)
  }

  getSinglePost(postId:string|null):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}posts/${postId}`)
  }

  updatePost(postId:string , data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}posts/${postId}`, data)
  }
  deletePost(postId:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}posts/${postId}`)
  }
}
