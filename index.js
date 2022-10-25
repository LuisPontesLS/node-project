const express = require('express')
const app = express()
app.use(express.json())

const uuid = require('uuid')

const door = 3013
const listUsers = []
//========================================================================
/*3 POST - Criar*/
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const newUser = { id: uuid.v4(), name, age }
    listUsers.push(newUser)
    return response.status(201).json(newUser)
})
//------------------------------------------------------------------------
/*4 GETing all list - Consulta geral*/
app.get('/users', (request, response) => {
    return response.json(listUsers)
})
//........................................................................
/*4.1 GETing element by 'id' - Consulta por 'id'*/
app.get('/users/:id', (request, response) => {
    const { id } = request.params
    const wanted = listUsers.find(each => each.id === id)
    return response.json(wanted)
})
//------------------------------------------------------------------------
/*5 PUT - Atualização*/
app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body
    const updatedUser = { id, name, age }

    const indexSearchedUser = listUsers.findIndex(item => item.id === id)

    if (indexSearchedUser < 0) {
        return response.status(404).json( {message: "ERROR 404 - User not found"})
    }

    listUsers[indexSearchedUser] = updatedUser

    return response.status(201).json(updatedUser)
})
//------------------------------------------------------------------------
/*6 DELETE*/
app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    //take care with '=>'
    const indexToDelete = listUsers.findIndex(toDelete => toDelete.id === id)

    if (indexToDelete < 0) {
        return response.status(404).json( {message: "User to delete not found"})
    }

    listUsers.splice(indexToDelete, 1)

    return response.status(201).json()
})
//========================================================================
/*2*/
app.listen(door, () => {
    console.log(` Server runnin on door ${door}. `);
})
