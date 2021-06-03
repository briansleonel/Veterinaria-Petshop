import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-pago',
  templateUrl: './seleccion-pago.component.html',
  styleUrls: ['./seleccion-pago.component.css']
})
export class SeleccionPagoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  continuar(): void {
    this.router.navigate(['carrito-compra/select-envio'])
  }

  volver(): void {
    this.router.navigate(['carrito-compra'])
  }

}
