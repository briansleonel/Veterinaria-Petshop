import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pago } from 'src/app/models/pago/pago';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-seleccion-pago',
  templateUrl: './seleccion-pago.component.html',
  styleUrls: ['./seleccion-pago.component.css']
})
export class SeleccionPagoComponent implements OnInit {

  pago: Pago;

  tarjeta: {
    nroTarjeta,
    fullName,
    fechaExpiracion,
    codigoSeguridad,
    dni
  }

  constructor(
    private router: Router,
    private ventaService: VentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pago = new Pago();
    this.initTarjeta();
  }

  initTarjeta(): void {
    this.tarjeta.nroTarjeta = '';
    this.tarjeta.fullName = '';
    this.tarjeta.fechaExpiracion = '';
    this.tarjeta.codigoSeguridad = '';
    this.tarjeta.dni = '';
  }

  continuar(): void {
    if (this.pago.formaPago != undefined){
        this.continuarCompra();
    } else {
      this.toastr.warning("Debe seleccionar una forma de pago", '¡ATENCIÓN!')
    }
  }

  continuarCompra(): void {
    this.ventaService.venta.pago = this.pago;
    this.calcularTotal();
    this.ventaService.venta.pago.iva = 0;
    this.ventaService.venta.pago.precioNeto = this.ventaService.venta.pago.precioTotal;
    this.router.navigate(['carrito-compra/select-envio']);
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

  isTarjet(): boolean {
    if(this.pago.formaPago == 'Tarjeta de crédito' || this.pago.formaPago == 'Tarjeta de débito')
      return true;
    else 
      return false;
  }

  isValidTarjeta(): boolean {
    if(this.tarjeta.nroTarjeta == undefined && this.tarjeta.fullName == undefined && this.tarjeta.fechaExpiracion == undefined &&
    this.tarjeta.codigoSeguridad == undefined && this.tarjeta.dni == undefined)
      return false;
    else
      return true;
  }

}
