import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-seleccion-envio',
  templateUrl: './seleccion-envio.component.html',
  styleUrls: ['./seleccion-envio.component.css']
})
export class SeleccionEnvioComponent implements OnInit {

  modoEnvio: string;

  constructor(
    private router:Router,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    console.log(this.ventaService.venta)
  }

  continuar(): void {
    this.ventaService.venta.medioEnvio = this.modoEnvio;
    console.log(this.ventaService.venta)
    this.router.navigate(['carrito-compra/detalles']);
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-pago'])
  }

}
