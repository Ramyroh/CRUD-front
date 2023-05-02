// Adicionar

const nome = document.querySelector("#nome")
const sobrenome = document.querySelector("#sobrenome")
const idade = document.querySelector("#idade")
let linha = "";

const butaoCadastar = document.querySelector("#buttonhead");

const deletardeletar = () => {
  document.querySelectorAll(".buttonlist");
};

const deleteAluno = async (e) => {
  await fetch(`http://localhost:3000/aluno/${e.target.id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  
 await getAlunos()
}


const addEventDelete = () => {
    
  const buttonsDelete = document.querySelectorAll(".buttonlistDeletar");
  buttonsDelete.forEach(e => {
      e.addEventListener('click', deleteAluno)
  })

  
  const buttonsEditar = document.querySelectorAll(".buttonlistEditar");
  buttonsEditar.forEach(e => {
      e.addEventListener('click', editarAluno)
    linha = e
  })

} 

const getAlunos = async () => {
  let response = await fetch("http://localhost:3000/aluno");
  let data = await response.json();
  
  const tabela = document.querySelector("#tabelafull");
  tabela.innerHTML = `
  
    <table id="tabelafull">

    <thead id="tabelahead">
      <th class="tabelatitulo">Nome</th>
      <th class="tabelatitulo">Sobrenome</th>
      <th class="tabelatitulo">Idade</th>
      <th class="tabelatitulo"></th>
    </thead>

    </table>
  `
  data.forEach(x => {
    const adicionar = `
        <tbody id="tabelabody ${x._id}">
          <td class="tabelacelula"><input class="tabelacelula" type=text value="${x.nome}" /></td>
          <td class="tabelacelula"><input class="tabelacelula" type=text value="${x.sobrenome}" /></td>
          <td class="tabelacelula"><input class="tabelacelula" type=text value="${x.idade}" /></td>
          <td class="tabelacelula tbuton">
            <button id=${x._id} class="buttonlistDeletar">Deletar</button>
            <button id=${x._id} class="buttonlistEditar">Editar</button>
            <button id=${x._id} class="buttonlistSalvar">Salvar</button>
          </td>
        </tbody>
      `
      const tabela = document.querySelector("#tabelafull");
      
      tabela.insertAdjacentHTML("beforeend", adicionar)
  })

  addEventDelete()
}


const postAluno = async (e) => {
  e.preventDefault();
  let itemnome = nome.value;
  let itemsobrenome = sobrenome.value;
  let itemidade = idade.value;

  const data = {
    nome: itemnome,
    sobrenome: itemsobrenome,
    idade: itemidade
  }

  await fetch("http://localhost:3000/aluno", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  nome.value = "";
  sobrenome.value = "";
  idade.value = "";

  await getAlunos()
  
  deletardeletar();
}


(function(){
  getAlunos() 
})()

butaoCadastar.addEventListener('click', postAluno)
 


const editarAluno = async (e) => {
  let lista = await fetch(`http://localhost:3000/aluno/${e.target.id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });

  let idedit = await lista.json();
  console.log(idedit);
  
 await getAlunos()

 linhaSelecionadaParaEditar = linha.parentNode.parentNode.parentNode;
 console.log(linhaSelecionadaParaEditar);
 let filhaNome = linhaSelecionadaParaEditar.firstChild.parentElement
 console.log(filhaNome);
}


