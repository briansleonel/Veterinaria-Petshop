import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-proximos-vencimientos',
  templateUrl: './proximos-vencimientos.component.html',
  styleUrls: ['./proximos-vencimientos.component.css']
})
export class ProximosVencimientosComponent implements OnInit {

  productos:Array<Producto>;
  fechaActual: Date;
  cantidadDias: number;

  constructor(private router:Router,
              private productoService: ProductoService
            ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  iniciarVariables(){
    this.productos = new Array<Producto>();
    this.fechaActual = new Date();
  }

  cargarProductos(){
    this.iniciarVariables();
    this.fechaActual.setDate(this.fechaActual.getDate() + 10);
    this.productoService.get("","").subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          if(producto.fechaVencimiento != null){
            var fechaVencimiento = Date.parse(producto.fechaVencimiento.toString());
            if( fechaVencimiento.valueOf() < this.fechaActual.valueOf()){
              this.productos.push(producto);
          }}
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  cargarProductosPorDias(){
    this.iniciarVariables();
    this.fechaActual.setDate(this.fechaActual.getDate() + this.cantidadDias);
    this.productoService.get("","").subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          if(producto.fechaVencimiento != null){
            var fechaVencimiento = Date.parse(producto.fechaVencimiento.toString());
            if( fechaVencimiento.valueOf() < this.fechaActual.valueOf()){
              this.productos.push(producto);
          }}
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  limpiarFiltro(filtro: NgModel){
    filtro.reset();
    this.cargarProductos();
  }


}
