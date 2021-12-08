import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccesfulyComponent } from './dialog-succesfuly.component';

describe('DialogSuccesfulyComponent', () => {
  let component: DialogSuccesfulyComponent;
  let fixture: ComponentFixture<DialogSuccesfulyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSuccesfulyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuccesfulyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
