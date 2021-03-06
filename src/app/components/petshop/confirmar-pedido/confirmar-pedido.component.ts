import { Venta } from './../../../models/venta/venta';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { VentaService } from 'src/app/services/venta/venta.service';
import { SuccesBuysComponent } from '../../utils/succes-buys/succes-buys.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import * as printJS from 'print-js';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.css']
})
export class ConfirmarPedidoComponent implements OnInit {

  listaProductos: Array<Producto>;

  venta: Venta;

  idUser: string;

  user: Usuario;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private ventaService: VentaService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.venta = new Venta();
    this.venta = this.ventaService.venta;
    this.idUser = this.usuarioService.idLogged();
    this.user = new Usuario();
    this.cargarUsuario();
    //this.listaProductos = new Array<Producto>();
    //this.listaProductos = this.ventaService.venta.productos;
  }

  confirmarPedido(): void {
    this.cargarDatosVenta();
    const dialogRef = this.dialog.open(SuccesBuysComponent, {data: ''});
    dialogRef.afterClosed().subscribe(
      (res) => {
        if(res) {
          console.log("Descargar comprobante ", res);
        }
        this.router.navigate(['tienda']);
      }
    )
  }

  cargarDatosVenta(){
    this.venta.fecha = new Date();
    this.realizarVenta();
    //this.ventaService.init();
  }

  realizarVenta() {
        this.ventaService.addVenta(this.venta, this.usuarioService.idLogged()).subscribe(
          async (result) => {
            if(result.status == '1') {
              //console.log(result);
              await this.actualizarStock();
              this.ventaService.init();
              this.toastr.success("Se ha registrado su compra exitosamente");
            }
          }
        )
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-envio']);
  }

  cargarUsuario(): void {
    this.usuarioService.getUser(this.idUser).subscribe(
      (result) => {
        Object.assign(this.user, result);
        //console.log(this.user);
      }
    )
  }

  actualizarStock() {
    return new Promise((resolve, reject) => {
      resolve(
        this.venta.productos.forEach(
          (element) => {
            this.productoService.getProducto(element._id).subscribe(
              async result => {
                let prod = new Producto();
                Object.assign(prod, result);
                --prod.stock;
                await this.update(prod);
              }
            );
          }
        )
      )
    });
  }

  update(prod: Producto) {
    return new Promise((resolve, reject) => {
      resolve(this.productoService.updateProducto(prod).subscribe(
        res => {
          if(res.status == '1')
           console.log("Stock actualizado")
        }
      ));
    })
  }

}
