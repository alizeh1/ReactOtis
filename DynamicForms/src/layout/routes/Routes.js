import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Counter } from '../../counter/Counter'
import { FetchData } from '../../fetchdata/FetchData'
import { Home } from '../../home/Home'
import { Department } from '../../home/Department'
import { Employee } from '../../home/Employee'
import { Layout } from '../Layout'
import Groups from '../../groups/Groups'
import { Users } from '../../users/Users'
import { CreateUser } from '../../users/CreateUser'
import { AddUser } from '../../groups/AddUser'
import { UpdateUser } from '../../users/UpdateUser'
import { Login } from '../../login/Login'
import  CreateForms   from '../../forms/CreateForms'
import { Forms } from '../../forms/Forms'
import { MiddleWare } from '../../Middleware'

function AppRoutes() {
    return (
            <Routes>
                    <Route exact path='/' element={<Home />}/>
                    <Route path='/counter' element={<Counter />} />
                    <Route path='/fetch-data' element={<FetchData />} />
                    <Route path='/department' element={<Department />} />
                    <Route path='/employee' element={<Employee />} />
                    <Route path='/groups' element={<Groups />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/createuser' element={<CreateUser />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createforms' element={<CreateForms />} />
            <Route path='/forms' element={<Forms />} />

             <Route path='/adduser/:id' element={<AddUser />} />
            <Route path='/updateUser/:id' element={<UpdateUser />} />
            <Route path='/MiddleWare/: data' element={<MiddleWare />} />
            </Routes>
    )
}
export default AppRoutes;