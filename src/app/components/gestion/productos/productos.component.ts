import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos:Array<Producto>;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos():void{
    this.productos = new Array<Producto>();
    for(let i:number = 0; i<=30 ; i++){
      let producto = new Producto("Nombre "+i, 1+(2*i),"Proveedor " +i, "Categoria "+i, 100+(2*i), 100-i,new Date());
      this.productos.push(producto);
    }
  }

  agregarProducto():void{
    this.router.navigate(["productos/alta"]);
  }

}
