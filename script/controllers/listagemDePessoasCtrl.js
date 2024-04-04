angular.module("listagemDePessoas").controller("listagemDePessoasCtrl",function($scope,$http, $window){
    $scope.app = "Hello WOrld!"
    const chaveDeAcesso = '8B51FC08-8AEE-4DBF-8F09-1DF97657DA73'
    const config = {
        headers: {
            'Chave':chaveDeAcesso,
            'Content-Type': 'application/json'
        }
    }

    $scope.buscarPessoas = function(){
        $http.get("https://www.selida.com.br/avaliacaotecnica/api/Pessoas/GetAll",config).then((data)=>{
            $scope.dados = data.data.data
            console.log(data.data.data)
        }).catch(error =>{
            console.log(error)
        })
    }

    $scope.enviarDados = function(id){
        var url = '../editarPessoaView/index.html?pessoaId=' + id
        $window.location.href = url;
    }

    $scope.excluirPessoa = function(id){
        $http.delete(`https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${id}`,config).then((data)=>{
            $scope.buscarPessoas()
        }).catch(error =>{
            console.log(error)
        })  
    }


    $scope.buscarPessoas()
})