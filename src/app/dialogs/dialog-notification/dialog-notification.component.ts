import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../core/services/notification/notification.service'
import { Notification } from '../../core/models/notification.model'

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.scss']
})
export class DialogNotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.getAll().subscribe((resp: any) => {
      this.notifications = resp.map((e: any) => {
        return {
          name: e.payload.doc.data().name ,
          information: e.payload.doc.data().information,
          date: e.payload.doc.data().date,
          state: e.payload.doc.data().state
        }
      })
    })
  }

}
