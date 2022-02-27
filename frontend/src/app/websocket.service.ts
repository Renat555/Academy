import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {
    this.socket = webSocket(environment.apiWss);
  }

  socket: WebSocketSubject<any>;

  connect() {
    if (!this.socket || this.socket.closed) {
      this.socket = webSocket(environment.apiWss);
    }
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
