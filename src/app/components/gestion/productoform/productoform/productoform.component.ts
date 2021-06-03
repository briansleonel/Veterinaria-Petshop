import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-productoform',
  templateUrl: './productoform.component.html',
  styleUrls: ['./productoform.component.css']
})
export class ProductoformComponent implements OnInit {

  producto:Producto;
  constructor() { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.img = "";
  }

  onFileChanges(files){
    console.log("File has changed:", files);
    console.log(this.producto.img);
    this.producto.img = files[0].base64;
    console.log(this.producto.img);
    }

}
