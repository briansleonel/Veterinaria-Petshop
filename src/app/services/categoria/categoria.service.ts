import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlbase:string="http://localhost:3000/api/categoria/"

  constructor(private http:HttpClient) {
  }

  getCategorias():Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlbase, option);
  }

  getCategoria(id: string):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlbase + id, option);
  }

  addCategoria(categoria:Categoria):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(categoria);
    return this.http.post(this.urlbase, body, option);

  }

  updateCategoria(categoria:Categoria):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({

      })
    }
    let body = JSON.stringify(categoria);
    return this.http.put(this.urlbase+categoria._id, body, option);
  }

  deleteCategoria(categoria:Categoria):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.delete(this.urlbase+categoria._id, option);
  }

  getCategoriaByTipos(categoria: Categoria): Observable<any> {
    const option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlbase+categoria.tipoMascota+'/'+categoria.tipoProducto, option)
  }
}
