import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/pago/pago';
import { Producto } from 'src/app/models/producto/producto';
import { Venta } from 'src/app/models/venta/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  //listaProductos:Array<Producto>;

  venta: Venta;

  urlBase:string = "http://localhost:3000/api/venta";
  constructor(
    private _http: HttpClient
  ) { 
    this.init();
  }

  init(): void {
    this.venta = new Venta;
    this.venta.productos = new Array<Producto>();
    this.venta.pago = new Pago;
    //this.listaProductos = new Array<Producto>();
  }

  addVenta(venta: Venta): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    }

    const body = {
      fecha : new Date(),
      medioEnvio : venta.medioEnvio,
      productos : venta.productos,
      pago : venta.pago
    }

    return this._http.post(this.urlBase, body, httpOptions);
  }

}
