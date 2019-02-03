import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MessageComponent} from '../../message/message.component';
import {Message} from '../models/Message';

@Injectable()
export class AuthErrorMsgService {
  messageInfo: Message = {message: '', isError: true};
  constructor(public snackBar: MatSnackBar,){}

  public handleLoginError(error) {
    if(400) { // check error status
      this.messageInfo.message = 'error';
      this.snackBar.openFromComponent(MessageComponent, { data: this.messageInfo, panelClass: ['snackbar-error-message']});
    }
  }

  public handleRegistrationError(error) {
    if(400) { // check error status
      this.messageInfo.message = 'error';
      this.snackBar.openFromComponent(MessageComponent, { data: this.messageInfo, panelClass: ['snackbar-error-message']});
    }
  }
}
