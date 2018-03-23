import { Injectable, Output, EventEmitter} from "@angular/core";
import {Contact} from './contact.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent =  new Subject<Contact[]>();
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  getContacts(): Contact[] {
    console.log(this.contacts.slice());
    return this.contacts.slice();
  }
  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }
  getMaxId() {
    var maxId = 0;
    for (var i = 0; i < this.contacts.length; i++) {
      var currentId = +this.contacts[i].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    //if newDocument is undefined or null then return
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    //push newDocument onto the documents list
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
    // documentsListClone = documents.slice()
    // documentListChangedEvent.next(documentsListClone)
  }

  updateContact(originalContact: Contact,
                updatedContact: Contact) {
    if (!originalContact) {
      return;
    }

    var pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    updatedContact.id = originalContact.id;
    this.contacts[pos] = updatedContact;
    this.contactListChangedEvent.next(this.getContacts());

  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    var pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts);
  }
}

