export class Todos{
    constructor(nuevoTodo){
        this.todo_contenido = nuevoTodo;
        this.id =new Date().getTime();
        this.completed = false;
    }
}