Vue.createApp({
    data() {
        return {
            todo: '',
            todoList: [],
            status: 'all',
        }
    },
    methods: {
        // function: add todo
        add() {
            // avoid no text adding
            if(this.todo === '') {
                return
            }
            // add new todo
            this.todoList.push({
                id: this.todoList.length + 1,
                text: this.todo,
                completed: false, 
        })
            // after add new todo, then clear input
            this.todo = ''
            // saved in localStorage
            this.updateLS()
        },
        // function: saved in localStorage
        updateLS() {
            localStorage.setItem("todos", JSON.stringify(this.todoList))
        },
        // function: remove todo
        remove(todo) {
            // console.log(todo)
            const index = this.todoList.findIndex(item => item.id === todo.id)
            // console.log(index)
            this.todoList.splice(index, 1)
            this.updateLS()
        },
        // changeStatus() {
        //     this.todo.completed = !todo.completed
        // },
        // updateStatus() {
        //     todo.completed = !todo.completed
        //     this.updateLS()
        // },
        
        // function: clear all todos
        clear() {
        if (window.confirm('確定要全部刪除？')) {
            this.todoList = []
        }
        // saved in localStorage
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