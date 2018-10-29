// Busines Logic for to do list
function ToDoList() {
  this.items = [],
  this.currentId = 0
}

ToDoList.prototype.addItem = function(item) {
  item.id = this.assignId();
  this.items.push(item);
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findItem = function(id) {
  for (var i=0; i< this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].id == id) {
        return this.items[i];
    }
  }
  };
  return false;
}

ToDoList.prototype.deleteItem = function(id) {
  for (var i=0; i< this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].id == id) {
        delete this.items[i];
        return true;
      }
    }
  };
  return false;
}
// Business Logic for list item ---------
function Item(name, description, timeDue, priority) {
  this.name = name,
  this.description = description,
  this.timeDue = timeDue,
  this.priority = priority
}


// User Interface
var toDoList = new ToDoList();

function displayItemDetails(toDoListToDisplay) {
  var itemsList = $("ul#items");
  var htmlForItemInfo = "";
  toDoListToDisplay.items.forEach(function(item) {
    htmlForItemInfo += "<li id=" + item.id + ">" + item.name + "</li>";
  });
  itemsList.html(htmlForItemInfo);
};

function showItem(itemId) {
  var item = toDoList.findItem(itemId);
  $("#show-item").show();
  $(".name").html(item.name);
  $(".description").html(item.description);
  $(".timeDue").html(item.timeDue);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + item.id + ">Delete</button>");
}

function attachItemListeners() {
  $("ul#items").on("click", "li", function() {
    showItem(this.id);
  });

  $("#buttons").on("click", ".deleteButton", function() {
    toDoList.deleteItem(this.id);
    $("#show-item").hide();
    displayItemDetails(toDoList);
  });
};

$(document).ready(function() {
  attachItemListeners();
  $("form#new-item").submit(function(event) {
    event.preventDefault();
    var inputtedName = $("input#new-name").val();
    var inputtedDescription = $("input#new-description").val();
    var inputtedTimeDue = $("input#new-timeDue").val();

    $("input#new-name").val("");
    $("input#new-description").val("");
    $("input#new-timeDue").val("");

    var newItem = new Item(inputtedName, inputtedDescription, inputtedTimeDue);
    toDoList.addItem(newItem);
    displayItemDetails(toDoList);
  });
});
