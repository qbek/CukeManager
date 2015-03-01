define(function () {
  String.prototype.getDescriptionElement = function (label) {
    var startIndex = this.search(label);
    if(startIndex == -1) {
      return null;
    }

    startIndex += label.length;
    var element = this.substr(startIndex);
    var endIndex = element.search('(!\\w+:)|(!\\w+\\s\\w+:)');
    if(endIndex != -1) {
      element = element.slice(0, endIndex);
    }
    return element.trim();
  };
});

