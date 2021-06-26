import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productos: Array<Producto>;
  fechaActual: Date;
  vencimientos: boolean = false;

  constructor(
    private ventaService: VentaService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarProductos()
  }

  habilitarCarrito():boolean{
    if(this.ventaService.venta.productos.length!=0)
      return true;
    else
      return false;
  }

  iniciarVariables(){
    this.productos = new Array<Producto>();
    this.fechaActual = new Date();
    this.fechaActual.setDate(this.fechaActual.getDate() + 10);
  }

  cargarProductos(){
    this.iniciarVariables();
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
          if(this.productos.length > 0){
            this.vencimientos = true;
          }
        });
      },
      error=>{
        console.log(error);
      }
    )
  }
}
