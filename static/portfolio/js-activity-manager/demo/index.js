/*
 * Create a list of forms that we want to manipulate
 */
let forms = {
    AddActivity: new ReactiveForm("add-activity-form"),
    ViewActivity: new ReactiveForm("view-activity-form"),
    EditActivity: new ReactiveForm("edit-activity-form"),
    DeleteActivity: new ReactiveForm("delete-activity-form"),

    AddTodo:  new ReactiveForm("add-todo-form"),
    ViewTodo:  new ReactiveForm("view-todo-form"),
    CompleteTodo: new ReactiveForm("complete-todo-form"),
    DeleteTodo: new ReactiveForm("delete-todo-form"),
    EditTodo: new ReactiveForm("edit-todo-form"),

    AddNote:  new ReactiveForm("add-note-form"),
}
