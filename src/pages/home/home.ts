import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';

class News {
  Title: String;
  Content: String;
  Views: Number;
  Author: String;
  Image: String;
}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: ['home.scss']
})

export class HomePage {
  Top: any;
  First: any;
  constructor(public navCtrl: NavController, private NewsService: NewsService) {

  }


  ngOnInit() {
    this.NewsService.getTop(1).subscribe(res => {
      this.Top = res.news;
      this.First = res.news[0];
      console.log(this.First);
    });

    function parseJsonToObject(object) {
      var news = new News();
      news.Image = object.image;
      news.Author = object.author;
      news.Title = object.title;
      return news;
    }
  }
}
