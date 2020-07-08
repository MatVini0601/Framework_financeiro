function openForm() {
    document.getElementById("addCategorias").style.display = "block";
  }
  
  function editFormConta() {
    document.getElementById("addcontaCategorias").style.display = "block";
  }

  function closeForm(){
    document.getElementById("addCategorias").style.display = "none";
  }

function lancarContas(){
  let Categoria = JSON.parse(localStorage.getItem('Categorias'))
  if(verificar(Categoria)){
    if(localStorage.getItem('Contas') == null){
      localStorage.setItem('Contas',"[]")
      let Contas = JSON.parse(localStorage.getItem('Contas'))
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
  }else{
    alert("Não é possível lançar uma conta sem ter uma categoria lançada. Por favor lance uma categoria")
    window.location = "cadastrarcategorias.html"
  }
   
  }

  function listarContas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let linha = "";
    let coluna = ['id','titulo','categoria','tipo','functions']
    let conteudo = ""
    let i = 0
    let indice = 0
    ContasLancadas.forEach(element => {
      i = 0
      while(i < 5){
        switch(coluna[i]){
          case 'id':
            conteudo = ContasLancadas[indice].id
            break;
          case 'titulo':
            conteudo = ContasLancadas[indice].titulo
            break;
          case 'categoria':
            conteudo = ContasLancadas[indice].categoria.nome
            break;
          case 'tipo':
            conteudo = ContasLancadas[indice].tipo
            break;
          case 'functions':
            conteudo = "<button class='btn' onclick='EditarConta("+element.id+")'>Editar</button><br>"
            break;
        }
        let row = document.getElementById(coluna[i]);
        linha = "<label>"+conteudo+"</label><br>"
        i++
        row.innerHTML += linha
      }
      indice++
      });
  }

  function EditarConta(id){
    debugger
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

  function SalvarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarEditConta(id)
    console.log(index)

    let c = confirm('Alterando essa conta, todas as contas lancadas no painel tambem serão alteradas. Deseja continuar ?')

    if(c){
      debugger
      ContasLancadas.forEach(element => {
        if(ContasLancadas[index].id == element.id){
          element.titulo = document.getElementById('txtcontatitulo').value;
          var sel = document.getElementById("txtcontacategoria");
          var text= sel.options[sel.selectedIndex].text;
          element.categoria.nome = text;
          var seltipo = document.getElementById("txtcontatipo");
          var text1= seltipo.options[seltipo.selectedIndex].text;
          element.tipo = text1
          localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
        }
      });
    }else{
      alert('Operação cancelada')
    }
  }

  function apagarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarEditConta(id)

    let c = confirm('Esta conta sera apagada. Continuar ?')

    if(c){
      ContasLancadas.splice(index,1)
      localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
    }else{
      alert('Operação cancelada')
    }
  }
  
function ListarCatContas(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    if(verificar(Categorias)){
      let linhaca = "";
      Categorias.forEach(element => {
        let row = document.getElementById("txtcategoria");
          linhaca += "<option value="+element.id+">"+element.nome+"</option>"
          row.innerHTML = linhaca;
         });
    }else{

    }
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
  
  function localizarEditConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(categoria => categoria.id == id)

    return index
  }
function verificar(){
  let Categorias = JSON.parse(localStorage.getItem('Categorias'))
  if(Categorias){
    return true 
  }else{
    return false
  }
}