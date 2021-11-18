import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';


import { MatDialog } from '@angular/material/dialog';
import { DialogNotificationComponent } from './dialog-notification/dialog-notification.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-system';
  centered = false;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private dialog: MatDialog
  ){}
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  dialogOpen():void {
    const dialogRef = this.dialog.open(DialogNotificationComponent);
  }
}
