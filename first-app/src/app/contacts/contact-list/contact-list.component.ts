import {Component, OnInit, Input} from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  //custom EventEmitter object whose data type is of the Contact data type

  constructor(private contactService: ContactService) {}

  @Input() contacts: Contact[] = [];

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contactArray: Contact[]) => {
          this.contacts = contactArray;
        }
      );
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
