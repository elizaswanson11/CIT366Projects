import { Injectable, EventEmitter, Output } from '@angular/core';
import { Message } from './message.model';
import {Response} from "@angular/http";
import 'rxjs/Rx' ;
import { Http } from "@angular/http";
import { Headers } from '@angular/http';

@Injectable()
export class MessagesService {
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;
  constructor(private http: Http) {
    this.initMessages();
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.filter((message: Message)=> {
      return message.id === id;
    })[0] || null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages(this.messages.slice());
  }

  getMaxId() {
    var maxId = 0;
    for (var i = 0; i < this.messages.length; i++) {
      var currentId = +this.messages[i].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  initMessages() {
    return this.http.get('https://angular-and-nodejs.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      ).subscribe((messagesReturned: Message[]) => {
        this.messages = messagesReturned;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      })
  }

  storeMessages(messages: Message[]) {
    JSON.stringify(messages);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://angular-and-nodejs.firebaseio.com/messages.json',
      messages,
      {headers: headers}).subscribe(() => {
      this.messageChangeEvent.next(this.messages.slice());
    });
  };

}
