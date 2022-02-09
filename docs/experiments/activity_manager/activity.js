function getActivityById(id, callback) {
    id = parseInt(id);
    queryDb(DB_NAME)
       .then((e)=>{
           let tx = current_db.transaction("Activities", "readonly");
           let txStore = tx.objectStore("Activities");
           tx.oncomplete = (e)=>{
                callback(activity.result);
           }
           tx.onerror = (e)=>{
               __alert("Cannot fetch activity " + id);
           }

           activity = txStore.get(id);
       })
       .catch((e)=>{
           __alert(e);
       });
}

/*
 * Show the activities
 */
function updateActivities() {
    let table_container = document.getElementById("activity-list").tBodies[0];

    // remove everything in table first
    while (table_container.childElementCount) {
        table_container.removeChild(
            table_container.firstElementChild
        )
    }

    // then display all Activities
    queryDb(DB_NAME)
        .then((e)=>{
            let tx = current_db.transaction("Activities", "readonly");
            let txStore = tx.objectStore("Activities");
            let ixStore = txStore.index("date");

            ixStore.openCursor(null, "prev").onsuccess = (e)=>{
                var cursor = e.target.result;

                if (cursor) {
                    let date = new Date(cursor.value.datetime);
                    let activity_row = table_container.__make("tr");
                    activity_row.dataset.id = cursor.value.id;
                    activity_row.__make(
                        "td~"
                            + strftime(
                                "%Y-%m-%d %H:%M",
                                date
                            )
                    );
                    activity_row.__make(
                        "td~" + cursor.value.title
                    );
                    activity_row.__make(
                        /* Create activities actions list */
                        "td", [makeActionList({
                            view: (id)=>{
                                console.log("view " + id);
                                // populate activity view
                                getActivityById(id, (activity)=>{
                                    document.getElementById("view-activity-title")
                                        .childNodes[0].nodeValue = activity.title;
                                    document.getElementById("view-activity-description")
                                        .childNodes[0].nodeValue = activity.description;
                                    document.getElementById("view-activity-date")
                                        .childNodes[0].nodeValue = new Date(activity.datetime).toString();
                                    // show dialog
                                    forms.ViewActivity.enabled = true;
                                })
                            },
                            edit: (id)=>{
                                console.log("edit " + id);
                                // populate edit form
                                getActivityById(id, (activity)=>{
                                    document.getElementById("edit-activity-title")
                                        .value = activity.title;
                                    document.getElementById("edit-activity-descriptor")
                                        .innerText = activity.description;
                                    document.getElementById("edit-activity-date")
                                        .value = strftime(
                                            "%Y-%m-%dT%H:%M:%S",
                                            new Date(activity.datetime)
                                        );
                                    document.getElementById("edited-activity-id")
                                        .value = id;
                                    // show dialog
                                    forms.EditActivity.enabled = true;
                                })
                            },
                            delete: (id)=>{
                                console.log("delete " + id);
                                document.getElementById("deleted-activity-id")
                                    .value = id;
                                forms.DeleteActivity.enabled = true;
                            }
                        })]
                    );
                    cursor.continue();
                }
            }
        })
}

/*
 * Make the buttons show the forms
 */
document.getElementById("add-activity-button")
.addEventListener("click",(e)=>{
    forms.AddActivity.enabled = true;
});

/*
 * Submit activity
 */
 forms.AddActivity.attachSubmit((e, form)=>{
     if (form.element.reportValidity()) {
         let data = new FormData(form.element);

         queryDb(DB_NAME)
            .then((e)=>{
                let tx = current_db.transaction("Activities", "readwrite");
                let txStore = tx.objectStore("Activities");
                tx.oncomplete = (e)=>{
                    __alert("Completed");

                    form.element.blur(); // remove focus from the form element
                    form.enabled = false;
                    updateActivities();
                }
                tx.onerror = (e)=>{
                    __alert("Cannot insert entry into the table");
                }

                let date;

                data.get("date") ?
                    ( date = new Date(data.get("date")).toJSON() ) :
                    ( date = new Date(new Date().setSeconds(0, 0)).toJSON() )

                // the actual operations
                txStore.put({
                    "title": data.get("title"),
                    "description": data.get("description"),
                    "datetime": date
                })
            })
            .catch((e)=>{
                __alert(e);
            })
     }
 });

forms.EditActivity.attachSubmit((e, form)=>{
     if (form.element.reportValidity()) {
         let data = new FormData(form.element);

         queryDb(DB_NAME)
            .then((e)=>{
                let tx = current_db.transaction("Activities", "readwrite");
                let txStore = tx.objectStore("Activities");
                tx.oncomplete = (e)=>{
                    __alert("Completed");

                    form.element.blur(); // remove focus from the form element
                    form.enabled = false;
                    updateActivities();
                }
                tx.onerror = (e)=>{
                    __alert("Cannot insert entry into the table");
                }

                let date;

                data.get("date") ?
                    ( date = new Date(data.get("date")).toJSON() ) :
                    ( date = new Date(new Date().setSeconds(0, 0)).toJSON() )

                // the actual operations
                txStore.put({
                    "id": parseInt(data.get("activity")),
                    "title": data.get("title"),
                    "description": data.get("description"),
                    "datetime": date
                })
            })
            .catch((e)=>{
                __alert(e);
            })
     }
 });

forms.DeleteActivity.attachSubmit((e, form)=>{
    let data = new FormData(form.element);
    console.log();


    queryDb(DB_NAME)
       .then((e)=>{
           let tx = current_db.transaction("Activities", "readwrite");
           let txStore = tx.objectStore("Activities");
           tx.oncomplete = (e)=>{
               __alert("Deleted successfully");

               form.element.blur(); // remove focus from the form element
               form.enabled = false;
               updateActivities();
           }
           tx.onerror = (e)=>{
               __alert(e);
           }

           let id = parseInt(data.get("activity"));

           // the actual operations
           txStore.delete(id)
       })
       .catch((e)=>{
           __alert(e);
       })
})

updateActivities();
