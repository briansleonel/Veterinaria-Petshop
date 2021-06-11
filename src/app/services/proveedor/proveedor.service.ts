import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
