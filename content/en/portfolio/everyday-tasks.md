{
	"year": "2021",
	"title": "\"EverydayTasks\" PHP app",
	"attributes": [
		"visibility: personal",
		"type: application",
		"type: webdev",
		"tech: javascript",
		"tech: php",
		"year: 2021"
	],
	
	"client":   "Software Engineering class",
	"contrib":  "application development",
	"software": "Text editor",
	
	"thumbnail": "/img/thumbnails/everyday-tasks.jpg"
}

![](/img/thumbnails/everyday-tasks.jpg)

{{< link-button url="https://github.com/rbsoen/EverydayTasks" text="View repository" >}}
{{< link-button url="https://github.com/rbsoen/EverydayTasks-Docker" text="View Docker Compose setup" >}}

This was a group assignment for Software Engineering class in the form of a web application powered by PHP and MySQL. In a nutshell, it is an activity tracker and to-do list. Activity logs may be edited and deleted, and there are separate views for today's activities and every activity logged. To-do lists are referred here as "tasks". Unlike a usual to-do list, a task will be attached to one activity log when completed. Combining tasks into larger units known as "projects" were planned.

This application grew from a personal script written in 2020 during the Covid-19 pandemic, when I felt motivated to track my activities digitally to prevent feelings of aimlessness. Since then, the basic idea has taken on many forms, including a local JavaScript version, which you may access [here](../js-activity-manager).

This version of the application consists of API and GUI elements. The GUI element is the front end, split into a client-side scripting component and a server-side component. The client-side scripting calls to the REST-like API, animates elements on the screen and switches pages dynamically.

This approach has the advantage of letting the site remain accessible even when JavaScript is disabled on the user's end, while otherwise giving the user a smooth navigation experience.

Because the project uses no front-end framework (only the [Bliss](https://blissfuljs.com/) library was used), it results in massively coupled code between the JS client-side and the PHP server-side code. I intend to recreate this application using an appropriate framework, possibly in another language.

If you'd like, you may [view this project's paper](/pdf/EverydayTasksPaper.en.pdf).
