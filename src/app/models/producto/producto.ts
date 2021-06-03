export class Producto {
    nombre:string;
    stock:number;
    proveedor:string;
    categoria:string;
    precioCompra:number;
    precioVenta:number;
    vencimiento:Date;

    constructor(nombre?:string, stock?:number, proveedor?:string, 
        categoria?:string, precioCompra?:number, precioVenta?:number, vencimiento?:Date){
            this.nombre = nombre;
            this.stock = stock;
            this.proveedor = proveedor;
            this.categoria = categoria;
            this. precioCompra = precioCompra;
            this.precioVenta = precioVenta;
            this.vencimiento = vencimiento;
        }

}
