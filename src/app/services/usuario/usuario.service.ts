import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase:string= "http://localhost:3000/api/usuario/";
  constructor(
    private http: HttpClient
  ) { }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this.http.post(this.urlBase + 'login', body, httpOption);
  }
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("userId");
  }
  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }
  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }
  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public clientLogged(): boolean{
    if (sessionStorage.getItem("rol") == "cliente") {
      return  true;
    }
    return false;
  }

  get(nombre: string, apellido: string, tipoUsuario: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(),
      params : {
        nombre : nombre,
        apellido : apellido,
        tipoUsuario: tipoUsuario
      }
    }
    return this.http.get(this.urlBase, httpOptions)
  }

  getUsuario(id:string):Observable<any>{
    let options = {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlBase+id, options);
  }

  addUsuario(usuario:Usuario):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.urlBase, body, option);

  }

  updateUsuario(usuario:Usuario):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(usuario);
    return this.http.put(this.urlBase+usuario._id, body, option);
  }

  deleteUsuario(usuario:Usuario):Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.delete(this.urlBase+usuario._id, option);
  }

  validarUsername(username: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: {
      }
    }
    return this.http.get(this.urlBase + "validar/" + username, options);
  }
}
