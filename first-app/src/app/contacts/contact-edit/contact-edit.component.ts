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

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // id = value of id parameter in params list
          const id = params['id'];
          // if id parameter is undefined or null then set editMode to false
          if (!id) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(id);
          if (this.originalContact) {
            return;
          }
          // set editMode to true
          this.editMode = true;
          // this.document = clone of this.originalDocument (parse
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.contact.group) {
            this.contact.group = this.contact.group.slice();
          }
        }
      );
  }
  onSubmit(form: NgForm) {
    //   values = form.value // get values from form’s fields
    const values = form.value;
    let newContact = new Contact('1', values.name, values.email, values.phone, values.url, null);
    if (this.editMode = true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    };
    //   route back to the '/documents' URL
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

}
