// ==========================
// CONFIGURA TU SUPABASE
// ==========================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dWNpbnd0cmV1Z2ZlaGpmZ2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMDgwMjEsImV4cCI6MjA3OTc4NDAyMX0.ssWcoQwUzxIGYArzb3porS8JxFecaebZV_SMhnh98nM";
let SUPABASE_URL = "https://jxucinwtreugfehjfgkx.supabase.co";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Función para cargar datos en tabla
async function cargarTabla(tipo) {
    try {
        const { data, error } = await supabase.from(tipo).select('*');
        if (error) throw error;
        const tbody = document.querySelector(`#${tipo}-table tbody`);
        tbody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                row.appendChild(td);
            });
            // Botón de eliminar
            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.onclick = () => eliminarDato(tipo, item.id);
            tdEliminar.appendChild(btnEliminar);
            row.appendChild(tdEliminar);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error('Error cargando tabla:', err);
        alert('Error al cargar datos.');
    }
}

// Función para insertar datos
async function insertarDato(tipo, formData) {
    try {
        const { data, error } = await supabase.from(tipo).insert([formData]).select();
        if (error) throw error;
        if (document.querySelector(`#${tipo}-table tbody`)) {
            await cargarTabla(tipo);
        }
        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} agregado exitosamente.`);
    } catch (err) {
        console.error('Error insertando dato:', err);
        alert('Error al agregar dato.');
    }
}

// Función para eliminar datos por ID
async function eliminarDato(tipo, id) {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        try {
            const { error } = await supabase.from(tipo).delete().eq('id', id);
            if (error) throw error;
            await cargarTabla(tipo);
            alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} eliminado exitosamente.`);
        } catch (err) {
            console.error('Error eliminando dato:', err);
            alert('Error al eliminar dato.');
        }
    }
}

// Función para filtrar datos
async function filtrarTabla(tipo, query) {
    try {
        let filtro = {};
        if (tipo === 'profesores') {
            filtro = { especialidad: query }; // Filtrar por especialidad en profesores
        } else if (tipo === 'estudiantes') {
            filtro = { nombre: query }; // Ejemplo: filtrar por nombre en estudiantes
        } // Ajusta filtros según necesidad
        const { data, error } = await supabase.from(tipo).select('*').ilike(Object.keys(filtro)[0], `%${query}%`);
        if (error) throw error;
        const tbody = document.querySelector(`#${tipo}-table tbody`);
        tbody.innerHTML = '';
        data.forEach(item => {
            // Mismo código que en cargarTabla para renderizar filas
            const row = document.createElement('tr');
            Object.values(item).forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                row.appendChild(td);
            });
            const tdEliminar = document.createElement('td');
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.onclick = () => eliminarDato(tipo, item.id);
            tdEliminar.appendChild(btnEliminar);
            row.appendChild(tdEliminar);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error('Error filtrando tabla:', err);
        alert('Error al filtrar datos.');
    }
}