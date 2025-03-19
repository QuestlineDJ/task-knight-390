function get_time()
{
   return Math.floor(Date.now() / 1000);
}

class Task {
   taskid;
   name;
   priority;
   due_date;
   create_time;

   constructor(name, priority, due_date) {
      this.taskid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // TODO: see if UUIDs should be used
      this.name = name;
      this.priority = priority;
      this.due_date = due_date;
      this.create_time = get_time();
   }

   // NOTE: this may change if we decide to order task differently
   static compare(taska, taskb) {
      // TASK due earlier shuold be at the top of the list
      if ( taska.due_date < taskb.due_date ) {
         return -1;
      } else if ( taska.due_date > taskb.due_date ) {
         return 1;
      } else {
         // If tasks are due at the same time, go off the one with a higher priority
         if ( taska.priority > taskb.priority ) {
            return -1;
         } else if ( taska.priority < taskb.priority ) {
            return 1;
         } else {
            return 0;
         }
      }
   }

   static via_id(task) {
      return task.taskid == this;
   }
}

class TaskManager {
   complete_history = 100;

   active_tasks = new Array();
   complete_tasks = new Array();

   add_task() {
      //TODO: retrive information from form

      this.active_tasks.push(new Task("Hello World", 0, get_time()));
      return 0;
   }

   edit_task(taskid) {
      var task = this.active_tasks.find(Task.via_id, taskid);
      if ( task === undefined ) {
         return 1;
      }


      // TODO: retrive information from form

      task.name = "New Name";
      task.priority = 1;
      task.due_date = get_time();

      return 0;
   }

   delete_task(taskid) {
      var task_index = this.active_tasks.findIndex(Task.via_id, taskid);
      if ( task_index == -1 )
      {
         return 1;
      }

      this.active_tasks.splice(task_index, 1);
      return 0;

   }

   complete_task(taskid) {
      var task_index = this.active_tasks.findIndex(Task.via_id, taskid);
      if ( task_index == -1 )
      {
         return 1;
      }

      var completed_task = this.active_tasks.splice(task_index, 1);

      this.complete_tasks.push(completed_task);

      if ( this.complete_tasks.length > this.complete_history )
      {
         this.complete_tasks.shift();
      }

      return 0;
   }

   display_task(taskid) {
      var task = this.active_tasks.find(Task.via_ida(taskid));
      if ( task === undefined )
      {
         return 1;
      }

      // TODO: update UI

      return 0;
   }

   display_tasks(start_index = 0, stop_index = 0) {
      // TODO: implement
   }

   save_tasks() {
      // TODO: implement
   }

   load_tasks(json_string) {
      //TODO: implement
   }
}
