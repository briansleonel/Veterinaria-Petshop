import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  listaProductos:Array<Producto>;
  precioTotal:number;
  constructor(
    private router: Router,
    private ventaService:VentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listaProductos = new Array<Producto>();
    //console.log(this.ventaService.listaProductos[0]);
    this.listaProductos = this.ventaService.venta.productos;
    this.precioTotal = 0;
    this.calcularPrecio();
  }


  continuarCompra(): void {
    if(this.listaProductos.length > 0)
      this.router.navigate(['carrito-compra/select-pago'])
    else
      this.toastr.error("No posee productos en su carrito para realizar la compra", "CARRITO VACÍO")
  }

  calcularPrecio():void{
    this.listaProductos.forEach(element => {
      this.precioTotal = this.precioTotal + element.precioVenta;
    });
  }

  deleteProduct(prod:Producto):void{
    this.listaProductos = this.listaProductos.filter(producto => producto != prod);
    this.ventaService.venta.productos = this.listaProductos;
    this.precioTotal = 0;
    this.calcularPrecio();
    this.toastr.info('Se ha quitado el producto seleccionado de su carrito', "PRODUCTO QUITADO")
  }

  goToSHop(): void {
    this.router.navigate(['tienda'])
  }

}
