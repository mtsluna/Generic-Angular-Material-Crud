import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class GenericService <S> {

  BASE_URL = 'http://localhost:8088/api/v1/';

  constructor(private http: HttpClient, @Inject(String) private readonly url: string) {
    this.url = url;
    this.http = http;
  }

  getAllWithPagination(page : number = 0, size : number = 5, sortAtribute : string = '', sortDirection : string = ''){
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    if(sortAtribute != '' && sortDirection != ''){
      params = params.append('sort', sortAtribute+','+sortDirection)
    }

    return this.http.get<Response<S[]>>(this.BASE_URL+this.url, {
      params: params
    });
  }

  getById(id: number): Observable<S> {
    return this.http.get<S>(this.BASE_URL+this.url+'/'+id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.BASE_URL+this.url+'/'+id);
  }

  putById(id: number, object: S): Observable<S>{
    return this.http.put<S>(this.BASE_URL+this.url+'/'+id, object);
  }

  post(object: S): Observable<S>{
    return this.http.post<S>(this.BASE_URL+this.url, object);
  }

}
