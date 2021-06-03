import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mostrarPassword(){
    let elemento :any = document.getElementById('pass');
    if (elemento.type == "text"){
      elemento.type = "password";
    }else{
      elemento.type = "text"
    }
  }

}
