// Configurar Supabase (reemplaza con tus credenciales reales)
import { supabase } from "./supabaseClient.js";

// Función auxiliar para renderizar la tabla (evita duplicación)
function renderTabla(tipo, data) {
    const tbody = document.querySelector(`#${tipo}-table tbody`);
    if (!tbody) {
        console.warn(`Tabla #${tipo}-table no encontrada.`);
        return;
    }
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        // Mostrar todos los valores, incluyendo 'id' para coincidir con el HTML
        Object.keys(item).forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            row.appendChild(td);
        });
        // Agregar botón de eliminar
        const tdEliminar = document.createElement('td');
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn btn-danger btn-sm';
        btnEliminar.onclick = () => eliminarDato(tipo, item.id);
        tdEliminar.appendChild(btnEliminar);
        row.appendChild(tdEliminar);
        tbody.appendChild(row);
    });
}

// Función para cargar datos en tabla (async)
async function cargarTabla(tipo) {
    try {
        const { data, error } = await supabase.from(tipo).select('*');
        if (error) throw error;
        renderTabla(tipo, data);  // Usar función auxiliar
    } catch (error) {
        console.error('Error cargando tabla:', error);
        alert('Error cargando datos. Revisa la consola.');
    }
}

// Función para insertar datos (async)
async function insertarDato(tipo, formData) {
    if (!formData || Object.keys(formData).length === 0) {
        alert('Datos del formulario inválidos.');
        return;
    }
    try {
        const { data, error } = await supabase.from(tipo).insert([formData]).select();
        if (error) throw error;
        // Solo recarga la tabla si existe en la página actual
        if (document.querySelector(`#${tipo}-table tbody`)) {
            await cargarTabla(tipo);
        }
        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} agregado exitosamente.`);
    } catch (error) {
        console.error('Error insertando dato:', error);
        alert('Error al agregar. Revisa la consola.');
    }
}

// Función para eliminar datos por ID (async)
async function eliminarDato(tipo, id) {
    if (!id) {
        alert('ID inválido para eliminar.');
        return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        try {
            const { error } = await supabase.from(tipo).delete().eq('id', id);
            if (error) throw error;
            await cargarTabla(tipo);
            alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} eliminado exitosamente.`);
        } catch (error) {
            console.error('Error eliminando dato:', error);
            alert('Error al eliminar. Revisa la consola.');
        }
    }
}

// Función para filtrar datos (async) - Ahora más genérica
async function filtrarTabla(tipo, query, campoFiltro = 'nombre') {  // Parámetro opcional para el campo a filtrar
    try {
        let queryBuilder = supabase.from(tipo).select('*');
        if (query && query.trim()) {  // Filtrar solo si query no está vacío
            queryBuilder = queryBuilder.ilike(campoFiltro, `%${query.trim()}%`);
        }
        const { data, error } = await queryBuilder;
        if (error) throw error;
        renderTabla(tipo, data);  // Usar función auxiliar
    } catch (error) {
        console.error('Error filtrando datos:', error);
        alert('Error filtrando datos. Revisa la consola.');
    }
}

// Inicializar al cargar la página (ejemplo para 'usuarios')
window.onload = () => {
    cargarTabla('usuarios');
    // Ejemplo de event listener para filtrar (ajusta el ID del input según tu HTML)
    const inputFiltro = document.getElementById('filtro-usuarios');  // Asume un <input id="filtro-usuarios">
    if (inputFiltro) {
        inputFiltro.addEventListener('input', (e) => {
            filtrarTabla('usuarios', e.target.value);
        });
    }
};
