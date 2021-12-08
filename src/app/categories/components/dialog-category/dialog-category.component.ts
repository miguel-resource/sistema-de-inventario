import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoriesService } from './../../../core/services/categories/categories.service'
import { Category  } from './../../../core/models/category.model'
@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {
  formCategory: FormGroup = new FormGroup({});

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogCategoryComponent>,
  ) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  createCategory(): void {
    let category: Category = {
      name: this.formCategory.controls['name'].value
    }

    this.categoriesService.create(category).then(() => {
      this.dialogRef.close();
    })
  }

}
