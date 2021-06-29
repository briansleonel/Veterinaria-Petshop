import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password: string;
  returnUrl: string;
  msglogin: string; 
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
  }
  login() {
    this.usuarioService.login(this.username, this.password)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("rol", user.rol);
            this.toastr.success("Bienvenido "+ sessionStorage.getItem("user") + " !!", "Inicio sesion exitoso");
            //redirigimos a home o a pagina que llamo
            if(this.usuarioService.clientLogged())
              this.router.navigate(['tienda']);
            else
              this.router.navigateByUrl(this.returnUrl);
            
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
            this.toastr.error("El nombre de usuario y/o contraseña incorrectos", "Error de Ingreso");
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
          this.toastr.error("Error de conexion", "Error");
        });
  }
   

  mostrarPassword(){
    let elemento :any = document.getElementById('pass');
    if (elemento.type == "text"){
      elemento.type = "password";
    }else{
      elemento.type = "text"
    }
  }

}
