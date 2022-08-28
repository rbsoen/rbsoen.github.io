"use strict";

(function(d){
  // apply some operation to all of query
  function applyToAll(query, callback) {
    for (
      var i=0, all_matches = d.querySelectorAll(query);
      i < all_matches.length;
      i++
    ){
      callback(all_matches[i]);
    }
  }

  // define a bind alias
  function bindToAll(query, event_name, callback) {
    // skip if unsupported
    if (!"querySelectorAll" in d) return;

    for (
      var i=0, all_matches = d.querySelectorAll(query);
      i < all_matches.length;
      i++
    ) {
      all_matches[i].addEventListener(event_name, callback);
    }
  }

  // for scrolling stuff
  function whenElementInView(query_or_element, callback) {
    if (query_or_element instanceof Element) {
      var item = query_or_element;
    } else {
      if (!"querySelector" in d) return;
      var item = d.querySelector(query_or_element);
    }

    var rect = item.getBoundingClientRect();

    if (
      rect.top > -1 &&
      rect.left > -1 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ){
      callback(item);
    }
  }

  /**************** main page function ***************************/

  // split whatever is inside "fly-words-in"
  applyToAll("._fly-words-in", function(i){
    // create word nodes
    var elementList = [];
    for (
      var c = 0, word, words = i.innerText.split(" ");
      word = words[c];
      c++
    ) {
      // sets the "bounding box" of the word
      var wordElementContainer = d.createElement("span");
      wordElementContainer.classList.add("_word");
      // word animation itself
      var wordElement = d.createElement("span");
      wordElement.classList.add("_hidden");
      wordElement.appendChild(
        d.createTextNode(word + " ")
      );
      wordElementContainer.appendChild(wordElement);
      elementList.push(wordElementContainer);
    }
    // delete what was originally in the text
    while (i.firstChild) i.removeChild(i.firstChild);
    // add back in the words as a bunch of span
    for (
      var c = 0, word;
      word = elementList[c];
      c++
    ){
      i.appendChild(word);
    }
  });

  setInterval(function() {
  // preferable to naively adding a "scroll" event listener

    applyToAll("._triggerable._fly-words-in", function(i){
      whenElementInView(i, function(i){
        for (
          var c = 0, item, length = i.children.length;
          c < length;
          c++
        ){
          item = i.children[c].children[0];
          // animate elements one by one
          setTimeout(function(e){
            e.classList.remove("_hidden");
            e.classList.add("_visible");
          }, c*100, item)
        }
      });
    });

  }, 300);

})(document);
