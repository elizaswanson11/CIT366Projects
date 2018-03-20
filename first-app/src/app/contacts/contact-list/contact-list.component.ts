import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from "../contact.service";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
  //custom EventEmitter object whose data type is of the Contact data type
  subscription: Subscription;

  constructor(private contactService: ContactService) {}

  @Input() contacts: Contact[] = [];

  contactListChangedEvent = new Subject<Contact[]>();

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent
      .subscribe(
        (contactArray: Contact[]) => {
          this.contacts = contactArray;
        }
      );
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
