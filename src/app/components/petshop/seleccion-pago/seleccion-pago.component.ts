import { NumberFormatStyle } from '@angular/common';
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
  vacio : boolean = false;
  errorCodigo: boolean = false;
  errorDni: boolean = false;
  errorNumero: boolean = false;
  errorFecha: boolean = false;
  
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
        }
        if(this.isValidTarjetaCampos() == false){
          this.toastr.error("Campos erróneos en la tarjeta", 'ERROR TARJETA')
        }
        if(this.isValidTarjetaCampos() == true && this.isValidTarjeta() == true){
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
    this.tarjeta.codigoSeguridad == undefined || this.tarjeta.dni == undefined){
      this.vacio = true;
      return false;
  }else
      return true;
  }

  iniciarErrores(){
    this.errorCodigo = false;
    this.errorDni = false;
    this.errorNumero = false;
    this.errorFecha = false;
  }

  limpiarFormTarjeta(){
    this.tarjeta = new Tarjeta();
    this.vacio = false;
    this.iniciarErrores();
  }

  isValidTarjetaCampos(): boolean{
    this.iniciarErrores();
    if(this.tarjeta.codigoSeguridad != undefined && (this.tarjeta.codigoSeguridad.length != 3 || this.esNumero(this.tarjeta.codigoSeguridad) == false)){
      this.errorCodigo = true;
    }
    if(this.tarjeta.dni != undefined && (this.tarjeta.dni.length < 6 || this.esNumero(this.tarjeta.dni) == false)){
      this.errorDni = true;
    }
    if(this.tarjeta.numero != undefined && (this.tarjeta.numero.length < 16 || this.esNumero(this.tarjeta.numero) == false)){
      this.errorNumero = true;
    }
    if(this.tarjeta.fechaExpiracion != undefined && (this.tarjeta.fechaExpiracion.length != 5 || this.esFecha(this.tarjeta.fechaExpiracion) == false)){
      this.errorFecha = true;
    }
    if(this.errorCodigo == false && this.errorDni == false && this.errorNumero == false && this.errorFecha == false){
      return true;
    }else{
      return false;
    }
  }

  esNumero(cadena: string){
    let esNumero = true;
    for(var i=0; i < cadena.length && esNumero == true; i++){
      if(/^[0-9 ]*$/.test(cadena[i]) == false){
        esNumero = false;
      }
    }
    return esNumero;
  }

  esFecha(cadena: string){
    let esFecha = true;
    for(var i=0; i < cadena.length && esFecha == true; i++){
      if(i == 2){
        if(cadena[i] != "/"){
          esFecha = false;
        }
      }else{
        if(/^[0-9 ]*$/.test(cadena[i]) == false){
          esFecha = false;
        }
      } 
    }
    return esFecha;
  }
}
