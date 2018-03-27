import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact.model";
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Document} from "../../documents/document.model";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;
  invalidGroupContact: boolean = false;
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          var id = params['id'];
          if (!id) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(id);
          if (!this.originalContact) {
            return;
          }
          // set editMode to true
          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.hasGroup) {
            this.contact.group = this.contact.group.slice();
          }
        }
      );
  }
  onSubmit(form: NgForm) {
    //   values = form.value // get values from form’s fields
    console.log(this.editMode);
    let newContact = new Contact('', form.value.name, form.value.email, form.value.phone, form.value.imageUrl, this.groupContacts);
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    };
    //   route back to the '/documents' URL
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  isInvalidContact(newContact: Contact) {
    if(!newContact) {
      return true;
    }
    if (newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if(newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    console.log(this.invalidGroupContact);
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact === true) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx > 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
