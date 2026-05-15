        function gerarOrcamento(){

            var nome = document.getElementById("nome").value

            var arroz = Number(document.getElementById("arroz").value)
            var feijao = Number(document.getElementById("feijao").value)
            var leite = Number(document.getElementById("leite").value)

            // preços fixos
            var precoArroz = 25
            var precoFeijao = 10
            var precoLeite = 6

            // cálculo
            var total =
            (arroz * precoArroz) +
            (feijao * precoFeijao) +
            (leite * precoLeite)

            document.getElementById("resultado").innerHTML =

            "Cliente: " + nome + "<br><br>" +

            "Arroz: " + arroz +
            " x R$ " + precoArroz + "<br>" +

            "Feijão: " + feijao +
            " x R$ " + precoFeijao + "<br>" +

            "Leite: " + leite +
            " x R$ " + precoLeite + "<br><br>" +

            "Total: R$ " + total

        }