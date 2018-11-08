var TodoItem = {
    props: ['item'],
    template: '<li>{{ item.text }}</li>'
};

Vue.component('todo-list', {
    props: ['list'],
    template: `
        <div>
            <h1>Todo list #{{list.id}}</h1>
            <ol>
                <todo-item
                    v-for="item in list.data"
                    v-bind:item="item"
                    v-bind:key="item.id">
                </todo-item>
                <input type="text" ref="input"/><button v-on:click="add">Add item</button>
            </ol>
        </div>`,
    methods: {
        add: function (event) {
            this.list.data.push({ text: this.$refs.input.value });
            this.$refs.input.value = '';
        }
    },
    components: {
        'todo-item': TodoItem
    }
});

var app = new Vue({
    el: '#todolist-container',
    data: {
        count: 1,
        todoLists: []
    },
    methods: {
        add: function (event) {
            this.todoLists.push({ id: this.count, data: []});
            this.count++;
        },
        remove: function (event) {
            this.todoLists.pop();
            if (this.count > 1) {
                this.count--;
            }
        }
    }
});
