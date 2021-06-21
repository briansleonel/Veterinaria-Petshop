import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private ventaService: VentaService
  ) { }

  ngOnInit(): void {
  }

  habilitarCarrito():boolean{
    if(this.ventaService.venta.productos.length!=0)
      return true;
    else
      return false;
  }
}
