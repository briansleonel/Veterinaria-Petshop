import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:Producto;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.cargarDatos();
  }

  cargarDatos():void{
    this.activatedRoute.params.subscribe(
      params =>{
      this.productoService.getProducto(params.id).subscribe(
        result=>{
          Object.assign(this.producto, result);
          console.log(result);
          console.log(this.producto);
        },
        error=>{
          console.log(error);
        }
      )
      }
    )   
  }
}
