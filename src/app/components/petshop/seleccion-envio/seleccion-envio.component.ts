import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-seleccion-envio',
  templateUrl: './seleccion-envio.component.html',
  styleUrls: ['./seleccion-envio.component.css']
})
export class SeleccionEnvioComponent implements OnInit {

  modoEnvio: string;
  idUser: string;

  domicilio: string;

  constructor(
    private router:Router,
    private ventaService: VentaService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.idUser = this.usuarioService.idLogged();
    this.domicilio = '';
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuarioService.getUser(this.idUser).subscribe(
      (result) => {
        this.domicilio = result.domicilio;
      }
    )
  }

  continuar(): void {
    if(this.modoEnvio != undefined) {
      if(this.modoEnvio != 'Envío a domicilio') {
        this.save();
      } else {
        if(this.domicilio != '') {
          this.save();
        } else {
          this.toastr.warning('Debe ingresar un domicilio', '¡ATENCIÓN!')
        }
      }
      
    } else {
      this.toastr.warning('Debe seleccionar un medio de envío', '¡ATENCIÓN!')
    }
  }

  save(): void {
    this.ventaService.venta.medioEnvio = this.modoEnvio;
    this.router.navigate(['carrito-compra/detalles']);
  }

  volver(): void {
    this.router.navigate(['carrito-compra/select-pago'])
  }

}
