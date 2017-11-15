var Cat = function (data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imageAttribution = ko.observable(data.imageAttribution);
  this.nicknames = ko.observableArray(data.nicknames);

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
  this.currentCat = ko.observable( new Cat({
    clickCount : 0,
    name : 'Tabby',
    imgSrc : 'img/434164568_fea0ad4013_z.jpg',
    imageAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568',
    nicknames : ['Tabtab','T-Bone','Mr.T','Tabitha Tab Tabby Catty Cat']
  }) );
  this.incrementCounter = function () {
    // 当用了 with 之后，以 view 为准，我们已经身处 Cat 的上下文之中，这里的 this 指的是 Cat
    this.clickCount(this.clickCount() + 1);
    // 或者将 ViewModel 储存在 self 中，self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  }
}

ko.applyBindings(new ViewModel());
