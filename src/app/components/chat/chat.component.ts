import { ChatService } from '../../services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: any = [];
  message: string;
  connection: any;
  username: string;
  alert: any = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.username);
    this.message = '';
  }

  setUsername() {
    this.chatService.setUsername(this.username);
    this.alert = 'Username is set';
  }

}
