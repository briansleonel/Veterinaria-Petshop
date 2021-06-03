import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-envio',
  templateUrl: './seleccion-envio.component.html',
  styleUrls: ['./seleccion-envio.component.css']
})
export class SeleccionEnvioComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  continuar(): void {
    this.router.navigate(['carrito-compra/detalles']);
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-pago'])
  }

}
