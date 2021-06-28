import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit {

  usuario:Usuario;
  accion: string = "new";
  usernameValido: boolean = true;
  vacio: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0"){
          this.accion = "new";
          this.iniciarVariables();
        }else{
          this.accion = "update";
          this.iniciarVariables();
          this.cargarUsuario(params.id)
        }
    });
  }

  iniciarVariables(){
    this.usuario = new Usuario();
  }

  guardarUsuario(){
    this.usuarioService.addUsuario(this.usuario).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("El usuario fue guardado correctamente", "OPERACION EXITOSA");
          this.router.navigate(["usuarios"]);
        }else{
          this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
          this.vacio = true;
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  cargarUsuario(id: string){
    this.usuarioService.getUsuario(id).subscribe(
      result=>{
        Object.assign(this.usuario, result);
      },
      error=>{
        console.log(error);
      }
    )
  }

  modificarUsuario(){
    if(this.usuario.nombre != "" && this.usuario.apellido != "" && this.usuario.domicilio != "" && 
    this.usuario.email != "" && this.usuario.password != "" && this.usuario.telefono != "" && 
    this.usuario.username != "" ){
      this.usuarioService.updateUsuario(this.usuario).subscribe(
        result=>{
          if(result.status=="1"){
            this.toastr.success("El usuario fue actualizado correctamente", "OPERACION EXITOSA");
            this.router.navigate(["usuarios"]);
          }else{
            this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
            this.vacio = true;
          }
        },
        error=>{
          console.log(error);
        }
      )
    }else{
      this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
      this.vacio = true;
    }
  }
  
  validarUsername(username: NgModel){
    if(this.usuario.username!="" && this.usuario.username != null){
      this.usuarioService.validarUsername(this.usuario.username).subscribe(
        result=>{
          if(result != null){
            this.usernameValido=false;
            this.usuario.username = "";
            username.reset();
          }else{
            this.usernameValido = true;
          }
        },
        error=>{
          console.error(error);
        }
      )
    }
  }

  cancelar(){
    this.router.navigate(["usuarios"]);
  }
}

