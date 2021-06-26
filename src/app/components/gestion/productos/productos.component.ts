import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto/producto';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Array<Producto>;
  findNameProd : string;
  findCodigoProd: string;
  filterTypeProducto: string;
  filterTypeMascota: string;
  filterTypeProveedor: string;
  filterTypePrecio: number;

  proveedores: Array<Proveedor>;

  constructor(private router:Router,
              private productoService: ProductoService,
              private proveedorService: ProveedorService,
              private dialog: MatDialog,
              private toastr: ToastrService,
            ) { }

  ngOnInit(): void {
    this.findNameProd = '';
    this.findCodigoProd = '';
    this.filterTypeProducto = '';
    this.filterTypeMascota = '';
    this.filterTypeProveedor = '';
    this.filterTypePrecio = 0;
    this.proveedores = new Array<Proveedor>();
    this.cargarProductos();
    this.cargarProveedores();
    console.log(this.productos)
  }

  cargarProveedores(): void {
    this.proveedores = new Array<Proveedor>();
    this.proveedorService.get(this.filterTypeProveedor).subscribe(
      result=>{
        console.log(result);
        result.forEach(element => {
          let proveedor = new Proveedor();
          Object.assign(proveedor, element);
          this.proveedores.push(proveedor);
        });
        console.log(this.proveedores)
      },
      error=>{
        console.log(error);
      }
    )
  }

  cargarProductos():void{
    this.productos = new Array<Producto>();
    this.productoService.get(this.findNameProd, this.findCodigoProd).subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          this.productos.push(producto);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  /*
  filterByTypeProduct(event): void {
    this.filterTypeProducto = event;
    let encontrados = Array<Producto>();
    this.productos.forEach(element => {
      if(element.categoria.tipoProducto == this.filterTypeProducto)
        encontrados.push(element);
    })
    this.productos = encontrados;
  }

  filterByTypeMascota(event): void {
    this.filterTypeMascota = event;
    console.log("Filter:" ,this.filterTypeMascota)
    let encontrados = Array<Producto>();
    this.productos.forEach(element => {
      console.log("Element: ",element.categoria.tipoMascota)
      if(element.categoria.tipoMascota == this.filterTypeMascota)
        encontrados.push(element);
    })
    this.productos = encontrados;
  }
  */

  filterByProveedor(event): void {
    this.filterTypeProveedor = event;
    let encontrados = Array<Producto>();
    this.productos.forEach(element => {
      if(element.proveedor.nombre == this.filterTypeProveedor)
        encontrados.push(element);
    })
    this.productos = encontrados;
    console.log(this.productos)
  }

  filterByPrecio(event): void {
    this.filterTypePrecio = event;
    let encontrados = Array<Producto>();
    this.productos.forEach(element => {
      if(element.precioVenta <= this.filterTypePrecio)
        encontrados.push(element);
    })
    this.productos = encontrados;
  }

  cleanFilters(): void {
    this.findNameProd = '';
    this.filterTypeProducto = '';
    this.filterTypeMascota = '';
    this.filterTypeProveedor = '';
    this.filterTypePrecio = 0;
    this.cargarProductos();
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
