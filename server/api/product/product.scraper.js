/**
 * Created by christophelazantsy on 14/07/15.
 */
var http = require('http');
var cheerio = require('cheerio');
var util = require('util');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var STATUS_CODES = http.STATUS_CODES;
/*
 * Scraper Constructor
 **/
function Scraper(url) {

  this.url = url;
  this.model = {};
  this.init();
}
/*
 * Make it an EventEmitter
 **/
util.inherits(Scraper, EventEmitter);

/*
 * Initialize scraping
 **/
Scraper.prototype.init = function () {

  var self = this;

  console.log('init');

  self.on('loaded', function (html) {
    model = self.parsePage(html);
    self.emit('complete', model);
  });
  self.loadWebPage();
};

Scraper.prototype.loadWebPage = function () {
  var self = this;
  console.log('\n\nLoading ' + self.url);
  http.get(self.url, function (res) {
    var body = '';
    if (res.statusCode !== 200) {
      return self.emit('error', STATUS_CODES[res.statusCode]);
    }
    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('end', function () {
      self.emit('loaded', body);
    });
  })
    .on('error', function (err) {
      self.emit('error', err);
    });
};

/*
 * Parse html and return an object
 **/
Scraper.prototype.parsePage = function (html) {
  var image, prix, name, images = [];
  var $ = cheerio.load(html,
    {
      normalizeWhitespace: true,
      xmlMode: false,
      decodeEntities: false
    });


  name = $('h1 span').attr('itemprop', 'name').text();


  $('div div div img').each(function () {
    if ($(this).hasClass('js-ProductSticky-imageSource')) {
      image = this.attribs.src;
    }
    ;
     //specifications

    $('section div').each(function(){
      //console.log(this);
      if ($(this).hasClass('specifications')) {
        console.log(this.attribs.class);
      }

    });

    /*console.log('$(this)');
     console.log($(this));*/
    if (this.attribs && this.attribs.src) {

      _.forEach(this.attribs, function (value, attr, data) {
        console.log(attr + ' : ' + value);
        images.push(data);

      });

      //console.log(images);
      /*console.log("this.attribs");
       console.log(this.attribs);
       console.log("this.attribs.src");
       console.log(this.attribs.src);*/
    }


    /* if ($(this).hasClass('PictoVisualsList')) {
     console.log(this.attribs.src);
     images.push(this.attribs.src);
     }; */

  });

  $('li div div div strong').each(function (i, elem) {
    if ($(this).hasClass('product-price')) {
      prix = this.children[0].data;
    }
  });

  var model = {
    name: name,
    prix: prix,
    images: image

  };
  return model;
};
module.exports = Scraper;
