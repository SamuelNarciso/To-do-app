import {todosList} from './todos-list.class.js';
import {Todos} from './todos.class.js';

const inputTodos_Input = document.querySelector('.caja');
const addTodo_Btn = document.querySelector('#addBtn');
const listaTodos_li = document.querySelector('.lista_todos');
const botonesCabecera = document.querySelectorAll('.btn-cabecera');

const listaTodos = new todosList();
let valorCaja;

const colocarFondo = (evento) => {
	const imagenDiv = document.querySelector('.imagen');
	if (listaTodos.todos.length === 0) {
		const nombreFoto = evento
			? evento.target.defaultValue.toLowerCase()
			: 'all';
		imagenDiv.innerHTML = `<img src="assets/img/${nombreFoto}.svg" alt="background img">`;
	} else {
		imagenDiv.innerHTML = ``;
	}
};
const crearTodo_LiHtml = (todoRecibido) => {
	const check = todoRecibido.completed ? 'checked' : '';
	const completed = todoRecibido.completed ? 'completed' : '';
	const li_HTML = `
	<li class="todo_item" id='${todoRecibido.id}'>
	<div class="contenedor_todo">
    <input id='cb${todoRecibido.id}' type="checkbox" class="checkbox_todo" ${check} />
	<label class="${completed} texto_todo"> ${todoRecibido.todo_contenido} </label>
	</div>

	<div class="contenedor_img">
		<button class='trash'>
		X
		</button>

	</div>

    </li>
    `;
	const div = document.createElement('div');
	div.innerHTML = li_HTML;
	listaTodos_li.append(div.firstElementChild);
};

const crearTodo = (e) => {
	valorCaja = inputTodos_Input.value;
	if (valorCaja) {
		const nuevoTodo = new Todos(valorCaja);
		listaTodos.nuevoTodo(nuevoTodo);
		crearTodo_LiHtml(nuevoTodo);
		inputTodos_Input.value = '';
		inputTodos_Input.focus();
		colocarFondo(e);
	} else {
	}
};

addTodo_Btn.addEventListener('click', crearTodo);
inputTodos_Input.addEventListener('keyup', (e) => {
	e.keyCode === 13 ? crearTodo() : null;
});

listaTodos_li.addEventListener('click', (e) => {
	let id;

	const eliminarTodo = (id) => {
		listaTodos.eliminarTodo(id);
		listaTodos_li.removeChild(document.getElementById(id));
		if (listaTodos.todos.length === 0) {
			colocarFondo();
		}
	};
	if (e.target.type === 'checkbox') {
		e.target.nextElementSibling.classList.toggle('completed');
		const idTodo = e.target.id.slice(2);
		listaTodos.marcarCompleto(idTodo);
	} else if (e.toElement.localName === 'button') {
		id = e.target.parentElement.parentElement.id;
		eliminarTodo(id);
	}
});

botonesCabecera.forEach((boton) =>
	boton.addEventListener('click', (e) => {
		if (listaTodos.todos === 0) {
			colocarFondo(e);
		} else {
			listaTodos_li.innerHTML = '';
			listaTodos.todos.forEach((todo) => {
				if (e.target.defaultValue == 'All') {
					crearTodo_LiHtml(todo);
				}
				if (e.target.defaultValue == 'Active') {
					if (!todo.completed) {
						crearTodo_LiHtml(todo);
					}
				}
				if (e.target.defaultValue == 'Completed') {
					if (todo.completed) {
						crearTodo_LiHtml(todo);
					}
				}
			});
		}
	})
);
