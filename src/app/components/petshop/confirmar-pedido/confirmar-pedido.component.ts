import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  confirmarPedido(): void {
    
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-envio']);
  }

}
