import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarritoCompraComponent } from './components/petshop/carrito-compra/carrito-compra.component';
import { CatalogoComponent } from './components/petshop/catalogo/catalogo.component';
import { ProductoComponent } from './components/petshop/producto/producto.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'tienda', component: CatalogoComponent},
  {path: 'tienda/product', component: ProductoComponent},
  {path: 'tienda/product/:id', component: ProductoComponent},
  {path: 'carrito-compra', component: CarritoCompraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
