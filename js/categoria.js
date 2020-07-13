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
    if(!localStorage.getItem('Categorias')){
        localStorage.setItem('Categorias','[]')
      }

      let Categorias = JSON.parse(localStorage.getItem('Categorias'))
      let cliente = JSON.parse(localStorage.getItem('IdAtual'))
      let id = Date.now();
      let nome = document.getElementById('txtcategoria').value
                var CadastroCategoria = {
                    id: id++,nome,cliente
                }
                Categorias.push(CadastroCategoria)
                localStorage.setItem('Categorias',JSON.stringify(Categorias))
  }

  function listarCategoria(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let Cliente = JSON.parse(localStorage.getItem('IdAtual'))
    let linha = "";
    let coluna = ['id','categoria','edit']
    let conteudo = ""
    let i = 0
    let indice = 0

    if(Categorias == null || Categorias == "[]"){
      let tabela = document.getElementById('tabelaCol')
      tabela.innerHTML = "Não há nada para ser listado. Tente cadastrar uma categoria "
    }else{
      Categorias.forEach(element => {
        if(element.cliente == Cliente){
            i = 0
            while(i < 3){
              switch(coluna[i]){
                case 'id':
                  conteudo = Categorias[indice].id
                  break;
                case 'categoria':
                  conteudo = Categorias[indice].nome
                  break;
                case 'edit':
                  conteudo = "<button class='btn' onclick='Editar("+element.id+")'>Editar</button><br>"
                  break;
              }
              let row = document.getElementById(coluna[i]);
              linha = "<label>"+conteudo+"</label><br>"
              i++
              row.innerHTML += linha
            }
            indice++
          }
       });
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

  function localizarEdit(id){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let index = Categorias.findIndex(categoria => categoria.id == id)

    return index
  }
  
  function localizarEditConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

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
    debugger
    
    if(c){
      if(!ContasLancadas){
        Categorias[index].nome = document.getElementById('txteditcategoria').value
        localStorage.setItem('Categorias',JSON.stringify(Categorias))
        return
      }

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
      let i = 0;
      do{
        Categorias = JSON.parse(localStorage.getItem('Categorias'))
        if(Categorias.length == 1){
          localStorage.removeItem('Categorias')
        }else{
          Categorias.splice(index,1)
          localStorage.setItem('Categorias',JSON.stringify(Categorias))
        }
        if(ContasLancadas[i].categoria.id === item.id){
          console.log(ContasLancadas[i])
          ContasLancadas.splice(i,1)
        }else{
          i++
        } 
      }
      while (i < ContasLancadas.length) 
      localStorage.setItem('Contas',JSON.stringify(ContasLancadas))
    }else{
      alert('Operação cancelada')
    }
    
  }

