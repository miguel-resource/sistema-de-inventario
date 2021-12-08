import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-succesfuly',
  templateUrl: './dialog-succesfuly.component.html',
  styleUrls: ['./dialog-succesfuly.component.scss']
})
export class DialogSuccesfulyComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogSuccesfulyComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string
  ) { }

  ngOnInit(): void {
  }

}
