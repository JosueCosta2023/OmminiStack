const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {  

    beforeEach(async() => {
        // Primeiro desfaça todas as migrations
        await connection.migrate.rollback()

        // Apos crie novas, para evitar acumulo de testes no db
        await connection.migrate.latest()
    })

    afterAll( async () => {
        // Função desconectar do banco
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        
        const response = await request(app).post('/ongs').send({
            name:'Green Peace',
            email: 'GreenPeaceGlobal@hotmail.com',
            whatsapp: '45887659876',
            city: 'New York',
            uf: 'EU'
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8)
    })

   
})