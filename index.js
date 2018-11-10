var colors = [
    '#e8e458', //yellow
    '#ea7d7d', //red
    '#7daeea', //blue
    '#89e079', //green
    '#de8be8', //purple
];

var TodoItem = {
    props: ['item'],
    template: `<li>{{ item.text }}<button class="btn btn-link" @click="$emit('delete-row')"><i class="fa fa-times"></i></button></li>`
};

Vue.component('todo-list', {
    props: ['list'],
    created: function() {
        this.color = colors[Math.floor(Math.random() * Math.floor(colors.length))];
    },
    template: `
        <div class="todolist col-4" v-bind:style="{ background: color}">
            <h2>Todo list #{{list.id}}</h2>
            <button class="btn btn-dark btn-close" @click="$emit('delete-row')"><i class="fa fa-times"></i></button>
            <ol>
                <todo-item
                    v-for="(item, index) in list.data"
                    v-bind:item="item"
                    v-bind:key="item.id"
                    v-on:delete-row="deleteThisRow(index)">
                </todo-item>
                <form class="input-group mb-3">
                    <input type="text" ref="input" class="form-control">
                    <div class="input-group-append">
                        <button class="btn btn-outline-dark" type="submit" v-on:click="add"><i class="fa fa-plus"></i></button>
                    </div>
                </form>
            </ol>
        </div>`,
    methods: {
        add: function (event) {
            event.preventDefault();
            this.list.data.push({ text: this.$refs.input.value });
            this.$refs.input.value = '';
        },
        deleteThisRow: function(index) {
            this.list.data.splice(index, 1);
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
        },
        deleteThisRow: function(index) {
            this.todoLists.splice(index, 1);
        }
    }
});
