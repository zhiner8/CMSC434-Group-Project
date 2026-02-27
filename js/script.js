
/* Adapted code from:
 https://www.w3schools.com/howto/howto_js_tabs.asp 
 https://www.w3schools.com/howto/howto_js_tab_header.asp
*/ 

function openTab(evt, tab) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablink" and remove the class "active"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
} 
function openNotif() {
  document.getElementById("notification").style.display = "block";
}

function closeNotif() {
  document.getElementById("notification").style.display = "none";
}
function showChoices() {
  var radios = document.getElementsByName("season");
  var selectedFood = "None";

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedFood = radios[i].value;
      break;
    }
  }

  var selectedColor = document.getElementById("colorChoice").value;

  document.getElementById("choices-result").textContent =
    "you chose the food: " + selectedFood + " and the color: " + selectedColor + "!";
}

function addTodo() {
  var input = document.getElementById("todoInput");
  var text = input.value.trim();

  if (text === "") {
    return;
  }

  var li = document.createElement("li");
  li.className = "todo-item";

  var span = document.createElement("span");
  span.textContent = text;
  span.onclick = function () {
    li.classList.toggle("crossed-off");
  };

  var deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("todoList").appendChild(li);
  input.value = "";
}