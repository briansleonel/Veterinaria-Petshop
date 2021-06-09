import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: Array<Producto>;
  page:number;
  constructor(
    private productoService: ProductoService,

  ) { }

  ngOnInit(): void {
    this.cargarCatalogoProductos();
  }

  cargarCatalogoProductos():void{
    this.productos = new Array<Producto>();
    this.productoService.getProductos().subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          this.productos.push(producto);
          console.log(element);
          console.log(producto)
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

}
