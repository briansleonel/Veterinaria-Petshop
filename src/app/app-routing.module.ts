import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarritoCompraComponent } from './components/petshop/carrito-compra/carrito-compra.component';
import { CatalogoComponent } from './components/petshop/catalogo/catalogo.component';
import { ConfirmarPedidoComponent } from './components/petshop/confirmar-pedido/confirmar-pedido.component';
import { ProductoComponent } from './components/petshop/producto/producto.component';
import { SeleccionEnvioComponent } from './components/petshop/seleccion-envio/seleccion-envio.component';
import { SeleccionPagoComponent } from './components/petshop/seleccion-pago/seleccion-pago.component';
import { ProductoformComponent } from './components/gestion/productoform/productoform.component';
import { ProductosComponent } from './components/gestion/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { ProximosVencimientosComponent } from './components/gestion/proximos-vencimientos/proximos-vencimientos.component';
import { ProveedoresComponent } from './components/gestion/proveedores/proveedores.component';
import { CategoriasComponent } from './components/gestion/categorias/categorias.component';
import { UsuariosComponent } from './components/gestion/usuarios/usuarios.component';
import { UsuarioformComponent } from './components/gestion/usuarioform/usuarioform.component';
import { ReportesComponent } from './components/gestion/reportes/reportes.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'tienda', component: CatalogoComponent},
  {path: 'tienda/product/:id', component: ProductoComponent},
  {path: 'carrito-compra', component: CarritoCompraComponent},
  {path: 'carrito-compra/select-pago', component: SeleccionPagoComponent},
  {path: 'carrito-compra/select-envio', component: SeleccionEnvioComponent},
  {path: 'carrito-compra/detalles', component: ConfirmarPedidoComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'form-producto/:id', component: ProductoformComponent},
  {path: 'login', component: LoginComponent},
  {path: 'proximos-vencimientos', component: ProximosVencimientosComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'form-usuario/:id', component: UsuarioformComponent},
  {path: 'reportes', component: ReportesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }