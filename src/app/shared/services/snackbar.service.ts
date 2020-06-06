import {Injectable} from '@angular/core';
import {Message} from '../models/Message';
import {MessageComponent} from '../../message/message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {}

  showSnackBar(message: Message) {
    this.snackBar.openFromComponent(MessageComponent, { data: message,
      panelClass: message.isError ? ['snackbar-error-message'] : ['snackbar-success-message'] } );
  }
}
