import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { CatalogoComponent } from './components/petshop/catalogo/catalogo.component';
import { ProductoComponent } from './components/petshop/producto/producto.component';
import { CarritoCompraComponent } from './components/petshop/carrito-compra/carrito-compra.component';
import { FormsModule } from '@angular/forms';
import { ContinuarCompraComponent } from './components/petshop/continuar-compra/continuar-compra.component';
import { ProductosComponent } from './components/gestion/productos/productos.component';
import { SeleccionPagoComponent } from './components/petshop/seleccion-pago/seleccion-pago.component';
import { SeleccionEnvioComponent } from './components/petshop/seleccion-envio/seleccion-envio.component';
import { ConfirmarPedidoComponent } from './components/petshop/confirmar-pedido/confirmar-pedido.component';
import { NgxDataTableModule } from 'angular-9-datatable';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    CatalogoComponent,
    ProductoComponent,
    CarritoCompraComponent,
    ContinuarCompraComponent,
    ProductosComponent,
    SeleccionPagoComponent,
    SeleccionEnvioComponent,
    ConfirmarPedidoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }