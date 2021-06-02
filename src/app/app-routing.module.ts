import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarritoCompraComponent } from './components/petshop/carrito-compra/carrito-compra.component';
import { CatalogoComponent } from './components/petshop/catalogo/catalogo.component';
import { ConfirmarPedidoComponent } from './components/petshop/confirmar-pedido/confirmar-pedido.component';
import { ContinuarCompraComponent } from './components/petshop/continuar-compra/continuar-compra.component';
import { ProductoComponent } from './components/petshop/producto/producto.component';
import { SeleccionEnvioComponent } from './components/petshop/seleccion-envio/seleccion-envio.component';
import { SeleccionPagoComponent } from './components/petshop/seleccion-pago/seleccion-pago.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tienda', component: CatalogoComponent},
  {path: 'tienda/product', component: ProductoComponent},
  {path: 'tienda/product/:id', component: ProductoComponent},
  {path: 'carrito-compra', component: CarritoCompraComponent},
  {path: 'carrito-compra/select-pago', component: SeleccionPagoComponent},
  {path: 'carrito-compra/select-pago/select-envio', component: SeleccionEnvioComponent},
  {path: 'carrito-compra/select-pago/select-envio/detalles', component: ConfirmarPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }