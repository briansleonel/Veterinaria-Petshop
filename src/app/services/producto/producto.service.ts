import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlBase:string = "http://localhost:3000/api/producto/";
  constructor(
    private http: HttpClient
  ) { }

  getProductos():Observable<any>{
    let options = {
      headers:new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlBase,options);
  }

  getProducto(id:string):Observable<any>{
    let options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlBase+id, options);
  }
}
