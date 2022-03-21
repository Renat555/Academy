import { Injectable } from '@angular/core';
import { EMPTY, observable, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {
    this.socket = webSocket(environment.apiWss);

    this.socket.subscribe((x) => console.log(x));
  }

  socket: WebSocketSubject<any>;

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}
