const readline = require("readline");

let turmas = [];
let atletas = [];
let arbitros = [];
let proximoId = 1;

class Pessoa {
    #id;
    #nome;

    constructor(id, nome) {
        this.#id = id;
        this.nome = nome;
    }
    set nome(novoNome) {
        if (!novoNome || novoNome.length < 3) {
            console.log("Nome inválido. Acesso não permitido.");
            return;}
        this.#nome = novoNome;
    }
    get nome() {
        return this.#nome;
    }
    get id() {
        return this.#id;
    }
    exibirDados() {
        console.log(
            "[" + this.id + "] - " +
            "Nome: " + this.nome);}
}

class Arbitro extends Pessoa {
    #numeroCredencial;
    #anosExperiencia;
    constructor(id, nome, numeroCredencial, anosExperiencia) {
        super(id, nome);
        this.numeroCredencial = numeroCredencial;
        this.anosExperiencia = anosExperiencia;
    }
    set numeroCredencial(novoNumeroCredencial) {
        this.#numeroCredencial = novoNumeroCredencial;
    }
    get numeroCredencial() {
        return this.#numeroCredencial;
    }
    set anosExperiencia(novoAnosExperiencia) {
        this.#anosExperiencia = novoAnosExperiencia;
    }
    get anosExperiencia() {
        return this.#anosExperiencia;
    }
    exibirDados() {
        console.log(
            "[" + this.id + "] - " +
            "Nome: " + this.nome +
            " | Credencial: " + this.numeroCredencial +
            " | Experiência: " + this.anosExperiencia + " anos"
        );
    }
}
function adicionarArbitro() {
    rl.question("Digite o nome do arbitro: ", function (nome) {
        rl.question("Digite o número da credencial: ", function (numeroCredencial) {
            rl.question("Digite os anos de experiência: ", function (anosExperiencia) {
                let novoArbitro = new Arbitro(proximoId, nome, Number(numeroCredencial), Number(anosExperiencia));
                arbitros.push(novoArbitro);
                proximoId++;
                console.log("\nArbitro cadastrado com sucesso!");
                novoArbitro.exibirDados();
                menu();
            });
        });
    });
}

function listarArbitros() {
    console.log("\n=== LISTA DE ARBITROS - INTERCLASSES ===");
    if (arbitros.length === 0) {
        console.log("Nenhum arbitro cadastrado.");
    } else {
        for (let i = 0; i < arbitros.length; i++) {
            arbitros[i].exibirDados();
        }
    }
    menu();
}

class Atleta extends Pessoa {
    #idTurma;
    #modalidade;
    #idade;
    constructor(id, nome, modalidade, idade, idTurma) {
        super(id, nome);
        this.modalidade = modalidade;
        this.idade = idade;
        this.#idTurma = idTurma;}
    eMaiorDeIdade() {return this.idade >= 18;}
   
    set idTurma(novoIdTurma) {
        this.#idTurma = novoIdTurma;
    }
    get idTurma() {
        return this.#idTurma;
    }
    set modalidade(novoModalidade) {
        this.#modalidade = novoModalidade;
    }
    get modalidade() {
        return this.#modalidade;
    }
    set idade(novoIdade) {
        this.#idade = novoIdadeIdade;
    }
    get idade() {
        return this.#idade;
    }
    exibirDados() {
        console.log(
            "[" + this.id + "] - " +
            "Nome: " + this.nome +
            " | Modalidade: " + this.modalidade +
            " | Idade: " + this.idade +
            " | ID da Turma: " + this.idTurma
        );
    }
}
function adicionarAtleta() {
    rl.question("Digite o nome do atleta: ", function (nome) {
        rl.question("Digite a modalidade: ", function (modalidade) {
            rl.question("Digite a idade do atleta: ", function (idade) {
                rl.question("Digite o ID da turma do atleta: ", function (idTurma) {
                    let atleta = new Atleta(proximoId, nome, modalidade, Number(idade), Number(idTurma));
                    atletas.push(atleta);
                    proximoId++;
                    console.log("\nAtleta cadastrado com sucesso!");
                    if (atleta.eMaiorDeIdade()) {
                        console.log("O atleta é maior de idade.");
                    } else {
                        console.log("O atleta é menor de idade.");
                    }
                    menu();
                });
            });
        });
    });
}

function listarAtletas() {
    console.log("\n=== LISTA DE ATLETAS ===");
    if (atletas.length === 0) {
        console.log("Nenhum atleta cadastrado.");
    } else {
        for (let i = 0; i < atletas.length; i++) {
            atletas[i].exibirDados();
        }
    }
    menu();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Turma {
    #id;
    #nome;
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
    set nome(novoNome) {
        if (!novoNome || novoNome.length < 3) {
            console.log("Nome inválido. Acesso não permitido.");
            return;
        }
        this.#nome = novoNome;
    }
    get nome() {
        return this.#nome;
    }
    get id() {
        return this.#id;
    }
    exibirDados() {
        console.log(
            "[" + this.id + "] - " + this.nome
        );
    }
}

function adicionarTurma() {
    rl.question(
        "Digite o nome da turma que deseja adicionar: ",
        function (nome) {
            let turma = new Turma(proximoId,nome );
            turmas.push(turma);
            proximoId++;
            console.log("\nTurma adicionada com sucesso!");
            turma.exibirDados();
            menu();
        }
    );
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
                return turma.id === id;
            });
            if (turma) {
                rl.question(
                    "Digite o novo nome da turma: ",
                    function (novoNome) {
                        turma.nome = novoNome.toUpperCase();
                        console.log('\nTurma ID ' +id +' atualizada para "' +turma.nome +'".');
                        menu();
                    }
                );
            } else {
                console.log("\nID não encontrado para atualização.");
                menu();
            }
        }
    );
}

function removerTurma() {
    if (turmas.length === 0) {
        console.log("\nNão existem turmas para remover.");
        menu();
        return;
    }
    console.log("\n===== TURMAS CADASTRADAS =====");
    for (let i = 0; i < turmas.length; i++) {
        turmas[i].exibirDados();
    }
    rl.question(
        "\nDigite o ID da turma que deseja remover: ",
        function (idDigitado) {
            let id = Number(idDigitado);
            let turmaEncontrada = turmas.find(function (turma) {
                return turma.id === id;
            });
            if (turmaEncontrada) {turmas = turmas.filter(function (turma) {
                    return turma.id !== id;
                });
                console.log(
                    "\nTurma '" +turmaEncontrada.nome +"' removida com sucesso!");
            } else {
                console.log("\nTurma não encontrada.");
            }
            menu();
        }
    );
}
function menu() {
    console.log("       SISTEMA DE INTERCLASSES");
    console.log("================================");
    console.log("1. Adicionar Turma");
    console.log("2. Listar Turmas");
    console.log("3. Atualizar Turma");
    console.log("4. Remover Turma");
    console.log("5. Adicionar Atleta");
    console.log("6. Listar Atletas");
    console.log("7. Adicionar Arbitro");
    console.log("8. Listar Arbitros");
    console.log("0. Sair");
    console.log("================================");
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
            adicionarArbitro();
        } else if (opcao === "8") {
            listarArbitros();
        } else if (opcao === "0") {
            console.log("\nSistema encerrado!");
            rl.close();
        } else {
            console.log("\nOpção inválida!");
            menu();
        }
    });
}

menu();