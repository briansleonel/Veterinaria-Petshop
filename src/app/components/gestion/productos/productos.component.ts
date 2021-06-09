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
    
    
  }

  agregarProducto():void{
    this.router.navigate(["productos/alta"]);
  }

}
