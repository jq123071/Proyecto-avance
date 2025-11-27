// Configurar Supabase (reemplaza con tus credenciales reales)
import { supabase } from "./js/supabaseClient.js";


// Función para cargar datos en tabla (async)
async function cargarTabla(tipo) {
    try {
        const { data, error } = await supabase.from(tipo).select('*');
        if (error) throw error;
        const tbody = document.querySelector(`#${tipo}-table tbody`);
        if (!tbody) return;  // Evita error si no hay tabla
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                row.appendChild(td);
            });
            // Agregar botón de eliminar con ID
            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.onclick = () => eliminarDato(tipo, item.id);
            tdEliminar.appendChild(btnEliminar);
            row.appendChild(tdEliminar);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error cargando tabla:', error);
        alert('Error cargando datos. Revisa la consola.');
    }
}

// Función para insertar datos (async)
async function insertarDato(tipo, formData) {
    try {
        const { data, error } = await supabase.from(tipo).insert([formData]).select();
        if (error) throw error;
        // Solo carga la tabla si existe en la página actual
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

// Función para filtrar datos (async)
async function filtrarTabla(tipo, query) {
    try {
        let queryBuilder = supabase.from(tipo).select('*');
        if (query) {
            // Filtrar por nombre (ajusta si quieres filtrar por otros campos)
            queryBuilder = queryBuilder.ilike('nombre', `%${query}%`);
        }
        const { data, error } = await queryBuilder;
        if (error) throw error;
        const tbody = document.querySelector(`#${tipo}-table tbody`);
        if (!tbody) return;
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                row.appendChild(td);
            });
            // Agregar botón de eliminar con ID
            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.onclick = () => eliminarDato(tipo, item.id);
            tdEliminar.appendChild(btnEliminar);
            row.appendChild(tdEliminar);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error filtrando datos:', error);
    }
}