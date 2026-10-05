const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const Modalidade = require('../models/Modalidade');
const CadastroFactory = require('../../CadastroFactory');
const Turma = require('../models/Turma');

class ArenaConnect {

    static #instancia = null;

    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }

        return ArenaConnect.#instancia;
    }

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error(
                'ArenaConnect já existe. Use ArenaConnect.getInstancia().'
            );
        }

        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];

        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;

        this.carregarEstado();
    }

    adicionarTurma() {
        const nome = prompt("Nome da Turma: ");

        try {
            const novaTurma = new Turma(
                this.idTurmaContador,
                nome
            );

            if (!novaTurma.nome) {
                throw new Error("Nome de turma inválido.");
            }

            this.idTurmaContador++;
            this.turmas.push(novaTurma);

            console.log("✔ Turma registrada com sucesso!");
        } catch (erro) {
            console.log(`✖ Turma não registrada: ${erro.message}`);
        }
    }

    listarTurmas() {
        console.log("\n=== LISTA DE TURMAS ===");

        if (this.turmas.length === 0) {
            return console.log("Nenhuma turma no sistema.");
        }

        this.turmas.forEach(turma => turma.exibir());
    }

    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(
            turma => turma.id === idTurma
        );

        if (!turma) {
            throw new Error(
                `Turma com ID ${idTurma} não existe.`
            );
        }

        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(
            atleta => atleta.id === idAtleta
        );

        if (!atleta) {
            throw new Error(
                `Atleta com ID ${idAtleta} não existe.`
            );
        }

        return atleta;
    }

    adicionarAtleta(idTurma, nome) {
        const turma = this.buscarTurmaOuFalhar(idTurma);

        const novoAtleta = CadastroFactory.criarAtleta(
            this.idAtletaContador,
            nome,
            idTurma
        );

        this.idAtletaContador++;
        this.atletas.push(novoAtleta);

        return {
            atleta: novoAtleta,
            turma: turma
        };
    }

    listarAtletas() {
        return this.atletas.map(atleta => ({
            atleta: atleta,
            nomeTurma:
                this.turmas.find(
                    turma => turma.id === atleta.idTurma
                )?.nome ?? "Turma não encontrada"
        }));
    }

    buscarArbitroOuFalhar(idArbitro) {
        const arbitro = this.arbitros.find(
            arbitro => arbitro.id === idArbitro
        );

        if (!arbitro) {
            throw new Error(
                `Árbitro com ID ${idArbitro} não existe.`
            );
        }

        return arbitro;
    }

    adicionarArbitro() {
        const nome = prompt("Nome do Árbitro: ");

        const numeroCredencial = parseInt(
            prompt("Número de Credencial: ")
        );

        const anosExperiencia = parseInt(
            prompt("Anos de Experiência: ")
        );

        try {
            const novoArbitro =
                CadastroFactory.criarArbitro(
                    this.idArbitroContador,
                    nome,
                    numeroCredencial,
                    anosExperiencia
                );

            this.idArbitroContador++;
            this.arbitros.push(novoArbitro);

            console.log(
                "✔ Árbitro registrado com sucesso!"
            );
        } catch (erro) {
            console.log(
                `✖ Árbitro não registrado: ${erro.message}`
            );
        }
    }

    listarArbitros() {
        console.log("\n=== LISTA DE ÁRBITROS ===");

        if (this.arbitros.length === 0) {
            return console.log(
                "Nenhum árbitro no sistema."
            );
        }

        this.arbitros.forEach(
            arbitro => arbitro.exibir()
        );
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(
            equipe => equipe.id === idEquipe
        );

        if (!equipe) {
            throw new Error(
                `Equipe com ID ${idEquipe} não existe.`
            );
        }

        return equipe;
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(
            equipe =>
                equipe.idTurma === idTurma &&
                equipe.modalidade === modalidade
        );
    }

    adicionarEquipe() {
        this.listarTurmas();

        const idTurma = parseInt(
            prompt("ID da Turma: ")
        );

        try {
            const turma =
                this.buscarTurmaOuFalhar(idTurma);

            console.log("\nModalidades disponíveis:");

            Object.values(Modalidade).forEach(
                modalidade =>
                    console.log(`- ${modalidade}`)
            );

            const modalidade = prompt(
                "Modalidade (copie exatamente como está na lista acima): "
            );

            if (this.equipeJaExiste(idTurma, modalidade)) {
                throw new Error(
                    `A turma ${turma.nome} já tem uma equipe em "${modalidade}".`
                );
            }

            const novaEquipe =
                CadastroFactory.criarEquipe(
                    this.idEquipeContador,
                    idTurma,
                    modalidade
                );

            this.idEquipeContador++;
            this.equipes.push(novaEquipe);

            console.log(
                `✔ Equipe registrada: ${turma.nome} em "${modalidade}"!`
            );
        } catch (erro) {
            console.log(
                `✖ Equipe não registrada: ${erro.message}`
            );
        }
    }

    listarEquipes() {
        console.log("\n=== LISTA DE EQUIPES ===");

        if (this.equipes.length === 0) {
            return console.log(
                "Nenhuma equipe no sistema."
            );
        }

        this.equipes.forEach(equipe => {
            const turma = this.turmas.find(
                turma => turma.id === equipe.idTurma
            );

            const nomesAtletas = equipe.atletas
                .map(idAtleta =>
                    this.atletas.find(
                        atleta => atleta.id === idAtleta
                    )
                )
                .filter(atleta => atleta)
                .map(atleta => atleta.nome);

            equipe.exibir(
                turma
                    ? turma.nome
                    : "TURMA NÃO ENCONTRADA",
                nomesAtletas
            );
        });
    }

    removerEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe a remover: ")
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(idEquipe);

            this.equipes =
                this.equipes.filter(
                    equipeAtual =>
                        equipeAtual.id !== equipe.id
                );

            console.log(
                `✔ Equipe removida. Os atletas continuam no sistema (total de atletas: ${this.atletas.length}).`
            );
        } catch (erro) {
            console.log(
                ` Não foi possível remover: ${erro.message}`
            );
        }
    }

    vincularAtletaEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(idEquipe);

            const listaAtletas = this.listarAtletas();

            listaAtletas.forEach(
                ({ atleta, nomeTurma }) =>
                    atleta.exibir(nomeTurma)
            );

            const idAtleta = parseInt(
                prompt("ID do Atleta: ")
            );

            const atleta =
                this.buscarAtletaOuFalhar(idAtleta);

            if (atleta.idTurma !== equipe.idTurma) {
                throw new Error(
                    `${atleta.nome} não pertence à turma dessa equipe.`
                );
            }

            if (!equipe.adicionarAtleta(idAtleta)) {
                throw new Error(
                    `${atleta.nome} já está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} vinculado à equipe de "${equipe.modalidade}"!`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível vincular: ${erro.message}`
            );
        }
    }

    desvincularAtletaEquipe() {
        this.listarEquipes();

        const idEquipe = parseInt(
            prompt("ID da Equipe: ")
        );

        try {
            const equipe =
                this.buscarEquipeOuFalhar(idEquipe);

            const idAtleta = parseInt(
                prompt("ID do Atleta a remover da equipe: ")
            );

            const atleta =
                this.buscarAtletaOuFalhar(idAtleta);

            if (!equipe.removerAtleta(idAtleta)) {
                throw new Error(
                    `${atleta.nome} não está nessa equipe.`
                );
            }

            console.log(
                `✔ ${atleta.nome} removido da equipe.`
            );
        } catch (erro) {
            console.log(
                `✖ Não foi possível desvincular: ${erro.message}`
            );
        }
    }

    salvarEstado() {
        const caminhoArquivo =
            path.join(__dirname, '../../dados.json');

        const estado = {
            turmas: this.turmas.map(turma => ({
                id: turma.id,
                nome: turma.nome
            })),

            atletas: this.atletas.map(atleta => ({
                id: atleta.id,
                nome: atleta.nome,
                idTurma: atleta.idTurma
            })),

            arbitros: this.arbitros.map(arbitro => ({
                id: arbitro.id,
                nome: arbitro.nome,
                numeroCredencial: arbitro.numeroCredencial,
                anosExperiencia: arbitro.anosExperiencia
            })),

            equipes: this.equipes.map(equipe => ({
                id: equipe.id,
                idTurma: equipe.idTurma,
                modalidade: equipe.modalidade,
                atletas: [...equipe.atletas]
            })),

            contadores: {
                idTurmaContador: this.idTurmaContador,
                idAtletaContador: this.idAtletaContador,
                idArbitroContador: this.idArbitroContador,
                idEquipeContador: this.idEquipeContador
            }
        };

        fs.writeFileSync(
            caminhoArquivo,
            JSON.stringify(estado, null, 2),
            'utf-8'
        );
    }

    carregarEstado() {
        const caminhoArquivo =
            path.join(__dirname, '../../dados.json');

        if (!fs.existsSync(caminhoArquivo)) {
            return;
        }

        try {
            const dados =
                JSON.parse(
                    fs.readFileSync(
                        caminhoArquivo,
                        'utf-8'
                    )
                );

            this.turmas =
                (dados.turmas ?? []).map(
                    turma =>
                        new Turma(
                            turma.id,
                            turma.nome
                        )
                );

            this.atletas =
                (dados.atletas ?? []).map(
                    atleta =>
                        CadastroFactory.criarAtleta(
                            atleta.id,
                            atleta.nome,
                            atleta.idTurma
                        )
                );

            this.arbitros =
                (dados.arbitros ?? []).map(
                    arbitro =>
                        CadastroFactory.criarArbitro(
                            arbitro.id,
                            arbitro.nome,
                            arbitro.numeroCredencial,
                            arbitro.anosExperiencia
                        )
                );

            this.equipes =
                (dados.equipes ?? []).map(
                    dadosEquipe => {
                        const equipe =
                            CadastroFactory.criarEquipe(
                                dadosEquipe.id,
                                dadosEquipe.idTurma,
                                dadosEquipe.modalidade
                            );

                        (dadosEquipe.atletas ?? [])
                            .forEach(
                                idAtleta =>
                                    equipe.adicionarAtleta(
                                        idAtleta
                                    )
                            );

                        return equipe;
                    }
                );

            if (dados.contadores) {
                this.idTurmaContador =
                    dados.contadores.idTurmaContador ?? 1;

                this.idAtletaContador =
                    dados.contadores.idAtletaContador ?? 1;

                this.idArbitroContador =
                    dados.contadores.idArbitroContador ?? 1;

                this.idEquipeContador =
                    dados.contadores.idEquipeContador ?? 1;
            }

        } catch (erro) {
            console.log(
                ` Não foi possível carregar os dados: ${erro.message}`
            );

            console.log(
                "O sistema será iniciado vazio."
            );
        }
    }
}

module.exports = ArenaConnect;