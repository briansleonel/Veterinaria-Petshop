import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  rolSeleccionado: string = "";
  nombreUsuario: string = "";
  apellidoUsuario: string = "";
  usuarios: Array<Usuario>;
  usuario: Usuario;

  constructor(private router:Router,
              private usuarioService: UsuarioService,
              private dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.iniciarVariables();
    this.cargarUsuarios();
  }

  iniciarVariables(){
    this.usuarios = new Array<Usuario>();
    this.usuario = new Usuario();
    this.rolSeleccionado = "";
    this.nombreUsuario= "";
    this.apellidoUsuario = "";
  }

  agregarUsuario(){
    this.router.navigate(["form-usuario/", 0]);
  }

  cargarUsuarios(){
    this.usuarios = new Array<Usuario>();
    this.usuarioService.get(this.nombreUsuario, this.apellidoUsuario, this.rolSeleccionado).subscribe(
      result=>{
        result.forEach(element => {
          let vUsuario = new Usuario();
          Object.assign(vUsuario, element);
          this.usuarios.push(vUsuario);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar usuario");
      }
    )
  }

  limpiarFiltros(){
    this.rolSeleccionado = "";
    this.nombreUsuario= "";
    this.apellidoUsuario = "";
    this.cargarUsuarios();
  }

  modificarUsuario(usuario: Usuario){
    this.router.navigate(["form-usuario/", usuario._id]);
  }

  confirmDelete(usuario: Usuario){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Seguro que desea eliminar?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.borrarUsuario(usuario);
    });
  }

  borrarUsuario(usuario: Usuario){
    this.usuarioService.deleteUsuario(usuario).subscribe(
      result=>{
        if (result.status == '1' ){
          this.toastr.success("El usuario fue eliminado correctamente", "OPERACION EXITOSA");
          this.cargarUsuarios();
        }
        else{
          this.toastr.error("Error al eliminar el usuario", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
