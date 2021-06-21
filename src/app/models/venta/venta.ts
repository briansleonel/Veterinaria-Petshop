import { Pago } from "../pago/pago";
import { Producto } from "../producto/producto";

export class Venta {
    fecha : Date;
    medioEnvio : string;
    productos : Array<Producto>;
    pago: Pago
}
