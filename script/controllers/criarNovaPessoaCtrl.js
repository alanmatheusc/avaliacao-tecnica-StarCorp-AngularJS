angular.module("criarNovaPessoa").controller("criarNovaPessoaController",function($scope,$http){
    $scope.app = "Hello!"
    $scope.ativarBotao = false

    // Essa Chave de acesso o melhor é colocar ela em um local onde não esteja visivel para o úsuario.
    const chaveDeAcesso = '8B51FC08-8AEE-4DBF-8F09-1DF97657DA73'


  $scope.criarNovaPessoa = function(nome,idade,email,dataNascimento,telefone,celular){
    const pessoa = DadosPessoa(nome,idade,email,dataNascimento,telefone,celular)
    console.log(pessoa)
    $http.post("https://www.selida.com.br/avaliacaotecnica/api/Pessoas",pessoa,config).then((data) =>{
       $scope.ativarBotao = true
    }).catch(error =>{
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

    function DadosPessoa(nome,idade,email,dataNascimento,telefone,celular){
        this.nome = nome
        idade = Number(idade)
        this.email = email
        dataNascimento = converterDataNascimentoParaDateTime(dataNascimento)
        this.telefone = telefone
        this.celular = celular

       return{nome,idade,email,dataNascimento,telefone,celular}
    }

    function converterDataNascimentoParaDateTime(dataNascimento){
        const ano = dataNascimento.getFullYear();
        const mes = ('0' + (dataNascimento.getMonth() + 1)).slice(-2); 
        const dia = ('0' + dataNascimento.getDate()).slice(-2);
        const hora = ('0' + dataNascimento.getHours()).slice(-2);
        const minuto = ('0' + dataNascimento.getMinutes()).slice(-2);
        const segundo = ('0' + dataNascimento.getSeconds()).slice(-2);
        const milissegundo = ('00' + dataNascimento.getMilliseconds()).slice(-3);
        
        const dataFormatada = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.${milissegundo}Z`;

        return dataFormatada
    }

    function Endereco (logradouro,numero,bairro,cidade,uf){
     const pessoaEndereco = {
        pessoaId:1,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
     }
     return pessoaEndereco
    }

    const config = {
        headers: {
            'Chave':chaveDeAcesso,
            'Content-Type': 'application/json'
        }
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

})