import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from 'src/app/models/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { ConfirmDialogComponent } from '../../utils/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedor: Proveedor;
  editar : boolean = false;
  proveedorSeleccionado: string;
  proveedores: Array<Proveedor>;
  vacio : boolean = false;

  constructor(private proveedorService: ProveedorService,
              private toastr: ToastrService,
              private dialog: MatDialog) { 
    this.proveedor= new Proveedor();
    this.cargarProveedores();
  }

  iniciarProveedor(){
    this.proveedores = new Array<Proveedor>();
    this.proveedorSeleccionado= "";
  }

  cargarProveedores(){
    this.iniciarProveedor();
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
        alert("Error al cargar proveedores");
      }
    )
  }

  buscarProveedor(){
    this.proveedores = new Array<Proveedor>();
    this.proveedorService.get(this.proveedorSeleccionado).subscribe(
      result=>{
        result.forEach(element => {
          let vProveedor = new Proveedor();
          Object.assign(vProveedor, element);
          this.proveedores.push(vProveedor);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar proveedores");
      }
    )
  }

  guardarProveedor(){
    this.proveedorService.addProveedor(this.proveedor).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("El proveedor fue guardado correctamente", "OPERACION EXITOSA");
          this.proveedor = new Proveedor();
          this.vacio = false;
          this.cargarProveedores();
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

  actualizarProveedor(){
    if(this.proveedor.nombre != "" && this.proveedor.direccion != "" && this.proveedor.email != "" && 
    this.proveedor.telefono != ""){
      this.proveedorService.updateProveedor(this.proveedor).subscribe(
        result=>{
          if(result.status=="1"){
            this.toastr.success("El proveedor fue actualizado correctamente", "OPERACION EXITOSA");
            this.proveedor = new Proveedor();
            this.vacio = false;
            this.cargarProveedores();
            this.editar = false;
          }else{
            this.toastr.error("No pueden haber campos vacíos", "OPERACION FALLIDA");
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

  modificarProveedor(proveedor: Proveedor){
    this.editar = true;
    this.proveedor = proveedor;
  }

  confirmDelete(proveedor: Proveedor){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Seguro que desea eliminar?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.borrarProveedor(proveedor);
    });
  }

  borrarProveedor(proveedor: Proveedor){
      this.proveedorService.deleteProveedor(proveedor).subscribe(
        result=>{
          if (result.status == '1' ){
            this.toastr.success("El proveedor fue eliminado correctamente", "OPERACION EXITOSA");
            this.cargarProveedores();
          }
          else{
            this.toastr.error("Error al eliminar el proveedor", "OPERACION FALLIDA");
          }
        },
        error=>{
          console.log(error);
        }
      )
  }

  cancelar(){
    this.proveedor = new Proveedor();
    this.editar = false;
  }

  ngOnInit(): void {
  }

}
