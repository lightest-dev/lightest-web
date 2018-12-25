import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('success');
  }
}
