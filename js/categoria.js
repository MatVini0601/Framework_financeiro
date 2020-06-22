function editForm() {
  document.getElementById("editCategorias").style.display = "block";
}

function openForm() {
    document.getElementById("addCategorias").style.display = "block";
  }

  function editFormConta() {
    document.getElementById("addcontaCategorias").style.display = "block";
  }

  function closeForma(){
    document.getElementById("addCategorias").style.display = "none";
  }

  function cadastrarCategoria(){
    if(localStorage.getItem('Categorias') == null){
      localStorage.setItem('Categorias',"[]")
      let Categorias = JSON.parse(localStorage.getItem('Categorias'))
      let id = Date.now();
      let nome = document.getElementById('txtcategoria').value
                var CadastroCategoria = {
                    id: id++,nome
                }
                Categorias.push(CadastroCategoria)
                localStorage.setItem('Categorias',JSON.stringify(Categorias))
    }else{
      let Categorias = JSON.parse(localStorage.getItem('Categorias'))
      let id = Date.now();
      let nome = document.getElementById('txtcategoria').value
                var CadastroCategoria = {
                    id: id++,nome
                }
                Categorias.push(CadastroCategoria)
                localStorage.setItem('Categorias',JSON.stringify(Categorias))
    }
  }

  function listarCategoria(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let linhai = "";
    Categorias.forEach(element => {
     let row = document.getElementById("id");
       linhai += "<label>"+element.id+"</label><br>"
       row.innerHTML = linhai;
      });

      let linhac = "";
      Categorias.forEach(element => {
        let row = document.getElementById("categoria");
          linhac += "<label>"+element.nome+"</label><br>"
          row.innerHTML = linhac;
         });

         let linhab = "";
      Categorias.forEach(element => {
        let row = document.getElementById("edit");
          linhab += "<button onclick='Editar("+element.id+")'>Editar</button><br>"
          row.innerHTML = linhab;
         });
  }

  function ListarCatContas(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let linhaca = "";
    Categorias.forEach(element => {
      let row = document.getElementById("txtcategoria");
        linhaca += "<option value="+element.id+">"+element.nome+"</option>"
        row.innerHTML = linhaca;
       });
  }

  function lancarContas(){
    if(localStorage.getItem('Contas') == null){
      localStorage.setItem('Contas',"[]")
      let Contas = JSON.parse(localStorage.getItem('Contas'))
      let categoria = JSON.parse(localStorage.getItem('Categorias'))
      let id = Date.now();
      let titulo = document.getElementById('txttitulo').value
      let cat = document.getElementById('txtcategoria').value

      dados = localizar(cat)
      let tipo = document.getElementById('txttipo').value
                var CadastroContas = {
                    id: id++,titulo,categoria:dados,tipo
                }
                Contas.push(CadastroContas)
                localStorage.setItem('Contas',JSON.stringify(Contas))
    }else{
      let Contas = JSON.parse(localStorage.getItem('Contas'))
      let categoria = JSON.parse(localStorage.getItem('Categorias'))
      let id = Date.now();
      let titulo = document.getElementById('txttitulo').value
      let cat = document.getElementById('txtcategoria').value

      dados = localizar(cat)
      let tipo = document.getElementById('txttipo').value
                var CadastroContas = {
                    id: id++,titulo,categoria:dados,tipo
                }
                Contas.push(CadastroContas)
                localStorage.setItem('Contas',JSON.stringify(Contas))
    }
  }

  function listarContas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let linha = "";
    
  ContasLancadas.forEach(element => {
    let row = document.getElementById("id");
    linha += "<label>"+element.id+"</label><br>"
    row.innerHTML = linha;
    });

    let linhan = "";

    ContasLancadas.forEach(element => {
      let row = document.getElementById("titulo");
      linhan += "<label>"+element.titulo+"</label><br>"
      row.innerHTML = linhan;
      });

      let linhacat = "";

    ContasLancadas.forEach(element => {
 
      let row = document.getElementById("categoria");
      linhacat += "<label>"+element.categoria.nome+"</label><br>"
      row.innerHTML = linhacat;
      });

      let linhatipe = "";

    ContasLancadas.forEach(element => {
      let row = document.getElementById("tipo");
      linhatipe += "<label>"+element.tipo+"</label><br>"
      row.innerHTML = linhatipe;
      });

      let linhati = "";
      ContasLancadas.forEach(element => {
        let row = document.getElementById("functions");
          linhati += "<button onclick='EditarConta("+element.id+")'>Editar</button><br>"
          row.innerHTML = linhati;
         });
  }

  function localizar(id){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let index = Categorias.findIndex(categoria => categoria.id == id)

    return Categorias[index]
  }

  function localizarConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

    return ContasLancadas[index]
  }

  function localizarEdit(id){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let index = Categorias.findIndex(categoria => categoria.id == id)

    return index
  }
  
  function localizarEditConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(categoria => categoria.id == id)

    return index
  }

  function Editar(id){
    let categoria = localizar(id)

    editForm()
    document.getElementById('txteditcategoria').value = categoria.nome 
    document.getElementById('txteditid').value = categoria.id
  }

  function EditarConta(id){
    let categorias = JSON.parse(localStorage.getItem('Categorias'))
    let conta = localizarConta(id)

    editFormConta()

    document.getElementById('txtcontatitulo').value = conta.titulo
    document.getElementById('txtcontaid').value = conta.id
    let linhacontaedit = "";
      categorias.forEach(element => {
        let row = document.getElementById("txtcontacategoria");
        if(element.nome == conta.categoria.nome){
          linhacontaedit += "<option id="+element.nome+" value="+conta.id+" selected>"+conta.categoria.nome+"</option>"
        }else{
          linhacontaedit += "<option value="+element.id+">"+element.nome+"</option>"
        }
          row.innerHTML = linhacontaedit;
         });
    document.getElementById('txtcontatipo').value= conta.tipo
  }

  function salvar(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let id = document.getElementById('txteditid').value
    let index = localizarEdit(id)
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))

    let c = confirm('Alterando essa categoria, todas as contas pertencentes a esta categoria tambem serão alteradas. Deseja continuar ?')

    if(c == true){
      ContasLancadas.forEach(element => {
        if(Categorias[index].nome == element.categoria.nome){
          element.categoria.nome = document.getElementById('txteditcategoria').value;
          localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
        }
      });
      Categorias[index].nome = document.getElementById('txteditcategoria').value
      localStorage.setItem('Categorias',JSON.stringify(Categorias))
    }else{
      alert('Operação cancelada')
    }
  }

  function SalvarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarEditConta(id)
    console.log(index)

    let c = confirm('Alterando essa conta, todas as contas lancadas no painel tambem serão alteradas. Deseja continuar ?')

    if(c == true){
      debugger
      ContasLancadas.forEach(element => {
        if(ContasLancadas[index].id == element.id){
          element.titulo = document.getElementById('txtcontatitulo').value;
          var sel = document.getElementById("txtcontacategoria");
          var text= sel.options[sel.selectedIndex].text;
          element.categoria.nome = text;
          var sel1 = document.getElementById("txtcontatipo");
          var text1= sel1.options[sel1.selectedIndex].text;
          element.tipo = text1
          localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
        }
      });
    }else{
      alert('Operação cancelada')
    }
  }

  function apagar(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txteditid').value
    let item = localizar(id)
    let index = localizarEdit(id)
    let c = confirm('Esta categorias sera apagada. Continuar ?')

    if(c == true){
      ContasLancadas.forEach(element => {
        console.log(element.categoria)
        if(element.categoria.nome == item.nome){
          ContasLancadas.splice(element,1)
        }
      });
      Categorias.splice(index,1)
      localStorage.setItem('Categorias',JSON.stringify(Categorias))
      localStorage.setItem('Contas',JSON.stringify(Contas))
    }else{
      alert('Operação cancelada')
    }
    
  }