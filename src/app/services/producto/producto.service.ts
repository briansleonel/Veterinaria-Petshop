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

  get(nombreProd: string, codigoProd: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(),
      params : {
        nombre : nombreProd,
        codigo : codigoProd
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

  addProducto(producto:Producto):Observable<any>{

    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(producto);
    return this.http.post(this.urlBase, body, option);

  }

  updateProducto(producto:Producto):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(producto);
    return this.http.put(this.urlBase+producto._id, body, option);
  }

  deleteProducto(producto:Producto):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.delete(this.urlBase+producto._id, option);
  }

  validarCodigo(codigo: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: {
      }
    }
    return this.http.get(this.urlBase + "validar/" + codigo, options);
  }
}
