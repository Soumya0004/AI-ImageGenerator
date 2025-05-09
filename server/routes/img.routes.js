import express from 'express'
import generateImg from '../Controles/imgControl.js'
import userAuth from '../middlewares/auth.js'


const imgRouter = express.Router()


imgRouter.post('/generateimg',userAuth,generateImg)

export default imgRouter