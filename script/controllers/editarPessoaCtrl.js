angular.module("editarPessoas").controller("editarPessoaCtrl",function($scope,$http){
   const url_atual = window.location.href;
   const gerarId = url_atual.split("pessoaId=")
   const pessoaId = gerarId[1]
// Essa Chave de acesso o melhor é colocar ela em um local onde não esteja visivel para o úsuario.
    const chaveDeAcesso = '8B51FC08-8AEE-4DBF-8F09-1DF97657DA73'
    const config = {
        headers: {
            'Chave':chaveDeAcesso,
            'Content-Type': 'application/json'
        }
    }
    function pegarDadosDeUmaPessoa(){
        $http.get(`https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${pessoaId}`,config).then((data) =>{
        $scope.dados = data.data.data
    })
    }

    function adicionarEnderecoNoBancoDeDados(endereco){
        if(endereco.uf === 2){
            return true
        }
        $http.post("https://www.selida.com.br/avaliacaotecnica/api/Endereco",endereco,config).then(function(response){
            console.log(response.data)
        }).catch(function(error){
            console.log(error)
        })
    }
    $scope.criarTabelaNovoEndereco = function(logradouro,numero,bairro,cidade,uf){
        const novoEndereco = Endereco(logradouro,numero,bairro,cidade,uf)
        $scope.pessoaEndereco = novoEndereco
        
        if(novoEndereco != undefined){
            adicionarEnderecoNoBancoDeDados(novoEndereco)
        }
    }
    function Endereco (logradouro,numero,bairro,cidade,uf){
        const pessoaEndereco = {
           pessoaId:pessoaId,
           logradouro,
           numero,
           bairro,
           cidade,
           uf
        }
        return pessoaEndereco
       }
   

       $scope.editarDadosPessoa = function(nome,idade,email,dataNascimento,telefone,celular){
        const pessoa = new CriarObjetoPessoa(nome,idade,email,dataNascimento,telefone,celular)
        $http.put(`https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${pessoaId}`,pessoa,config).then((data) =>{
          console.log(data)  
        })
       }

       function CriarObjetoPessoa(nome,idade,email,dataNascimento,telefone,celular){
        this.nome = nome
        idade = Number(idade)
        this.email  = email
        this.dataNascimento = dataNascimento
        this.telefone = telefone
        this.celular = celular

        return {
            nome,idade,email,dataNascimento,telefone,celular
        }
       }

       pegarDadosDeUmaPessoa()

})