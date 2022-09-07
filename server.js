// Clase constructora
class Usuario {
  constructor(nombre, apellido, mascotas, libros) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = mascotas || [];
    this.libros = libros || [];
  }

  getFullName() {
    return console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
  }

  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota);
  }

  countMascota() {
    return console.log(`Mascotas: ${this.mascotas.length}`);
  }

  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getBookNames() {
    const nombreLibro = [];
    this.libros.map((libro) => nombreLibro.push(libro.nombre));
    return console.log(`Libros: ${nombreLibro}`);
  }
}

//Creacion de usuario
const usuario = new Usuario(
  "Tomas",
  "Sale",
  ["Pajaro", "Perro"],
  [
    { nombre: "El libro de la selva", autor: "Rudyard Kipling" },
    { nombre: "El principito", autor: "Antoine de Saint-Exupéry" },
  ]
);

//Llamar funciones
usuario.getFullName();
usuario.addMascota("Gato");
console.log(usuario.mascotas);
usuario.countMascota();
usuario.addBook("El alquimista", "Paulo Coelho");
usuario.getBookNames();
