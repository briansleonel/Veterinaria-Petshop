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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
