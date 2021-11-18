import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVendorsComponent } from './table-vendors.component';

describe('TableVendorsComponent', () => {
  let component: TableVendorsComponent;
  let fixture: ComponentFixture<TableVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
