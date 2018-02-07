import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild ('subject') subjectRef: ElementRef;
  @ViewChild ('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Eliza';

  onSendMessage() {
    //get the value stored in the subject input element
    const getSubject = this.subjectRef.nativeElement.value;
    //get the value stored in the msgText input element
    const getMsgText = this.msgTextRef.nativeElement.value;
    //get the current sender
    const senderName = this.currentSender;
    //Create a new Message object
    const newMessage = new Message (21, getSubject, getMsgText, senderName);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {

  }
  constructor() { }

  ngOnInit() {
  }

}
