import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:Producto;
  constructor(
    private activatedRoute:ActivatedRoute,
    private productoService: ProductoService,
    private router: Router,
    private ventaService: VentaService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.cargarDatos();
  }

  cargarDatos():void{
    this.activatedRoute.params.subscribe(
      params =>{
      this.productoService.getProducto(params.id).subscribe(
        result=>{
          Object.assign(this.producto, result);
        },
        error=>{
          console.log(error);
        }
      )
      }
    )   
  }

  regresar():void{
    this.router.navigate(["tienda"]);
  }

  addProductToCart():void{
    if(!this.usuarioService.userLoggedIn()){
      this.toastr.info("Inicie sesion para Continuar");
      this.router.navigate(['login']);
    }else if(this.usuarioService.clientLogged()){
      this.ventaService.venta.productos.push(this.producto);
      this.toastr.success("Se añadió el producto al carrito de compras", "PRODUCTO AGREGADO");
    }else{
      this.toastr.error("El tipo de usuario no es conocido por el sistema","Error de autenticacion");
      this.router.navigate(['home']);
    }
  }
}
