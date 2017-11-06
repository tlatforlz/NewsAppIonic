import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NewsService } from '../../app/services/news.service';


class News {
    Id: String;
    Title: String;
    Content: String;
    Views: Number;
    Author: String;
    Image: String;
    DateCreate: String;
}
@Component({
    selector: 'news',
    templateUrl: 'news.html',
    styles: ['news.scss']

})
export class NewsPage {
    public NewsId: any;
    public NewsDetail: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private NewsService: NewsService) {
        this.NewsId = navParams.get("NewsId");
        console.log(this.NewsId);
    }

    ngOnInit() {
        console.log(this.NewsId);
        this.NewsService.getNews(this.NewsId).subscribe(res => {
            console.log(res);
            parseJsonToObject(res.news).then(w => {
                this.NewsDetail = w;
                console.log(this.NewsDetail);
            });
        });

        function parseJsonToObject(object) {
            return new Promise(function (resolve, reject) {
                var news = new News();
                news.Id = object._id;
                news.Image = object.image;
                news.Content = object.content;
                news.Author = object.author;
                news.Title = object.title;
                news.DateCreate = object.createDate;
                news.Views = object.views;
                if (news != undefined) {
                    return resolve(news);
                }
                return reject(null);
            });
        }
    }

    loadHomePage() {
        this.navCtrl.push(HomePage);
    }

}
