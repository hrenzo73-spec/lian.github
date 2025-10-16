document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();
  const errorMsg = document.getElementById("error-msg");
  errorMsg.style.display = "none";

  // 🛡️ Admin local
  if (usuario === "admin" && password === "1234") {
    alert("Bienvenido administrador 🚀");
    window.location.href = "admin.html";
    return;
  }

  // 🧠 Validación de correo
  const esCorreoValido = usuario.includes('@') && usuario.includes('.');

  if (!esCorreoValido) {
    errorMsg.textContent = "Debe ingresar un correo electrónico válido";
    errorMsg.style.display = "block";
    return;
  }

  // 🔐 Login Supabase
  const { data, error } = await supabase.auth.signInWithPassword({
    email: usuario,
    password
  });

  if (error) {
    errorMsg.textContent = `⚠️ ${error.message}`;
    errorMsg.style.display = "block";
    console.error("Login error:", error);
  } else {
    alert("Bienvenido " + usuario + " 🚀");
    window.location.href = "proyectos.html";
  }
});
