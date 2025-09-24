
const amigos = [];


const input = document.getElementById('amigo');
const lista = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');


const normaliza = s => s.trim().replace(/\s+/g, ' ');

function renderLista() {
  if (!amigos.length) {
    lista.innerHTML = `<li><i>Aún no hay nombres agregados</i></li>`;
  } else {
    lista.innerHTML = amigos.map((n,i)=>`<li>${i+1}. <b>${n}</b></li>`).join('');
  }
}

function setResultado(msg, error=false){
  resultado.className = 'result' + (error ? ' error' : '');
  resultado.style.display = 'block';
  resultado.innerHTML = msg;
}

function agregarAmigo(){
  const nombre = normaliza(input.value);
  if(!nombre){ setResultado('Escribe un nombre antes de añadir.', true); input.focus(); return; }
  const existe = amigos.some(n=>n.toLowerCase()===nombre.toLowerCase());
  if(existe){ setResultado(`Ya agregaste a <b>${nombre}</b>.`, true); input.select(); return; }
  amigos.push(nombre);
  renderLista();
  setResultado('Nombre añadido ✅');
  input.value='';
  input.focus();
}

function sortearAmigo(){
  if(amigos.length < 2){ setResultado('Agrega al menos 2 nombres para sortear.', true); input.focus(); return; }
  const idx = Math.floor(Math.random()*amigos.length);
  setResultado(`🎉 El amigo sorteado es: <b>${amigos[idx]}</b>`);
}

function limpiarLista(){
  amigos.splice(0);
  renderLista();
  setResultado('Lista vaciada.');
}


if (input){
  input.addEventListener('keydown', e=>{
    if(e.key==='Enter') agregarAmigo();
  });
}


renderLista();

window.agregarAmigo = agregarAmigo;
window.sortearAmigo  = sortearAmigo;
window.limpiarLista  = limpiarLista;
