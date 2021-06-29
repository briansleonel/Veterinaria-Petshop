import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as printJS from 'print-js';

@Component({
  selector: 'app-succes-buys',
  templateUrl: './succes-buys.component.html',
  styleUrls: ['./succes-buys.component.css']
})
export class SuccesBuysComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SuccesBuysComponent>,
    @Inject (MAT_DIALOG_DATA) public res: string
  ) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

  imprimir(): void {
    printJS({
      printable: 'ComprobantePago',
      targetStyles: ['*'],
      documentTitle: 'Comprobante de pago',
      type: 'html'
    })
  }

}
