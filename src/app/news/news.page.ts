import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  messages = [
    {
      user: 'david',
      createdAt: 1554090856000,
      msg: 'Hey whats up?'
    },
    {
      user: 'Finn',
      createdAt: 1554090956000,
      msg: 'cool bro and u?'
    },
    {
      user: 'david',
      createdAt: 1554090856000,
      msg: 'Good, you said 2 packs right?'
    },
    {
      user: 'Finn',
      createdAt: 1554091056000,
      msg: 'Yeah, at src now. Will be waiting'
    },
    {
      user: 'david',
      createdAt: 1554091256000,
      msg: 'okay, will be there with it soon'
    },
    {
      user: 'Finn',
      createdAt: 1554091356000,
      msg: '...waiting'
    }
  ]

  currentUser = 'david';

  newMsg = '';
  @ViewChild(IonContent, {static: false}) ionContent: IonContent;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    this.messages.push({
      user:'david',
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';

    setTimeout(()=> {
      this.ionContent.scrollToBottom(200);
    });

  }

  openAbout(){
    this.router.navigate(['about']);
  }

}
