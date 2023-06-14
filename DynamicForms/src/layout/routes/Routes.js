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
            <Route path='/adduser/:id' element={<AddUser />} />
                </Routes>
    )
}
export default AppRoutes;