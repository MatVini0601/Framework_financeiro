function openForm() {
    document.getElementById("addCategorias").style.display = "block";
  }

  function OpenCatForm() {
    document.getElementById("editCategorias").style.display = "block";
  }

  function closeForm(){
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
          linhab += "<button class='btn' onclick='Editar("+element.id+")'>Editar</button><br>"
          row.innerHTML = linhab;
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

    OpenCatForm()
    document.getElementById('txteditcategoria').value = categoria.nome 
    document.getElementById('txteditid').value = categoria.id
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

  function apagar(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let id = document.getElementById('txteditid').value
    let item = localizar(id)
    let index = localizarEdit(id)
    let c = confirm('Esta categoria e todas as contas cadastradas com ela serão apagadas. Continuar ?')

    if(c == true){
      var i = 0;
      debugger
      do{
        if(ContasLancadas[i].categoria.id === item.id){
          console.log(ContasLancadas[i])
          ContasLancadas.splice(i,1)
        }else{
          i++
        } 
      }
      while (i < ContasLancadas.length) 
        
      Categorias.splice(index,1)
      localStorage.setItem('Categorias',JSON.stringify(Categorias))
      localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
    }else{
      alert('Operação cancelada')
    }
    
  }

