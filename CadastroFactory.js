const Modalidade = require('./src/models/Modalidade');
const { Arbitro, Atleta } = require('./src/models/Pessoa');
const Equipe = require('./src/models/Equipe');

class CadastroFactory {

    static criarAtleta(id, nome, idTurma) {
        const atleta = new Atleta(id, nome, idTurma);

        if (!atleta.nome) {
            throw new Error('Nome de atleta inválido.');
        }

        if (atleta.idTurma === undefined) {
            throw new Error('Turma do atleta inválida.');
        }

        return atleta;
    }

    static criarArbitro(id, nome, numeroCredencial, anosExperiencia) {
        const arbitro = new Arbitro(
            id,
            nome,
            numeroCredencial,
            anosExperiencia
        );

        if (!arbitro.nome) {
            throw new Error('Nome de árbitro inválido.');
        }

        if (arbitro.numeroCredencial === undefined) {
            throw new Error('Número de credencial inválido.');
        }

        if (arbitro.anosExperiencia === undefined) {
            throw new Error('Anos de experiência inválidos.');
        }

        return arbitro;
    }

    static criarEquipe(id, idTurma, modalidade) {

        if (!Object.values(Modalidade).includes(modalidade)) {
            throw new Error(
                `Modalidade inválida. Use uma de: ${Object.values(Modalidade).join(', ')}`
            );
        }

        const equipe = new Equipe(
            id,
            idTurma,
            modalidade
        );

        if (equipe.idTurma === undefined) {
            throw new Error('Turma da equipe inválida.');
        }

        if (equipe.modalidade === undefined) {
            throw new Error('Modalidade inválida.');
        }

        return equipe;
    }
}

module.exports = CadastroFactory;