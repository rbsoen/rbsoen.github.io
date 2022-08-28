const Database = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
let current_db_request;
let current_db;
const DB_NAME = "Activity Log";

function queryDb(name) {
    return new Promise((resolve, reject) =>{
        current_db_request = Database.open(name, 1);

        current_db_request.onupgradeneeded = (e) => {
            console.log(e);
            current_db = e.target.result;
            switch(e.oldVersion) {
                case 0:
                    let activity_store = current_db.createObjectStore("Activities", {autoIncrement: true, keyPath: "id"});
                    activity_store.createIndex("date", "datetime");
                    let todo_store = current_db.createObjectStore("ToDo", {autoIncrement: true, keyPath: "id"});
                    todo_store.createIndex("todo", ["datetime", "completed_by"]);
                    let note_store = current_db.createObjectStore("Notes", {autoIncrement: true, keyPath: "id"});
                    note_store.createIndex("date", "datetime");
                    break;
                default:
                    break;
            }
        };

        current_db_request.onsuccess = (e) => {
            current_db = e.target.result;
            resolve();
        }

        current_db_request.onerror = (e) => {
            reject("Error opening DB: " + e.target.errorCode);
        }
    });
}


/*
 * Custom alert stuff
 */
function __alert(text) {
    console.log(text);
    var new_alert = document.getElementById("alerts").__make(
        "li~" + text
    );
    setTimeout((e)=>{
        new_alert.parentNode.removeChild(new_alert);
    }, 3000)
}

/*
 * Allows interfacing with forms by using its ID.
 */
class ReactiveForm {
    #name;
    element;
    get name() { return this.#name; }
    set name(n) { // n: string
        this.#name = n;
        this.element = document.getElementById(n);
    }

    #enabled;
    get enabled() { return this.#enabled; }
    set enabled(e) { // e: boolean
        this.#enabled = e;
        this.element.hidden = !this.#enabled;
    }

    constructor(name) { // name: string (must be valid HTML element ID)
        this.name = name;
        this.enabled = false;

        // Attach a close event to our form
        for (
            let closeButton
            of
                this.element
                .getElementsByClassName("close-button")
        ) {
            closeButton.addEventListener("click",(e)=>{
                e.preventDefault();
                this.enabled = false;
            });
        }
    }

    attachSubmit(f) { // f: function()
        // Attach a submit event to our form
        console.log(this.element)
        this.element.addEventListener("submit", (e)=>{
            f(e, this);
            e.preventDefault();
        })
    }
}

/*
 * Make action list
 */
 function makeActionList(functions, completable) {
     // functions: object containing the following keys:
     // "view", "edit", "delete", each a function that takes a single argument "e" that is the activity ID
     // completable: boolean
     let list_contains = document.createElement("ul");
     list_contains.classList.add("action-list");
     let view_el = list_contains.__make("li", [["button~View"]]);
     if (completable) {
         let complete_el = list_contains.__make("li", [["button~Complete"]]);
         complete_el.firstElementChild.addEventListener("click", (e)=>{
             e.preventDefault();
             let selected_id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
             functions.complete(selected_id);
         })
     }
     let edit_el = list_contains.__make("li", [["button~Edit"]]);
     let delete_el = list_contains.__make("li", [["button~Delete"]]);
     view_el.firstElementChild.addEventListener("click", (e)=>{
         e.preventDefault();
         // firefox :(
         let selected_id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
         functions.view(selected_id);
     })
     edit_el.firstElementChild.addEventListener("click", (e)=>{
         e.preventDefault();
         // firefox :(
         let selected_id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
         functions.edit(selected_id);
     })
     delete_el.firstElementChild.addEventListener("click", (e)=>{
         e.preventDefault();
         // firefox :(
         let selected_id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
         functions.delete(selected_id);
     })
     return list_contains;
 }

// Add date

Date.prototype.__addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(
        date.getDate() + days
    );
    return date;
}
