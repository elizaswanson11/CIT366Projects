import { Injectable, Output, EventEmitter} from "@angular/core";
import {Contact} from './contact.model';
import {Subject} from "rxjs/Subject";
import {Headers, Response} from "@angular/http";
import {Http} from "@angular/http";

@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent =  new Subject<Contact[]>();
  constructor(private http: Http) {
    this.initContacts();
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
    this.storeContacts(this.contacts.slice());
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
    this.storeContacts(this.getContacts());

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
    this.storeContacts(this.contacts);
  }

  initContacts() {
    return this.http.get('https://angular-and-nodejs.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      ).subscribe((contactsReturned: Contact[]) => {
        this.contacts = contactsReturned;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      })
  }

  storeContacts(contacts: Contact[]) {
    JSON.stringify(contacts);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://angular-and-nodejs.firebaseio.com/contacts.json',
      contacts,
      {headers: headers}).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  };
}

