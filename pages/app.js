// ==========================
// CONFIGURA TU SUPABASE
// ==========================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dWNpbnd0cmV1Z2ZlaGpmZ2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDgwMjEsImV4cCI6MjA3OTc4NDAyMX0.ssWcoQwUzxIGYArzb3porS8JxFecaebZV_SMhnh98nM";
let SUPABASE_URL = "https://jxucinwtreugfehjfgkx.supabase.co";

// Crear cliente una sola vez
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función auxiliar para renderizar la tabla (evita duplicación)
function renderTabla(tipo, data) {
    console.log(`Renderizando tabla ${tipo} con ${data.length} elementos.`);  // Depuración
    const tbody = document.querySelector(`#${tipo}-table tbody`);
    if (!tbody) {
        console.warn(`Tabla #${tipo}-table no encontrada. Abortando render.`);
        return;
    }
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
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
    console.log(`Tabla ${tipo} renderizada.`);  // Depuración
}

// Función para cargar datos en tabla (async)
async function cargarTabla(tipo) {
    console.log(`Llamando a cargarTabla para ${tipo}.`);  // Depuración
    try {
        const { data, error } = await supabase.from(tipo).select('*');
        if (error) throw error;
        renderTabla(tipo, data);
        console.log(`cargarTabla completada para ${tipo}.`);  // Depuración
    } catch (error) {
        console.error('Error cargando tabla:', error);
        alert('Error cargando datos. Revisa la consola.');
    }
}

// Función para insertar datos (async)
async function insertarDato(tipo, formData) {
    console.log(`Llamando a insertarDato para ${tipo}.`);  // Depuración
    if (!formData || Object.keys(formData).length === 0) {
        alert('Datos del formulario inválidos.');
        return;
    }
    try {
        const { data, error } = await supabase.from(tipo).insert([formData]).select();
        if (error) throw error;
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
    console.log(`Llamando a eliminarDato para ${tipo}, ID: ${id}.`);  // Depuración
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

// Función para filtrar datos (async)
async function filtrarTabla(tipo, query, campoFiltro = 'especialidad') {  // Cambiado a 'especialidad' por defecto para profesores
    console.log(`Llamando a filtrarTabla para ${tipo}.`);  // Depuración
    try {
        let queryBuilder = supabase.from(tipo).select('*');
        if (query && query.trim()) {
            queryBuilder = queryBuilder.ilike(campoFiltro, `%${query.trim()}%`);
        }
        const { data, error } = await queryBuilder;
        if (error) throw error;
        renderTabla(tipo, data);
    } catch (error) {
        console.error('Error filtrando datos:', error);
        alert('Error filtrando datos. Revisa la consola.');
    }
}

// Asignar funciones a window para que sean globales (accesibles desde el script inline)
window.cargarTabla = cargarTabla;
window.insertarDato = insertarDato;
window.eliminarDato = eliminarDato;
window.filtrarTabla = filtrarTabla;