// Inicializar datos de ejemplo en localStorage si no existen
if (!localStorage.getItem('estudiantes')) {
    localStorage.setItem('estudiantes', JSON.stringify([
        { id: 1, nombre: 'Juan Quirós', correo: 'juan@gmail.com', edad: 24 },
        { id: 2, nombre: 'Diego Solano', correo: 'diego@gmail.com', edad: 21 },
        { id: 3, nombre: 'Johanna Moraga', correo: 'johanna@gmail.com', edad: 23 }
    ]));
}
if (!localStorage.getItem('cursos')) {
    localStorage.setItem('cursos', JSON.stringify([
        { id: 1, nombre: 'Matemáticas II', duracion: 40, profesor: 'Dr. Pedro Gutierrez' },
        { id: 2, nombre: 'Programación Web', duracion: 50, profesor: 'Prof. Carlos Gómez' },
        { id: 3, nombre: 'Calculo IV', duracion: 60, profesor: 'Dra. Elena Saénz' }
    ]));
}
if (!localStorage.getItem('profesores')) {
    localStorage.setItem('profesores', JSON.stringify([
        { id: 201, nombre: 'Dr. Pedro Gutierrez', especialidad: 'Matemáticas II' },
        { id: 202, nombre: 'Prof. Carlos Gómez', especialidad: 'Programación Web' },
        { id: 203, nombre: 'Dra. Elena Saénz', especialidad: 'Calculo IV' }
    ]));
}

// Función para cargar datos en tabla
function cargarTabla(tipo) {
    const data = JSON.parse(localStorage.getItem(tipo)) || [];
    const tbody = document.querySelector(`#${tipo}-table tbody`);
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
}

// Función para insertar datos
function insertarDato(tipo, formData) {
    const data = JSON.parse(localStorage.getItem(tipo)) || [];
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    const newItem = { id: newId, ...formData };
    data.push(newItem);
    localStorage.setItem(tipo, JSON.stringify(data));
    cargarTabla(tipo);
    alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} agregado exitosamente.`);
}

// Función para filtrar datos
function filtrarTabla(tipo, query) {
    const data = JSON.parse(localStorage.getItem(tipo)) || [];
    const filtered = data.filter(item => Object.values(item).some(val => val.toString().toLowerCase().includes(query.toLowerCase())));
    const tbody = document.querySelector(`#${tipo}-table tbody`);
    tbody.innerHTML = '';
    filtered.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(val => {
            const td = document.createElement('td');
            td.textContent = val;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
}