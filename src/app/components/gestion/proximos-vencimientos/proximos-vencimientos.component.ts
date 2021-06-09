import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-proximos-vencimientos',
  templateUrl: './proximos-vencimientos.component.html',
  styleUrls: ['./proximos-vencimientos.component.css']
})
export class ProximosVencimientosComponent implements OnInit {

  productos:Array<Producto>;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos():void{
  
  }

  agregarProducto():void{
    this.router.navigate(["productos/alta"]);
  }

}
