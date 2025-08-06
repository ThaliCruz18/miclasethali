// js/dashboard.js
const SUPABASE_URL = "https://vxoxgnejysvdggswcvxo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4b3hnbmVqeXN2ZGdnc3djdnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDQ5MzcsImV4cCI6MjA3MDA4MDkzN30.o4eKVi55Jc1O2nqJGtx2Bc4i3hnAddoMlPWSWtJnIK8";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function getUser() {
  const { data: { user } } = await client.auth.getUser();
  return user;
}

async function submitForm(event) {
  event.preventDefault();

  const user = await getUser();
  if (!user) {
    alert("No hay sesión activa.");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const clase = document.getElementById("clase").value;
  const archivo = document.getElementById("archivo").files[0];

  if (!nombre || !correo || !clase || !archivo) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const filePath = `${user.id}/${archivo.name}`;

  const { error: uploadError } = await client.storage.from('tareas').upload(filePath, archivo, {
    cacheControl: '3600',
    upsert: false
  });

  if (uploadError) {
    alert("Error al subir archivo: " + uploadError.message);
    return;
  }

  const { error: insertError } = await client
    .from("estudiantes")
    .insert([{ nombre, correo, clase, user_id: user.id }]);

  if (insertError) {
    alert("Error al guardar datos: " + insertError.message);
  } else {
    alert("Tarea subida correctamente.");
    document.getElementById("formulario").reset();
  }
}
