console.log('o professor.js foi carregado');

(function (win, doc) {
    'use strict';

  // ler token
        var token = doc.getElementsByName("_token")[0].value;
        console.log(token);
    // código para botão delete
    function confirmDel(event) {
        
        event.preventDefault();

        // agr o esquema é exibir o href associado ao link
        // console.log(event.target.parentNode.href);

      
        // console.log(token);

        if (confirm("Deseja mesmo apagar?")) {
            console.log("entrou no if q fala se deseja apagar");
            // instanciar/criar um objeto/classe chamada XMLHttpRequest
            let ajax = new XMLHttpRequest();
            ajax.open("GET", event.target.parentNode.href);
            // ajax.open("GET", event.target.parentNode.href);

            // definir o cabeçalho da requisição passando o token
            ajax.setRequestHeader('X-CSRF-TOKEN', token);

            // no cabeçalho deve ir o token para autorização
            // verificar status da requisição

            ajax.send(); // enviar a requisição

            ajax.onreadystatechange = function () {
                // agr vamo validar pelos códigos que significam q ta tudo OK

                // state 4: operação concluída

                // state 200: significa sucesso q nem o 404 é erro, sab

                if (ajax.readyState === 4 && ajax.status === 200) {
                    console.log("tudo certo, foi apagado!");

                    win.location.href = "aluno";
                }
            }
            // ajax.send(); // enviar a requisição
        }
        else {
            return false;
        }
        console.log("entrou no confirmDel");
    }


    // bora ver se o seletor está definido
    if (doc.querySelector('.js-del')) {
        // agr o esquema é criar um array com todos os itens com esse seletor(class)
        let btn = doc.querySelectorAll('.js-del');

        // Bora associar a cada ocorrência do seletor(class = js-del) um evento 'click' chamando a função confirmDel()

        for (let i = 0; i < btn.length; i++) {

            btn[i].addEventListener('click', confirmDel, false);
            //esse false pq é pra n executar as callbacks q são funções dentro de funções


        }
    }
})(window, document);