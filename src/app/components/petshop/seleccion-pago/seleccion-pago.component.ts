import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/models/pago/pago';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-seleccion-pago',
  templateUrl: './seleccion-pago.component.html',
  styleUrls: ['./seleccion-pago.component.css']
})
export class SeleccionPagoComponent implements OnInit {

  pago: Pago;

  constructor(
    private router: Router,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    this.pago = new Pago();
  }

  continuar(): void {
    this.ventaService.venta.pago = this.pago;
    this.calcularTotal();
    this.ventaService.venta.pago.iva = 0;
    this.ventaService.venta.pago.precioNeto = this.ventaService.venta.pago.precioTotal;
    this.router.navigate(['carrito-compra/select-envio'])
  }

  volver(): void {
    this.router.navigate(['carrito-compra'])
  }

  calcularTotal(): void {
    var precioTotal = 0;
    this.ventaService.venta.productos.forEach(element => {
      precioTotal += element.precioVenta;
    })
    this.ventaService.venta.pago.precioTotal = precioTotal;
  }

}
