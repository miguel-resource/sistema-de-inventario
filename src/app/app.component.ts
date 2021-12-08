import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';


import { MatDialog } from '@angular/material/dialog';
import { DialogNotificationComponent } from './dialogs/dialog-notification/dialog-notification.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'inventory-system';
  centered = false;
  date = Date.now();

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  dialogOpen(): void {
    const dialogRef = this.dialog.open(DialogNotificationComponent, {
      width: '480px'
    });
  }
}
