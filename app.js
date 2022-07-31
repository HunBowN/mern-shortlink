// request -  запрос; response - отклик
// nodemon пакет позволяющий перезапускать сервер чтобы не делать это в ручную по факту ка лайфсервер

console.log('salam Node!');

const express = require("express");

const app = express(); // это наш будущий сервер

const mongoose = require("mongoose");

const config = require("config");

app.use(express.json( {extended: true} ))

app.use('/api/auth', require('./routes/auth.routes')) // префикс для будущего пути
app.use('/api/link', require('./routes/link.routes')) 
app.use('/t', require('./routes/redirect.routes')) 

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = config.get("port") || 5000;



async function start() {
    try {

        await mongoose.connect(config.get('mongoUri'), {
            // useNewUrlParser: true,
            // useUnifiedTopology: true, это штуки уже не поддеживаются МогоДБ
            // useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`);
          });
        
    } catch (e) {
        console.log('Server error!', e.message);
        process.exit(1);
    }
}

start();


