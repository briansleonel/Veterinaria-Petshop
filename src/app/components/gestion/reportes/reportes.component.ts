import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta/venta';
import { VentaService } from 'src/app/services/venta/venta.service';
import * as printJS from 'print-js';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  
  tipoSeleccionado: string = "";
  fechaDesde: Date;
  fechaHasta: Date;
  ventas: Array<Venta>;
  ventas2: Array<Venta>;
  ventasSeleccionadas: Array<Venta>;
  fecha: Date= new Date();
  precioNetoTotal: number;
  ivaTotal: number;
  precioTotalTotal: number;
  productos: Array<Producto>;
  productos2: Array<Producto>;
  productosSeleccionado: Array<Producto>;
  precioCompraTotal: number;

  constructor(private productoService: ProductoService,
              private ventaService: VentaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.iniciarVariables();
    this.cargarVentas();
    this.cargarProductos();
  }

  iniciarVariables(){
    this.ventas = new Array<Venta>();
    this.ventas2 = new Array<Venta>();
    this.ventasSeleccionadas = new Array<Venta>();
    this.tipoSeleccionado = "";
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.productos = new Array<Producto>();
    this.productos2 = new Array<Producto>();
    this.productosSeleccionado = new Array<Producto>();
  }

  iniciarTotales(){
    this.precioNetoTotal = 0;
    this.precioTotalTotal = 0;
    this.ivaTotal = 0;
  }

  cargarVentas(){
    this.ventas = new Array<Venta>();
    this.ventaService.getVentas().subscribe(
      result=>{
        result.forEach(element => {
          let vVenta = new Venta();
          Object.assign(vVenta, element);
          this.ventas.push(vVenta);
          this.ventas2.push(vVenta);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar ventas");
      }
    )
  }

  cargarProductos() {
    this.productos = new Array<Producto>()
    this.productoService.get("", "").subscribe(
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

  limpiarFiltros(){
    this.iniciarVariables();
    this.cargarVentas();
    this.cargarProductos();
  }

  filtrarFechas(){
    this.iniciarTotales();
    if(this.fechaHasta != null){
      if (this.fechaDesde <= this.fechaHasta){
        this.ventasSeleccionadas = new Array<Venta>();
        this.ventas2.forEach(element => {
          let cadena = element.fecha.toString().slice(0, -14); 
          var fecha = Date.parse(cadena)
          var fechaDes = Date.parse(this.fechaDesde.toString());
          var fechaHas = Date.parse(this.fechaHasta.toString());
          if (fecha <= fechaHas && fecha > fechaDes){
            this.precioNetoTotal = this.precioNetoTotal + element.pago.precioNeto;
            this.precioTotalTotal = this.precioTotalTotal + element.pago.precioTotal;
            this.ivaTotal = this.ivaTotal + element.pago.iva;
            this.ventasSeleccionadas.push(element);
          }
        });
        this.ventas = this.ventasSeleccionadas;
      }else{
        this.ventas = this.ventas2;
        this.toastr.error("La fecha 'A:' no puede ser menor a la fecha 'De:'", "OPERACION FALLIDA");
      }
    }
  }

  generarInforme(){
      printJS({
        printable: 'formVentas',
        targetStyles: ['*'],
        header: 'Informe de Ventas',
        headerStyle: 'font: arial bold 25px; text-align: center;',
        documentTitle: 'Ventas',
        type: 'html'
      })
  }

}
