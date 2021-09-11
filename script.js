Vue.createApp({
    data() {
        return {
            todo: '',
            todoList: [],
            status: 'all',
        }
    },
    methods: {
        add() {
            // avoid no text adding
            if(this.todo === '') {
                return
            }
            this.todoList.push({
                id: this.todoList.length + 1,
                text: this.todo,
                completed: false, 
        })
            this.todo = ''
            this.complete()
            this.updateLS()
        },
        updateLS() {
            localStorage.setItem("todos", JSON.stringify(this.todoList))
        },
        remove(todo) {
            // console.log(todo)
            const index = this.todoList.findIndex(item => item.id === todo.id)
            // console.log(index)
            this.todoList.splice(index, 1)
            this.updateLS()
        },
        updateStatus() {
            todo.completed = !todo.completed
            this.updateLS()
        },
        clear() {
        if (window.confirm('確定要全部刪除？')) {
            this.todoList = []
        }
        this.updateLS()
        } 
    },
    computed: {
        filterTodo() {
            switch (this.status) {
                case 'active': 
                return this.todoList.filter((todo) => !todo.completed)
                case 'completed':
                return this.todoList.filter((todo) => todo.completed)
                default:
                return this.todoList
            }
        }
    },
    mounted() {
        this.todoList = JSON.parse(localStorage.getItem("todos")) || []
    },
}).mount('#app')