import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categoria: Categoria;
  categorias: Array<Categoria>;
  categorias2: Array<Categoria>;
  editar: boolean = false;
  tiposProductos: Array<string>;
  tiposMascota: Array<string>;
  mascotaSeleccionada: string;
  categoriaSeleccionada: string;
  categoriasSeleccionadas: Array<Categoria>;
  vacio : boolean = false;

  constructor(private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
    this.categoria= new Categoria();
    this.cargarCategorias();
   }

  iniciarCategoria(){
    this.categorias = new Array<Categoria>();
    this.categorias2 = new Array<Categoria>();
  }

  iniciarFiltros(){
    this.mascotaSeleccionada = "Tipo de Mascota";
    this.categoriaSeleccionada = "Categoria";
    this.tiposProductos = new Array<string>();
    this.tiposMascota = new Array<string>();
  }

  cargarCategorias(){
    this.iniciarFiltros();
    this.iniciarCategoria();
    this.categoriaService.getCategorias().subscribe(
      result=>{
        result.forEach(element => {
          let vCategoria = new Categoria();
          Object.assign(vCategoria, element);
          this.categorias.push(vCategoria);
          this.categorias2.push(vCategoria);
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

  filtrarTipoMascota(){
    if(this.mascotaSeleccionada!="Tipo de Mascota"){
      this.limpiarFiltros(1);
      this.categoriasSeleccionadas = new Array<Categoria>();
      this.categorias2.forEach(element => {
        if (element.tipoMascota == this.mascotaSeleccionada){
          this.categoriasSeleccionadas.push(element);
        }
      });
      this.categorias = this.categoriasSeleccionadas;
    }else{
      this.categorias = this.categorias2;
    }
  }

  filtrarTipoProducto(){
    if (this.categoriaSeleccionada!="Categoria"){
      this.limpiarFiltros(2);
      this.categoriasSeleccionadas = new Array<Categoria>();
      this.categorias2.forEach(element => {
        if (element.tipoProducto == this.categoriaSeleccionada){
          this.categoriasSeleccionadas.push(element);
        }
      });
      this.categorias = this.categoriasSeleccionadas;
    }else{
      this.categorias = this.categorias2;
    }
  }

  limpiarFiltros(numero:number){
    if(numero!=1){this.mascotaSeleccionada="Tipo de Mascota";}
    if(numero!=2){this.categoriaSeleccionada="Categoria";}
  }

  guardarCategoria(){
    this.categoriaService.addCategoria(this.categoria).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("La categoría fue actualizada correctamente", "OPERACION EXITOSA");
          this.categoria = new Categoria();
          this.vacio = false;
          this.cargarCategorias();
        }else{
          this.toastr.error("No pueden haber campos vacíos", "OPERACION FALLIDA");
          this.vacio = true;
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  actualizarCategoria(){
    if(this.categoria.tipoMascota != "" && this.categoria.tipoProducto != ""){
      this.categoriaService.updateCategoria(this.categoria).subscribe(
        result=>{
          if(result.status=="1"){
            this.toastr.success("La categoría fue guardada correctamente", "OPERACION EXITOSA");
            this.categoria = new Categoria();
            this.vacio = false;
            this.cargarCategorias();
            this.editar = false;
          }else{
            this.toastr.error("No pueden haber campos vacíos", "OPERACION FALLIDA");
            this.vacio = true;
          }
        },
        error=>{
          console.log(error);
        }
      )
    }else{
      this.toastr.error("No pueden haber campos vacíos", "OPERACION FALLIDA");
      this.vacio = true;
    }
  }

  modificarCategoria(categoria:Categoria){
    this.editar = true;
    this.categoria = categoria;
  }

  confirmDelete(categoria: Categoria){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Seguro que desea eliminar?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.borrarCategoria(categoria);
    });
  }

  borrarCategoria(categoria:Categoria){
    this.categoriaService.deleteCategoria(categoria).subscribe(
      result=>{
        if (result.status == '1' ){
          this.toastr.success("La categoría fue eliminada correctamente", "OPERACION EXITOSA");
          this.cargarCategorias();
        }
        else{
          this.toastr.error("Error al eliminar la categoría", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  cancelar(){
    this.categoria = new Categoria();
    this.editar = false;
  }

  ngOnInit(): void {
  }

}
