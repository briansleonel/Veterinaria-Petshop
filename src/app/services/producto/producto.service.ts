import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';

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

  get(nombreProd: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(),
      params : {
        nombre : nombreProd
      }
    }

    return this.http.get(this.urlBase, httpOptions)
  }

  getProducto(id:string):Observable<any>{
    let options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlBase+id, options);
  }
}
