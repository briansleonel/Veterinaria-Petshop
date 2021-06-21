import { Venta } from './../../../models/venta/venta';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { VentaService } from 'src/app/services/venta/venta.service';
import { SuccesBuysComponent } from '../../utils/succes-buys/succes-buys.component';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {

  listaProductos: Array<Producto>;

  venta: Venta;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
    this.venta = new Venta();
    this.venta = this.ventaService.venta;
    //this.listaProductos = new Array<Producto>();
    //this.listaProductos = this.ventaService.venta.productos;
  }

  confirmarPedido(): void {
    const dialogRef = this.dialog.open(SuccesBuysComponent, {data: ''});
    dialogRef.afterClosed().subscribe(
      (res) => {
        if(res) {
          console.log("Descargar comprobante ", res);
        }
        this.router.navigate(['tienda'])
      }
    )
    this.ventaService.addVenta(this.venta);
    this.ventaService.init();
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-envio']);
  }

}
