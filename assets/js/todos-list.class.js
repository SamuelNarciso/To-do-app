export class todosList {
	constructor() {
		this.todos = [];
	}
	nuevoTodo(todoRecibido) {
		this.todos.push(todoRecibido);
	}
	eliminarTodo(idTodo) {
		this.todos = this.todos.filter((todo) => todo.id != idTodo);
	}
	marcarCompleto(IDtodoRecibido) {
		this.todos.forEach((todo) => {
			if (todo.id == IDtodoRecibido) {
				todo.completed = !todo.completed;
			}
		});
	}
}
