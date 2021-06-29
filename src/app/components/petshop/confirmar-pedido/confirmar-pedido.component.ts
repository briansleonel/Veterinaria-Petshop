import { Venta } from './../../../models/venta/venta';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { VentaService } from 'src/app/services/venta/venta.service';
import { SuccesBuysComponent } from '../../utils/succes-buys/succes-buys.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

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
    private ventaService: VentaService,
    private usuarioService: UsuarioService
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
    this.realizarVenta();
  }

  realizarVenta(): void {
    this.ventaService.addVenta(this.venta, this.usuarioService.idLogged()).subscribe(
      (result) => {
        console.log(result);
        this.ventaService.init();
      }
    );
    
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-envio']);
  }

}
