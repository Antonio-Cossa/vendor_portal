import mongoose from 'mongoose'

const dataBaseConnection = async () => {
    console.log("Aguardando conexao com base de dados ...")
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (e) {
        return console.error("Erro ao conectar a base de dados: " + e.message)
        process.exit(1);

    } finally {
        console.log("Base de dados conectada com sucesso!")
    }

}

export default dataBaseConnection