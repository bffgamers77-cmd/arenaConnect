const readline = require("readline");

let turmas = [];
let atletas = [];
let proximoId = 1;

class Turma {
    #nome
    #id;
    constructor(id, nome) {
        this.#id = id;
        this.nome = nome;
    }
   
    exibirDados() {
        console.log("[" + this.id + "] - " + this.nome);
    }
    set nome (novoNome) {
        if (!novoNome || novoNome.length < 3) {
        console.log(" Nome inválido. Acesso não permitido");
        return;
    }
    this.#nome = novoNome;}
    get nome() { return this.#nome; }
    get id() { return this.#id; }
}

class Atleta {
    #id;
    #nome;
    #idTurma;
    constructor(nome, modalidade, idade, idTurma) {
        this.#nome = nome;
        this.modalidade = modalidade;
        this.idade = idade;
        this.#idTurma = idTurma;
    }
        eMaiorDeIdade() {
        return this.idade >= 18;}
       set nome(novoNome) {
        if (!novoNome || novoNome.length < 3) {
            console.log(" Nome inválido. Acesso não permitido");
            return;}
        this.#nome = novoNome;}
    get nome() { return this.#nome; };

    get id() { return this.#id; };

    set idTurma(novoidTurma) {
        if (!novoidTurma || novoidTurma.length < 3) {
            console.log(" Id Turma inválido. Acesso não permitido");
            return;
        }
        this.#idTurma = novoidTurma;
    }
    get idTurma() { return this.#idTurma; };
   
}
function adicionarAtleta() {
    rl.question("Digite o nome do atleta: ", function (nome) {
    rl.question("Digite a modalidade: ", function (modalidade) {
     rl.question("Digite a idade do atleta: ", function (idade) {
    rl.question("Digite o ID da turma do atleta: ", function (idTurma) {
        let atleta = new Atleta
        (nome,modalidade,Number(idade),Number(idTurma));
            atletas.push(atleta);
            console.log("\nAtleta cadastrado com sucesso!");
            if (atleta.eMaiorDeIdade()) {
                console.log("O atleta é maior de idade.");
            } else {
                console.log("O atleta é menor de idade.");
            }
                 menu();});
            });
           });
    });
};

function listarAtletas() {
    console.log("\n=== LISTA DE ATLETAS ===");
    if (atletas.length === 0) {
        console.log("Nenhum atleta cadastrado.");
    } else {
        for (let i = 0; i < atletas.length; i++) {
            console.log(
            "Nome: " + atletas[i].nome +
            " | Modalidade: " + atletas[i].modalidade +
            " | Idade: " + atletas[i].idade +
            " | ID da Turma: " + atletas[i].idTurma
            );
        }
    }
    menu();}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function adicionarTurma() {
    rl.question("Digite o nome da turma que deseja adicionar: ", function (nome) {
        let turma = new Turma(proximoId, nome);
        turmas.push(turma);
        proximoId++;
        console.log("\nTurma adicionada com sucesso!");
        turma.exibirDados();
        menu();
    });
}
function listarTurmas() {
    console.log("\n=== LISTA DE TURMAS - INTERCLASSES ===");
    if (turmas.length === 0) {
        console.log("Nenhuma turma cadastrada.");
    } else {
        for (let i = 0; i < turmas.length; i++) {
            turmas[i].exibirDados();
        }
    }
    menu();
}
function atualizarTurma() {
    if (turmas.length === 0) {
        console.log("\nNão existem turmas para atualizar.");
        menu();
        return;
    }
    console.log("\n===== TURMAS CADASTRADAS =====");
    for (let i = 0; i < turmas.length; i++) {
        turmas[i].exibirDados();
    }
    rl.question(
        "\nDigite o ID da turma que deseja atualizar: ",
        function (idDigitado) {
            let id = Number(idDigitado);
            let turma = turmas.find(function (turma) {
            return turma.id === id;});
            if (turma) {
                rl.question("Digite o novo nome da turma: ",
function (novoNome) {
turma.nome = novoNome.toUpperCase();
console.log('\nTurma ID ' + id +' atualizada para "' +turma.nome + '".');
    menu();});
    } else {
    console.log("\nID não encontrado para atualização.");
    menu();}
    }
);
}
function removerTurma() {
    if (turmas.length === 0) {
        console.log("\nNão existem turmas para remover.");
        menu();
        return;}
    console.log("\n===== TURMAS CADASTRADAS =====");
    for (let i = 0; i < turmas.length; i++) {
        turmas[i].exibirDados();}
    rl.question(
        "\nDigite o ID da turma que deseja remover: ",
        function (idDigitado) {
            let id = Number(idDigitado);
            let turmaEncontrada = turmas.find(function (turma) {
                return turma.id === id;});
            if (turmaEncontrada) {
                turmas = turmas.filter(function (turma) {
                    return turma.id !== id;});
                console.log("\nTurma '" +turmaEncontrada.nome +"' removida com sucesso!");
            } else {
                console.log("\nTurma não encontrada.");}
         menu();
        }
    );
}
function menu() {
    console.log("================================");
    console.log("     SISTEMA DE TURMAS");
    console.log("1. Adicionar Turma");
    console.log("2. Listar Turmas");
    console.log("3. Atualizar Turma");
    console.log("4. Remover Turma");
    console.log("5. Adicionar Atleta");
    console.log("6. Listar Atletas");
    console.log("7. Sair");
    console.log("==============================");
    rl.question("Escolha uma opção: ", function (opcao) {
        if (opcao === "1") {
            adicionarTurma();
        } else if (opcao === "2") {
            listarTurmas();
        } else if (opcao === "3") {
            atualizarTurma();
        } else if (opcao === "4") {
            removerTurma();
        } else if (opcao === "5") {
            adicionarAtleta();
        } else if (opcao === "6") {
            listarAtletas();
        } else if (opcao === "7") {
            console.log("\nSistema encerrado!");
            rl.close();
        } else {
            console.log("\nOpção inválida!");
            menu();
        }
    });
}
menu();