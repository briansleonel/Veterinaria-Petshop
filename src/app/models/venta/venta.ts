import { Pago } from "../pago/pago";
import { Producto } from "../producto/producto";
import { Usuario } from "../usuario/usuario";

export class Venta {
    fecha : Date;
    medioEnvio : string;
    productos : Array<Producto>;
    pago: Pago;
    usuario: Usuario;
}
