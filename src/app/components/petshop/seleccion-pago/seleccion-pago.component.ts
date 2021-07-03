import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pago } from 'src/app/models/pago/pago';
import { Tarjeta } from 'src/app/models/tarjeta/tarjeta';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-seleccion-pago',
  templateUrl: './seleccion-pago.component.html',
  styleUrls: ['./seleccion-pago.component.css']
})
export class SeleccionPagoComponent implements OnInit {

  pago: Pago;
  tarjeta : Tarjeta;
  constructor(
    private router: Router,
    private ventaService: VentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.pago = new Pago();
    this.tarjeta = new Tarjeta();
  }


  continuar(): void {
    console.log(this.pago.formaPago)
    if (this.pago.formaPago != undefined && this.pago.formaPago == "Efectivo"){
      this.continuarCompra();
    } else {
      if(this.pago.formaPago == undefined){
        this.toastr.warning("Debe seleccionar una forma de pago", '¡ATENCIÓN!')
      }else{
        if(this.isValidTarjeta() == false){
          this.toastr.error("No pueden haber campos vacíos", 'ERROR TARJETA')
        }else{
            this.continuarCompra();
        }
      }
    }
  }

  continuarCompra(): void {
    this.ventaService.venta.pago = this.pago;
    this.calcularTotal();
    this.ventaService.venta.pago.iva = this.ventaService.venta.pago.precioTotal - (this.ventaService.venta.pago.precioTotal/1.21);
    this.ventaService.venta.pago.precioNeto = this.ventaService.venta.pago.precioTotal/1.21;
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
    if(this.tarjeta.numero == undefined || this.tarjeta.apellido == undefined || this.tarjeta.fechaExpiracion == undefined ||
    this.tarjeta.codigoSeguridad == undefined || this.tarjeta.dni == undefined)
      return false;
    else
      return true;
  }

}
