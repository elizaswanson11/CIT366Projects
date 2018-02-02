import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';


@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
// contact: {id: number, name: string, email: string, phone: string, group: any, imageUrl: string};
  @Input() contact: Contact;
  constructor() { }

  ngOnInit() {
  }

  // onSelected(contact: Contact){
  //   this.selectedContactEvent.emit(contact);
  // }
}
