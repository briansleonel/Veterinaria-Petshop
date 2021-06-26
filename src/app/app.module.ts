//dependencias tools
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import  { NgxPaginationModule }  from  'ngx-pagination' ; 
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuccesBuysComponent } from './components/utils/succes-buys/succes-buys.component';
import { NgxDataTableModule } from 'angular-9-datatable';

//componentes
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
import { ProximosVencimientosComponent } from './components/gestion/proximos-vencimientos/proximos-vencimientos.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { ProveedoresComponent } from './components/gestion/proveedores/proveedores.component';
import { CategoriasComponent } from './components/gestion/categorias/categorias.component';
import { ProductoformComponent } from './components/gestion/productoform/productoform.component';
import { ConfirmDialogComponent } from './components/utils/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from './services/usuario/usuario.service';



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
    SuccesBuysComponent,
    ProximosVencimientosComponent,
    ProveedoresComponent,
    CategoriasComponent,
    ProductoformComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AlifeFileToBase64Module,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(), 
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }