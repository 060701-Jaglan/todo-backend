import supertest from 'supertest'
import { app } from '../app.js'
//use the supertest object as our API
const api = supertest(app)

import { Item } from '../models/item'
