import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewVendorComponent } from './dialog-new-vendor.component';

describe('DialogNewVendorComponent', () => {
  let component: DialogNewVendorComponent;
  let fixture: ComponentFixture<DialogNewVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
