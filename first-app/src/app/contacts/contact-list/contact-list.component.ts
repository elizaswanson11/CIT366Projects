import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  //custom EventEmitter object whose data type is of the Contact data type
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(
      1,
      "Bro. Jackson",
      "jacksonk@byui.edu",
      "208-496-3771",
      null,
      "https://web.byui.edu/Directory/Employee/jacksonk.jpg"),
    new Contact(
      2,
      "Bro. Barzee",
      "barzeer@byui.edu",
      "208-496-3768",
      null,
      "https://web.byui.edu/Directory/Employee/barzeer.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }

}
