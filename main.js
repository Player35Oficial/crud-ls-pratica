// representação do meu bando de dados
let database = [
  {
    id: 1,
    nome: "Mario Souto",
    idade: 19,
    profissao: "Programador",
  },
  {
    id: 2,
    nome: "Igor Pessoa",
    idade: 21,
    profissao: "Fotógrafo",
  },
];

dbLocalStorage = JSON.stringify(database);
localStorage.setItem("database", dbLocalStorage);

// Selecionar elementos

const forms = document.querySelectorAll("form");
const formCriacao = document.querySelector("#creationForm");
const formEdicao = document.querySelector("#editionForm");
const tableBody = document.querySelector("#table tbody");
const editionSelect = document.querySelector("#editionForm select");

// Funções

function createUser(objeto) {
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);
  jsonDB.push(objeto);
  let databaseString = JSON.stringify(jsonDB);
  localStorage.setItem("database", databaseString);
}

function loadUsers() {
  tableBody.innerHTML = null;
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);
  jsonDB.forEach((usuario) => {
    tableBody.innerHTML += `<tr>
    <th scope="row">${usuario.id}</th>
    <td>${usuario.nome}</td>
    <td>${usuario.idade}</td>
    <td>${usuario.profissao}</td>
  </tr>`;
  });
  console.log(localStorage.getItem("database"));
}

function deleteUser(id) {
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);
  jsonDB = jsonDB.filter((user) => user.id !== id);
  let databaseString = JSON.stringify(jsonDB);
  localStorage.setItem("database", databaseString);
}

function updateUser(id, usuarioEditado) {
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);
  usuarioAtual = jsonDB.find((user) => user.id == id);
  usuarioAtualizado = { ...usuarioAtual, ...usuarioEditado };

  // Atualiza o objeto no array sem remover o original
  let index = jsonDB.findIndex((user) => user.id == id);
  jsonDB[index] = usuarioAtualizado;

  // jsonDB.pop(usuarioAtual);
  // jsonDB.push(usuarioAtualizado);
  let databaseString = JSON.stringify(jsonDB);
  localStorage.setItem("database", databaseString);
  loadCurrentSelectUsers();
}

updateUser(2, { profissao: "Desenvolvedor Python Back-end" });
createUser({
  id: database.length + 1,
  nome: "percival",
  idade: 42,
  profissao: "Repórter",
});
loadUsers();
loadCurrentSelectUsers();

// Carregar elementos

function loadCurrentSelectUsers() {
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);
  editionSelect.innerHTML = null;
  jsonDB.forEach((usuario) => {
    editionSelect.innerHTML += `
      <option value="${usuario.id}">${usuario.nome}</option>
    `;
  });
}

editionSelect.addEventListener("input", (e) => {
  let id = e.target.value;
  let database = localStorage.getItem("database");
  let jsonDB = JSON.parse(database);

  usuarioAtual = jsonDB.find((user) => user.id == id);
  let divRes = formEdicao.querySelector("#usuarioSelecionado");
  console.log(usuarioAtual);
  divRes.innerHTML = `
  <div class="form-group">
  <label for="nome">Nome de usuário</label>
    <input
      type="text"
      class="form-control"
      id="nome"
      placeholder="${usuarioAtual.nome}"
      value="${usuarioAtual.nome}"
    />
  </div>
  <div class="form-group">
    <label for="idade">Idade</label>
    <input
      type="number"
      class="form-control"
      id="idade"
      placeholder="${usuarioAtual.idade}"
      value="${usuarioAtual.idade}"
    />
  </div>
  <div class="form-group">
    <label for="profissao">Profissão</label>
    <input
      type="text"
      class="form-control"
      id="profissao"
      placeholder="${usuarioAtual.profissao}"
      value="${usuarioAtual.profissao}"
    />
  </div>
  `;

  const editionForm = document.querySelector("#editionForm");
  editionForm.addEventListener("submit", (e) => {
    // captura de novos valores
    let nome = divRes.querySelector("input#nome").value;
    let idade = Number(divRes.querySelector("input#idade").value);
    let profissao = divRes.querySelector("input#profissao").value;
    console.log(nome);

    updateUser(usuarioAtual.id, {
      nome: nome,
      idade: idade,
      profissao: profissao,
    });

    $("#modalDeEdicao").modal("toggle");
    loadUsers();
  });
});

// eventos
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

formCriacao.addEventListener("submit", (e) => {
  console.log(e);
  let nome = formCriacao.querySelector("#nome").value;
  let idade = Number(formCriacao.querySelector("#idade").value);
  let profissao = formCriacao.querySelector("#profissao").value;
  let tamanhoDoBD = JSON.parse(localStorage.getItem("database")).length;

  let novoUsuario = {
    id: tamanhoDoBD + 1,
    nome: nome,
    idade: idade,
    profissao: profissao,
  };
  createUser(novoUsuario);
  $("#modalDeCadastro").modal("toggle");
  loadUsers();
  loadCurrentSelectUsers();
});
