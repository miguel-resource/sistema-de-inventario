import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//Model
import { Notebook } from './../../../../core/models/notebook.model'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogRef:  MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notebook
  ) { }

  ngOnInit(): void {
  }

}
