import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
messages: Message[] = [
  new Message(1, 'Subject 1', 'Note 1', 'Joe'),
  new Message(2, 'to Jason', 'Hey whats up dude bro', 'Eliza'),
  new Message(2, 'Heyy', 'LOL', 'Lydia'),
];
  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
