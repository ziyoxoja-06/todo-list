<script setup>
 /* 
 inports
*/

import { ref, onMounted } from 'vue'
import { 
  collection, addDoc,
  doc, updateDoc , deleteDoc, 
  onSnapshot, query, orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

/* 
firebase ref
*/

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

/* 
todos
*/

const todos = ref([
  // {
  //   id: 1,
  //   content: 'Shave my but',
  //   done: false
  // },
  // {
  //   id: 2,
  //   content: 'Brush my teeth',
  //   done: true
  // },
  // {
  //   id: 3,
  //   content: 'Take a shower',
  //   done: false
  // }
])
/* 
get todos
*/
onMounted(async ()=>{
 
onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const dbTodos = [];
    querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done
        }
        dbTodos.push(todo);
      });
    todos.value = dbTodos;
  });
})
/* 
add todo
*/
const newTodoContent = ref('')
const addTodo = ()=>{
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date:  Date.now()
  });
  newTodoContent.value = ''
}

/* 
delete todo
*/

const deleteTodo = (id)=>{
  deleteDoc(doc(db, "todos", id));
}

/* 
toggle done
*/

const toggleDone = (id)=>{
  let index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
  navigator.share({
    title: 'Badass Todo',
    text: todos.value[index].content
  })
}
</script>

<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      Badass Todo
    </div>
    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input class="input" v-model="newTodoContent" type="text" placeholder="Find a repository">
      </p>
      <p class="control">
        <button :disabled="!newTodoContent" class="button is-info">
          Add
        </button>
      </p>
    </div>
    </form>
    
    <div 
      v-for="todo in todos" 
      :key="todo.id"
      class="card mb-5"
      :class="todo.done ? 'has-background-success-light' : 'has-background-warning-light'"
      >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div 
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button 
              @click="toggleDone(todo.id)"
              :class="todo.done ? 'is-success' : 'is-warning'"
              class="button">
                &check;
              </button>
              <button 
              @click="deleteTodo(todo.id)"
              class="button is-danger ml-2">
                &cross;
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<style >
@import 'bulma/css/bulma.min.css';

.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through{
  text-decoration: line-through;
}
</style>
