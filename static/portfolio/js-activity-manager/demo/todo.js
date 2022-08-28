function getTodoById(id, callback) {
    id = parseInt(id);
    queryDb(DB_NAME)
       .then((e)=>{
           let tx = current_db.transaction("ToDo", "readonly");
           let txStore = tx.objectStore("ToDo");
           tx.oncomplete = (e)=>{
                callback(todo.result);
           }
           tx.onerror = (e)=>{
               __alert("Cannot fetch todo " + id);
           }

           todo = txStore.get(id);
       })
       .catch((e)=>{
           __alert(e);
       });
}

/*
 * Show the activities
 */
function updateTodo() {
    let table_container = document.getElementById("todo-list").tBodies[0];
    let completed_table_container = document.getElementById("completed-todo-list").tBodies[0];

    // remove everything in table first
    while (table_container.childElementCount) {
        table_container.removeChild(
            table_container.firstElementChild
        )
    }
    while (completed_table_container.childElementCount) {
        completed_table_container.removeChild(
            completed_table_container.firstElementChild
        )
    }

    // then display all To-dos
    queryDb(DB_NAME)
        .then((e)=>{
            let tx = current_db.transaction("ToDo", "readonly");
            let txStore = tx.objectStore("ToDo");
            let ixStore = txStore.index("todo");

            ixStore.openCursor(null, "next").onsuccess = (e)=>{
                var cursor = e.target.result;

                if (cursor) {
                    let startTime = Date.parse(new Date());
                    let endTime = Date.parse(new Date().__addDays(7));
                    let date = new Date(cursor.value.datetime);

                    let is_near = (
                        (startTime <= Date.parse(date)) &&
                        (Date.parse(date) <= endTime)
                    );

                    let IS_COMPLETABLE;
                    let TARGET;

                    IS_COMPLETABLE = (cursor.value.completed_by !== -1)
                    if (IS_COMPLETABLE) {
                        TARGET = completed_table_container;
                    } else {
                        TARGET = table_container;
                    }

                    let todo_row = TARGET.__make("tr");
                    todo_row.dataset.id = cursor.value.id;
                    if (cursor.value.datetime == -1) {
                        todo_row.__make(
                            "td~----"
                        );
                    } else {
                        if (is_near) {
                            todo_row.classList.add("near");
                        }

                        todo_row.__make(
                            "td~"
                                + strftime(
                                    "%Y-%m-%d %H:%M",
                                    date
                                )
                        );
                    }
                    todo_row.__make(
                        "td~" + cursor.value.title
                    );
                    todo_row.__make(
                        /* Create activities actions list */
                        "td", [makeActionList({
                            view: (id)=>{
                                console.log("view " + id);
                                // populate activity view
                                getTodoById(id, (todo)=>{
                                    document.getElementById("view-todo-title")
                                        .childNodes[0].nodeValue = todo.title;
                                    document.getElementById("view-todo-description")
                                        .childNodes[0].nodeValue = todo.description;
                                    if (todo.datetime !== -1) {
                                        document.getElementById("view-todo-date")
                                            .childNodes[0].nodeValue = new Date(todo.datetime).toString();
                                    }

                                    if (todo.completed_by != -1) {
                                        getActivityById(id, (activity)=>{
                                            document.getElementById("view-todo-completed")
                                                .childNodes[0].nodeValue = new Date(activity.datetime).toString();
                                        });
                                    }
                                    // show dialog
                                    forms.ViewTodo.enabled = true;
                                });
                            },
                            edit: (id)=>{
                                console.log("edit " + id);
                                // populate edit form
                                getTodoById(id, (todo)=>{
                                    document.getElementById("edit-todo-title")
                                        .value = todo.title;
                                    document.getElementById("edit-todo-descriptor")
                                        .innerText = todo.description;
                                    if (todo.datetime !== -1) {
                                        document.getElementById("edit-todo-date")
                                            .value = strftime(
                                                "%Y-%m-%dT%H:%M:%S",
                                                new Date(todo.datetime)
                                            );
                                    } else {
                                        document.getElementById("edit-todo-date")
                                            .value = "";
                                    }
                                    document.getElementById("edited-todo-id")
                                        .value = id;
                                    // show dialog
                                    forms.EditTodo.enabled = true;
                                });
                            },
                            delete: (id)=>{
                                console.log("delete " + id);
                                document.getElementById("deleted-todo-id")
                                    .value = id;
                                forms.DeleteTodo.enabled = true;
                            },
                            complete: (id)=>{
                                console.log("complete " + id);
                                document.getElementById("completed-todo-id")
                                    .value = id;
                                forms.CompleteTodo.enabled = true;
                            }
                        }, !IS_COMPLETABLE)]
                    );
                    cursor.continue();
                }
            }
        })
}

/*
 * Make the buttons show the forms
 */
document.getElementById("add-todo-button")
.addEventListener("click",(e)=>{
    forms.AddTodo.enabled = true;
});

/*
 * Submit todo
 */
forms.AddTodo.attachSubmit((e, form)=>{
     if (form.element.reportValidity()) {
         let data = new FormData(form.element);

         queryDb(DB_NAME)
            .then((e)=>{
                let tx = current_db.transaction("ToDo", "readwrite");
                let txStore = tx.objectStore("ToDo");
                tx.oncomplete = (e)=>{
                    __alert("Added to-do");

                    form.element.blur(); // remove focus from the form element
                    form.enabled = false;
                    updateTodo();
                }
                tx.onerror = (e)=>{
                    __alert("Cannot insert entry into the table");
                }

                let date;

                data.get("date") ?
                    ( date = new Date(data.get("date")).toJSON() ) :
                    ( date = -1 )

                // the actual operations
                txStore.put({
                    "title": data.get("title"),
                    "description": data.get("description"),
                    "datetime": date,
                    "completed_by": -1
                })
            })
            .catch((e)=>{
                __alert(e);
            })
     }
 });

 forms.DeleteTodo.attachSubmit((e, form)=>{
     let data = new FormData(form.element);

     queryDb(DB_NAME)
        .then((e)=>{
            let tx = current_db.transaction("ToDo", "readwrite");
            let txStore = tx.objectStore("ToDo");
            tx.oncomplete = (e)=>{
                __alert("Deleted to-do successfully");

                form.element.blur(); // remove focus from the form element
                form.enabled = false;
                updateTodo();
            }
            tx.onerror = (e)=>{
                __alert(e);
            }

            let id = parseInt(data.get("todo"));

            // the actual operations
            txStore.delete(id)
        })
        .catch((e)=>{
            __alert(e);
        })
 })

forms.CompleteTodo.attachSubmit((e, form)=>{
     let data = new FormData(form.element);

     queryDb(DB_NAME)
        .then((e)=>{
            let id = parseInt(data.get("todo"));
            getTodoById(id, (todo)=>{
                let ac_tx = current_db.transaction("Activities", "readwrite");
                let acStore = ac_tx.objectStore("Activities");
                ac_tx.oncomplete = (e)=>{
                    __alert("Added activity");
                }
                ac_tx.onerror = (e)=>{
                    __alert(e);
                }

                // the actual operations
                let new_ac = acStore.put({
                    "title": "[todo] " + todo.title,
                    "description": "Completed to-do: " + todo.title,
                    "datetime": new Date(new Date().setSeconds(0, 0)).toJSON()
                })

                new_ac.onsuccess = (e) => {
                    let tx = current_db.transaction("ToDo", "readwrite");
                    let txStore = tx.objectStore("ToDo");
                    tx.oncomplete = (x) => {
                        __alert("Updated to-do");
                        form.element.blur(); // remove focus from the form element
                        form.enabled = false;
                        updateTodo();
                        updateActivities();
                    }
                    tx.onerror = (x) => {
                        __alert(e);
                    }

                    todo.completed_by = e.target.result;
                    txStore.put(todo);
                }
            })
        })
        .catch((e)=>{
            __alert(e);
        })
 })

 forms.EditTodo.attachSubmit((e, form)=>{
      if (form.element.reportValidity()) {
          let data = new FormData(form.element);

          queryDb(DB_NAME)
             .then((e)=>{
                 let tx = current_db.transaction("ToDo", "readwrite");
                 let txStore = tx.objectStore("ToDo");
                 tx.oncomplete = (e)=>{
                     __alert("Edited to-do");

                     form.element.blur(); // remove focus from the form element
                     form.enabled = false;
                     updateTodo();
                 }
                 tx.onerror = (e)=>{
                     __alert("Cannot insert entry into the table");
                 }

                 let date;

                 data.get("date") ?
                     ( date = new Date(data.get("date")).toJSON() ) :
                     ( date = -1 )

                 // the actual operations
                 txStore.put({
                     "id": parseInt(data.get("todo")),
                     "title": data.get("title"),
                     "description": data.get("description"),
                     "datetime": date,
                     "completed_by": -1
                 })
             })
             .catch((e)=>{
                 __alert(e);
             })
      }
  });
updateTodo();
