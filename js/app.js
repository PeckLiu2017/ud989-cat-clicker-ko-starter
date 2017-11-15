var initialCats = [
  {
    clickCount : 0,
    name : 'Tabby',
    imgSrc : 'img/434164568_fea0ad4013_z.jpg',
    imageAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
    nicknames : ['Tabtab','T-Bone','Mr.T','Tabitha Tab Tabby Catty Cat']
  },
  {
    clickCount : 0,
    name : 'Tiger',
    imgSrc : 'img/4154543904_6e2428c421_z.jpg',
    imageAttribution : 'https://www.flickr.com/photos/xshamx/4154543904',
    nicknames : ['Tigger']
  },
  {
    clickCount : 0,
    name : 'Scaredy',
    imgSrc : 'img/22252709_010df3379e_z.jpg',
    imageAttribution : 'https://www.flickr.com/photos/kpjas/22252709',
    nicknames : ['Casper']
  },
  {
    clickCount : 0,
    name : 'Shadow',
    imgSrc : 'img/1413379559_412a540d29_z.jpg',
    imageAttribution : 'https://www.flickr.com/photos/malfet/1413379559',
    nicknames : ['Shadow']
  },
];

var Cat = function (data) {
  // 这样看起来很难看，但必须这样封装一层，否则我找不到其它让它不报错的方法
  this.clickCount = ko.observable(data.clickCount);
  this.name = data.name;
  this.imgSrc = data.imgSrc;
  this.imageAttribution = data.imageAttribution;
  this.nicknames = data.nicknames;

  this.title = ko.computed(function () {
    var title;
    var clicks = this.clickCount();
    if (clicks < 10) {
      title = 'Newborn';
    } else if (clicks < 50) {
      title = 'Infant';
    } else if (clicks < 100) {
      title = 'Child';
    } else if (clicks < 200) {
      title = 'Teen';
    } else if (clicks < 500) {
      title = 'Adult';
    } else {
      title = 'Ninja';
    }
    return title;
  },this);
}


var ViewModel = function () {
  var self = this;
  this.catList = ko.observableArray([]);

  initialCats.forEach(function (catItem) {
    self.catList.push( new Cat(catItem) );
  });

  this.currentCat = ko.observable( this.catList()[0] );

  this.incrementCounter = function () {
    // 当用了 with 之后，以 view 为准，我们已经身处 Cat 的上下文之中，这里的 this 指的是 Cat
    // 如果没有将将 ViewModel 储存在 self 中，this.clickCount(this.clickCount() + 1);
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  // 这里的 clickedCat 是 with:currentCat 中的 cat
  this.setCat = function (clickedCat) {
    self.currentCat(clickedCat);
  };
}

ko.applyBindings(new ViewModel());
