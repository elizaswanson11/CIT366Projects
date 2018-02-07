import { Component, OnInit, Input} from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
@Input() message: Message;
  messageSender: string = "";
  constructor() { }

  ngOnInit() {
    this.messageSender = Contact.name;
  }

}
