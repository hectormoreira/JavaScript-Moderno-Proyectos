const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(params) {
  listCursos.addEventListener("click", agregarCurso);  
  carrito.addEventListener("click", eliminaCurso);
  vaciarCarritoBtn.addEventListener("click", () => {
      articulosCarrito = [];//reset arreglo
      limpiarHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function eliminaCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');
        //obtner productos diferentes al id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //revisa si existe elemento
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //objeto actualizado
      } else {
        return curso; //no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);
  carritoHTML();
}

//mostrar carrito
function carritoHTML() {
  //limpiar carrito
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    //Destructuring objects
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" />
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
      `;
    //agregar en tbody
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  //contenedorCarrito.innerHTML = "";
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
