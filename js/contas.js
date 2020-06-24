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
  debugger
  let Categoria = JSON.parse(localStorage.getItem('Categorias'))
  if(verificar(Categoria) == true){
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
  }else{
    alert("Não é possível lançar uma conta sem ter uma categoria lançada. Por favor lance uma categoria")
    window.location = "cadastrarcategorias.html"
  }
   
  }

  function listarContas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let Categoria = JSON.parse(localStorage.getItem('Categorias'))
    let linha = "";

    if(verificar(Categoria) == true){
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
            linhati += "<button class='btn' onclick='EditarConta("+element.id+")'>Editar</button><br>"
            row.innerHTML = linhati;
        });
    }else{
      alert("Não é possível lançar uma conta sem ter uma categoria lançada. Por favor lance uma categoria")
      window.location = "cadastrarcategorias.html"
    }
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

  function SalvarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarEditConta(id)
    console.log(index)

    let c = confirm('Alterando essa conta, todas as contas lancadas no painel tambem serão alteradas. Deseja continuar ?')

    if(c == true){
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

  function apagarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarEditConta(id)

    let c = confirm('Esta conta sera apagada. Continuar ?')

    if(c == true){
      ContasLancadas.splice(index,1)
      localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
    }else{
      alert('Operação cancelada')
    }
  }
  
function ListarCatContas(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    if(validar(Categorias) == true){
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