const app = new Vue({
  el: '#app',
  data() {
    return {
      tasks: [],
      newTask: '',
      editIndex: -1
    }
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
      } catch(e) {
        localStorage.removeItem('tasks')
      }
    }
  },
  methods: {
    addTask() {
      if (!this.newTask) return

      this.tasks.push(this.newTask)
      this.newTask = ''
      this.saveTasks()
    },
    editTask(key) {
      this.editIndex = key
      this.newTask = this.tasks[key]
    },
    removeTask(key) {
      this.tasks.splice(key, 1)
      this.saveTasks()
    },
    saveTasks() {
      const parsed = JSON.stringify(this.tasks)
      localStorage.setItem('tasks', parsed)
    },
    updateTask() {
      if (!this.newTask) return

      this.tasks[this.editIndex] = this.newTask
      this.newTask = ''
      this.editIndex = -1
      this.saveTasks()
    }
  },
  computed: {
    editable() {
      return this.editIndex > -1
    }
  }
})
