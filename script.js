function consultaCEP(cep) {

    // torma possive usar o -
    cep = cep.replace(/\D/g, ""); // expressão regular -> regex

    if (cep != "") {

        const padraoCep = /^[0-9]{8}$/; // regex
        //esta falando que aceita numeração de 0 a 9, e no maximo 8 caracteris

        if (padraoCep.test(cep)) {

            document.querySelector("#bairro").setAttribute("readonly", "")
            document.querySelector("#cidade").setAttribute("readonly", "")
            document.querySelector("#uf").setAttribute("readonly", "")

            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`, {
                "method": "GET", 
                "headers": {
                   "Content-type": "application/json" 
                }
            });
            
            fetch(requisicao)
            .then(resposta => resposta.json())
            .then(resposta => { 

                if (!("erro" in resposta)) {
                    
                    document.querySelector("#logradouro").value = resposta.logradouro;
                    document.querySelector("#bairro").value = resposta.bairro;
                    document.querySelector("#cidade").value = resposta.localidade;
                    document.querySelector("#uf").value = resposta.uf;
                }else {
                    limpaForm();
                    window.alert("Cep não localizado")

                    document.querySelector("#bairro").removeAttribute('readonly');
                    document.querySelector("#cidade").removeAttribute('readonly');
                    document.querySelector("#uf").removeAttribute('readonly');
                }
            });
            //Fecha o if 
        } else{ // caso CEP esteja fora do padrão
            limpaForm();
            window.alert("O formato do CEP é inválido")
        }
        
    } else {
        limpaForm();
        window.alert("Digite um CEP!");
    }


}//Fecha a função

function limpaForm() {
    
    document.querySelectorAll("input:not(#cep)").forEach(input => {
        input.value = "";
    })
    
}