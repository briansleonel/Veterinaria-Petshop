import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  urlBase:string = "http://localhost:3000/api/proveedor/";
  constructor(
    private http: HttpClient
  ) { }

  get(nombreProveedor: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(),
      params : {
        nombre : nombreProveedor
      }
    }
    return this.http.get(this.urlBase, httpOptions)
  }
  
  getProveedores():Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlBase, option);
  }

  getProveedor(id: string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlBase + id, option);
  }


  addProveedor(proveedor:Proveedor):Observable<any>{

    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(proveedor);
    return this.http.post(this.urlBase, body, option);

  }

  updateProveedor(proveedor:Proveedor):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(proveedor);
    return this.http.put(this.urlBase+proveedor._id, body, option);
  }

  deleteProveedor(proveedor:Proveedor):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.delete(this.urlBase+proveedor._id, option);
  }
}
