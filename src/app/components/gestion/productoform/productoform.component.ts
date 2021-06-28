import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Producto } from 'src/app/models/producto/producto';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';

@Component({
  selector: 'app-productoform',
  templateUrl: './productoform.component.html',
  styleUrls: ['./productoform.component.css']
})
export class ProductoformComponent implements OnInit {

  producto:Producto;
  accion: string = "new";
  categorias: Array<Categoria>;
  tiposProductos: Array<string>;
  tiposMascota: Array<string>;
  proveedores: Array<Proveedor>;
  categoriaFinal: Categoria;
  codigoValido: boolean = true;
  vacio: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private proveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0"){
          this.accion = "new";
          this.iniciarVariables();
          this.cargarCategorias();
          this.cargarProveedores();
        }else{
          this.accion = "update";
          this.iniciarVariables();
          this.cargarCategorias();
          this.cargarProveedores();
          this.cargarProducto(params.id)
        }
    });
  }

  iniciarVariables(){
    this.producto = new Producto();
    this.producto.categoria = new Categoria();
    this.producto.proveedor = new Proveedor();
    this.producto.img = "";
    this.categoriaFinal = new Categoria();
  }

  onFileChanges(files){
    this.producto.img = files[0].base64;
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

  guardarProducto(){
    this.categoriaService.getCategoriaByTipos(this.categoriaFinal).subscribe(
      result=>{
          Object.assign(this.categoriaFinal, result[0]);
          this.producto.categoria = this.categoriaFinal;
          this.productoService.addProducto(this.producto).subscribe(
            result=>{
              if(result.status=="1"){
                this.toastr.success("El producto fue guardado correctamente", "OPERACION EXITOSA");
                this.router.navigate(["productos"]);
              }else{
                this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
                this.vacio = true;
              }
            },
            error=>{
              console.log(error);
            }
          )
      })
  }

  cargarProducto(id: string){
      this.productoService.getProducto(id).subscribe(
        result=>{
          Object.assign(this.producto, result);
          this.producto.proveedor = this.proveedores.find(a=>(a._id == this.producto.proveedor._id));
          this.categoriaFinal = this.producto.categoria;
        },
        error=>{
          console.log(error);
        }
      )
  }

  modificarProducto(){
    if(this.producto.categoria.tipoMascota != "" && this.producto.categoria.tipoProducto != "" && this.producto.codigo != ""
    && this.producto.descripcion != "" && this.producto.fechaRecepcion != null && this.producto.fechaVencimiento != null
    && this.producto.img != "" && this.producto.nombre != "" && this.producto.precioCompra != null &&
    this.producto.precioVenta != null && this.producto.stock != null){
        this.categoriaService.getCategoriaByTipos(this.categoriaFinal).subscribe(
          result=>{
              Object.assign(this.categoriaFinal, result[0]);
              this.producto.categoria = this.categoriaFinal;
              this.productoService.updateProducto(this.producto).subscribe(
                result=>{
                  if(result.status=="1"){
                    this.toastr.success("El producto fue actualizado correctamente", "OPERACION EXITOSA");
                    this.router.navigate(["productos"]);
                  }else{
                    this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
                    this.vacio = true;
                  }
                },
                error=>{
                  console.log(error);
                }
              )
          })
    }else{
      this.toastr.error("No puede haber campos vacíos", "OPERACION FALLIDA");
      this.vacio = true;
    }
  }
  
  validarCodigo(codigo: NgModel){
    if(this.producto.codigo!="" && this.producto.codigo != null){
      this.productoService.validarCodigo(this.producto.codigo).subscribe(
        result=>{
          if(result != null){
            this.codigoValido=false;
            this.producto.codigo = "";
            codigo.reset();
          }else{
            this.codigoValido = true;
          }
        },
        error=>{
          console.error(error);
        }
      )
    }
  }

  cancelar(){
    this.router.navigate(["productos"]);
  }
}
