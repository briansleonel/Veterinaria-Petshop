import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  listaProductos:Array<Producto> = new Array<Producto>(); ;
  constructor(

  ) { }
}
