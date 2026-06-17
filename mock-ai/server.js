import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/chat', (req, res) => {
    const { message } = req.body
    const reply = `Echo: ${message}`
    setTimeout(() => res.json({ reply }), 500)
})

app.listen(3001, () => {
    console.log('Mock AI server running at http://localhost:3001')
})