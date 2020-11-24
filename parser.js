var sitemaps = require("sitemap-stream-parser");
var path = require("path");
var fs = require("fs");
var urls = [
  "http://bankiros.lcl:8082/sitemap-credits.xml",
  "http://bankiros.lcl:8082/sitemap-deposits.xml",
  "http://bankiros.lcl:8082/sitemap-debit-cards.xml",
  "http://bankiros.lcl:8082/sitemap-credit-cards.xml",
  "http://bankiros.lcl:8082/sitemap-bank.xml",
  "http://bankiros.lcl:8082/sitemap-bank-deposits.xml",
  "http://bankiros.lcl:8082/sitemap-bank-debit-cards.xml",
  "http://bankiros.lcl:8082/sitemap-bank-credits.xml",
  "http://bankiros.lcl:8082/sitemap-bank-credits_1.xml",
  "http://bankiros.lcl:8082/sitemap-bank-credit-cards.xml",
  "http://bankiros.lcl:8082/sitemap-bank-departments.xml",
  "http://bankiros.lcl:8082/sitemap-bank-bankomats.xml",
  "http://bankiros.lcl:8082/sitemap-bank-currency.xml",
  "http://bankiros.lcl:8082/sitemap-currency.xml",
  "http://bankiros.lcl:8082/sitemap-calculator.xml",
  "http://bankiros.lcl:8082/sitemap-bank-otzyvy.xml",
  "http://bankiros.lcl:8082/sitemap-zaymy.xml",
  "http://bankiros.lcl:8082/sitemap-mfo.xml",
  "http://bankiros.lcl:8082/sitemap-otzyvy.xml",
  "http://bankiros.lcl:8082/sitemap-other.xml",
  "http://bankiros.lcl:8082/sitemap-exchange.xml",
  "http://bankiros.lcl:8082/sitemap-product.xml",
  "http://bankiros.lcl:8082/sitemap-stati.xml",
  "http://bankiros.lcl:8082/sitemap-archive-cbrf.xml",
  "http://bankiros.lcl:8082/sitemap-archive-currency.xml",
  "http://bankiros.lcl:8082/sitemap-rating.xml",
  "http://bankiros.lcl:8082/sitemap-zaymy-product.xml",
  "http://bankiros.lcl:8082/sitemap-crypto.xml",
  "http://bankiros.lcl:8082/sitemap-authors.xml",
  "http://bankiros.lcl:8082/sitemap-faq.xml",
  "http://bankiros.lcl:8082/sitemap-rko.xml",
  "http://bankiros.lcl:8082/sitemap-mfo-otzyvy.xml",
];
var ___urls = ["http://bankiros.lcl:8082/sitemap.xml"];
var all_urls = [];
var limited_urls = [];
var tempUrls = [];
var xmlDoc = "";
const urlPrefix = /http\:\/\/bankiros.lcl\//;

function cutDomain(el, arrToPush) {
  var temp = el.replace(urlPrefix, "http://bankiros.lcl:8082/");
  arrToPush.push(temp);
}

var parseAll = function () {
  sitemaps.parseSitemaps(
    urls,
    function (url) {
      tempUrls.push(url);
    },
    function (err, sitemaps) {
      tempUrls.forEach((el) => {
        cutDomain(el, all_urls);
      });
      var str = all_urls.join();

      fs.writeFile("all_links.txt", str, function (error) {
        if (error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена");
      });

      console.log("All URLS written!");
      console.log(all_urls);
    }
  );
};

var parseLimited = function () {
  sitemaps.parseSitemaps(
    urls,
    function (text, url) {
      if (xmlDoc != url) {
        tempUrls.push(text);
        xmlDoc = url;
      }
    },
    function (err, sitemaps) {
      tempUrls.forEach((el) => {
        cutDomain(el, limited_urls);
      });

      var str = limited_urls.join();

      fs.writeFile("limited_links.txt", str, function (error) {
        if (error) throw error; // если возникла ошибка
        console.log("Асинхронная запись файла завершена");
      });

      console.log("All Limited URLS written!");
      console.log(limited_urls);
    }
  );
};

parseAll();
