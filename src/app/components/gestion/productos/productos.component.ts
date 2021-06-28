import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:Array<Producto> = new Array<Producto>();
  productos2:Array<Producto>;
  mascotaSeleccionada: string;
  productosSeleccionados: Array<Producto>;
  categoriaSeleccionada: string;
  precioSeleccionado: any =0;
  proveedorSeleccionado: string;
  nombreCodigo: string="";
  categorias: Array<Categoria>;
  tiposProductos: Array<string>;
  tiposMascota: Array<string>;
  proveedores: Array<Proveedor>;
  nombreProducto:string="";
  foto:string;

  constructor(private router:Router,
              private productoService: ProductoService,
              private proveedorService: ProveedorService,
              private dialog: MatDialog,
              private toastr: ToastrService,
              private categoriaService: CategoriaService
            ) { }

  ngOnInit(): void {
    this.iniciarFiltros();
    this.cargarProductos();
    this.cargarCategorias();
    this.cargarProveedores();
  }

  iniciarDatos(){
    this.productos = new Array<Producto>();
    this.productos2 = new Array<Producto>();
  }

  iniciarFiltros(){
    this.mascotaSeleccionada = "Tipo de Mascota";
    this.categoriaSeleccionada = "Categoria";
    this.precioSeleccionado = "Precio Compra";
    this.proveedorSeleccionado ="Proveedor";
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

  cargarProveedores(){
    this.proveedores = new Array<Proveedor>();
    this.proveedorService.get("").subscribe(
      result=>{
        result.forEach(element => {
          let vProveedor = new Proveedor();
          Object.assign(vProveedor, element);
          this.proveedores.push(vProveedor);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar proveedor");
      }
    )
  }

  cargarProductos() {
    this.iniciarDatos();
    this.limpiarFiltros(0);
    this.productoService.get(this.nombreCodigo, this.nombreCodigo).subscribe(
      result=>{
        result.forEach(element => {
          let vProducto= new Producto();
          Object.assign(vProducto, element);
          this.productos.push(vProducto);
          this.productos2.push(vProducto);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar producto");
      }
    )
  }

  filtrarTipoMascota(){
    if(this.mascotaSeleccionada!="Tipo de Mascota"){
      this.limpiarFiltros(1);
      this.productosSeleccionados = new Array<Producto>();
      this.productos2.forEach(element => {
        if (element.categoria.tipoMascota == this.mascotaSeleccionada){
          this.productosSeleccionados.push(element);
        }
      });
      this.productos = this.productosSeleccionados;
    }else{
      this.productos = this.productos2;
    }
  }

  filtrarTipoProducto(){
    if (this.categoriaSeleccionada!="Categoria"){
      this.limpiarFiltros(2);
      this.productosSeleccionados = new Array<Producto>();
      this.productos2.forEach(element => {
        if (element.categoria.tipoProducto == this.categoriaSeleccionada){
          this.productosSeleccionados.push(element);
        }
      });
      this.productos = this.productosSeleccionados;
    }else{
      this.productos = this.productos2;
    }
  }

  filtrarPrecio(){
    if(this.precioSeleccionado!="Precio Compra"){
      this.limpiarFiltros(4);
      this.productosSeleccionados = new Array<Producto>();
      this.productos2.forEach(element => {
        if (element.precioCompra <= this.precioSeleccionado){
          this.productosSeleccionados.push(element);
        }
      });
      this.productos = this.productosSeleccionados;}
    else{
      this.productos = this.productos2;
    }
  }

  filtrarProveedor(){
    if(this.proveedorSeleccionado!="Proveedor"){
      this.limpiarFiltros(3);
      this.productosSeleccionados = new Array<Producto>();
      this.productos2.forEach(element => {
        if (element.proveedor.nombre == this.proveedorSeleccionado){
          this.productosSeleccionados.push(element);
        }
      });
      this.productos = this.productosSeleccionados;
    }else{
      this.productos = this.productos2;
    }
  }

  limpiarFiltros(numero:number){
    if(numero!=1){this.mascotaSeleccionada="Tipo de Mascota";}
    if(numero!=2){this.categoriaSeleccionada="Categoria";}
    if(numero!=3){this.proveedorSeleccionado="Proveedor";}
    if(numero!=4){this.precioSeleccionado="Precio Compra";}
    if(numero!=5){this.nombreCodigo="";}
  }

  buscarProducto(){
    this.limpiarFiltros(5);
    this.productosSeleccionados = new Array<Producto>();
    var buscado = this.nombreCodigo.toUpperCase();
    if(this.nombreCodigo == ""){
      this.productos = this.productos2;
    }else{
      this.productos2.forEach(element => {
        var nombre = element.nombre.toUpperCase();
        var codigo = element.codigo.toUpperCase();
        if (nombre.indexOf(buscado) != -1 || codigo.includes(buscado) != false ){
          this.productosSeleccionados.push(element);
        }
      });
      this.productos = this.productosSeleccionados;
    }
  }

  verFoto(producto:Producto){
    this.nombreProducto=producto.nombre.toString();
    this.foto=producto.img;
  }

  agregarProducto():void{
    this.router.navigate(["form-producto/", 0]);
  }

  modificarProducto(producto: Producto){
    this.router.navigate(["form-producto/", producto._id ]);
  }

  confirmDelete(producto: Producto){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Seguro que desea eliminar?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.borrarProducto(producto);
    });
  }

  borrarProducto(producto:Producto){
    this.productoService.deleteProducto(producto).subscribe(
      result=>{
        if (result.status == '1' ){
          this.toastr.success("El producto fue eliminado correctamente", "OPERACION EXITOSA");
          this.cargarProductos();
          window.location.reload();
        }
        else{
          this.toastr.error("Error al eliminar el producto", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
