import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms'


//SERVICIOS Y MODELOS
import { Notebook } from './../../../../core/models/notebook.model'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  formNotebook: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef:  MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notebook
  ) { }


  ngOnInit(): void {
    this.formNotebook = this.formBuilder.group({
      codeBar: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      percentDiscount: ['', Validators.required],
      total: ['', Validators.required]
    });
  }


  


}
