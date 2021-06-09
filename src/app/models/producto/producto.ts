import { Categoria } from "../categoria/categoria";
import { Proveedor } from "../proveedor/proveedor";

export class Producto {
    _id:string;
    codigo:string;
    nombre:string;
    descripcion:string;
    stock:number;
    proveedor:Proveedor;
    categoria:Categoria;
    precioCompra:number;
    precioVenta:number;
    fechaVencimiento:Date;
    fechaRecepcion:Date;
    img:string;
   


}
