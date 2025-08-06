const SUPABASE_URL = "https://vxoxgnejysvdggswcvxo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4b3hnbmVqeXN2ZGdnc3djdnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MDQ5MzcsImV4cCI6MjA3MDA4MDkzN30.o4eKVi55Jc1O2nqJGtx2Bc4i3hnAddoMlPWSWtJnIK8";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function register() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Registro exitoso. Revisa tu correo.");
    toggleForms();
  }
}

async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Error: " + error.message);
  } else {
    alert("Sesión iniciada.");
    localStorage.setItem("token", data.session.access_token);
    window.location.href = "dashboard.html"; // redirige al dashboard
  }
}

function toggleForms(event) {
  if (event) event.preventDefault();
  document.getElementById('login-form-card').classList.toggle('hidden');
  document.getElementById('register-form-card').classList.toggle('hidden');
}