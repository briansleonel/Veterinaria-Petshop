import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: Array<Producto>;
  productos2: Array<Producto>;
  page:number;
  findNameProd : string;
  findCodigoProd: string;
  filterTypeProducto: string;
  filterTypeMascota: string;

  categorias: Array<Categoria>;
  tiposProductos: Array<string>;
  tiposMascota: Array<string>;

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private router : Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.findNameProd = '';
    this.findCodigoProd = '';
    this.filterTypeProducto = '';
    this.filterTypeMascota = '';
    this.cargarCatalogoProductos();
    this.cargarCategorias();
  }

  cargarCatalogoProductos():void{
    this.cleanFilters(1);
    this.productos = new Array<Producto>();
    this.productos2 = new Array<Producto>();
    this.productoService.get(this.findNameProd, this.findCodigoProd).subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          this.productos.push(producto);
          this.productos2.push(producto);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  filterByTypeProduct(event): void {
    this.cleanFilters(2);
    this.filterTypeProducto = event;
    let encontrados = Array<Producto>();
    this.productos2.forEach(element => {
      if(element.categoria.tipoProducto == this.filterTypeProducto)
        encontrados.push(element);
    })
    this.productos = encontrados;
  }

  filterByTypeMascota(event): void {
    this.cleanFilters(3);
    this.filterTypeMascota = event;
    //console.log("Filter:" ,this.filterTypeMascota)
    let encontrados = Array<Producto>();
    this.productos2.forEach(element => {
      //console.log("Element: ",element.categoria.tipoMascota)
      if(element.categoria.tipoMascota == this.filterTypeMascota)
        encontrados.push(element);
    })
    this.productos = encontrados;
  }

  cleanFilters(opcion: number): void {
    if(opcion != 1){this.findNameProd = '';}
    if(opcion != 2){this.filterTypeProducto = '';}
    if(opcion != 3){this.filterTypeMascota = '';}
    if(opcion == 0){this.cargarCatalogoProductos();}
  }

  addProductToCart(prod:Producto):void{
    if(!this.usuarioService.userLoggedIn()){
      this.toastr.info("Inicie sesion para Continuar");
      this.router.navigate(['login']);
    }else if(this.usuarioService.clientLogged()){
      this.ventaService.venta.productos.push(prod);
      this.toastr.success("Se añadió el producto al carrito de compras", "PRODUCTO AGREGADO");
    }else{
      this.toastr.error("El tipo de usuario no es conocido por el sistema","Error de autenticacion");
      this.router.navigate(['home']);
    }
  }

  cargarCategorias(){
    this.categorias = new Array<Categoria>();
    this.tiposProductos = new Array<string>();
    this.tiposMascota = new Array<string>();
    this.categoriaService.getCategorias().subscribe(
      result=>{
        result.forEach(element => {
          let vCategoria = new Categoria();
          Object.assign(vCategoria, element);
          this.categorias.push(vCategoria);
          if (this.tiposProductos.indexOf(vCategoria.tipoProducto) == -1){
              this.tiposProductos.push(vCategoria.tipoProducto);   
          }
          if (this.tiposMascota.indexOf(vCategoria.tipoMascota) == -1){
            this.tiposMascota.push(vCategoria.tipoMascota);
          }
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar Categorias");
      }
    )
  }

}
