function openForm() {
    document.getElementById("addCategorias").style.display = "block";
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
      let id = Date.now();
      let titulo = document.getElementById('txttitulo').value
      let categoria = document.getElementById('txtcategoria').value
      let tipo = document.getElementById('txttipo').value
                var CadastroContas = {
                  id: id++,titulo,categoria,tipo
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
  }

  function localizar(id){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    let index = Categorias.findIndex(categoria => categoria.id == id)

    return Categorias[index]

  }