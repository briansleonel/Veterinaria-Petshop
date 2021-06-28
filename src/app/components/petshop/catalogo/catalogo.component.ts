import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos: Array<Producto>;
  page:number;
  findNameProd : string;
  findCodigoProd: string;
  filterTypeProducto: string;
  filterTypeMascota: string;

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.findNameProd = '';
    this.findCodigoProd = '';
    this.filterTypeProducto = '';
    this.filterTypeMascota = '';
    this.cargarCatalogoProductos();
  }

  cargarCatalogoProductos():void{
    this.productos = new Array<Producto>();
    this.productoService.get(this.findNameProd, this.findCodigoProd).subscribe(
      result=>{
        result.forEach(element => {
          let producto = new Producto();
          Object.assign(producto, element);
          console.log(element);
          console.log(producto);
          this.productos.push(producto);
        });
        console.log(this.productos)
      },
      error=>{
        console.log(error);
      }
    )
  }

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

  cleanFilters(): void {
    this.findNameProd = '';
    this.filterTypeProducto = '';
    this.filterTypeMascota = '';
    this.cargarCatalogoProductos();
  }

  addProductToCart(prod:Producto):void{
    this.ventaService.venta.productos.push(prod);
    this.toastr.success("Se añadió el producto al carrito de compras", "PRODUCTO AGREGADO");
  }

}
