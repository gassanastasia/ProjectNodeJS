"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation qa' },
        { id: 4, title: 'devOps' }
    ]
};
app.get('/', (req, res) => {
    const a = 4;
    if (a > 5) {
        res.send('OK!');
    }
    res.send('Hello World!');
});
app.get('/courses', (req, res) => {
    let foundCourseQuery = db.courses;
    if (req.query.title) {
        foundCourseQuery = foundCourseQuery.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourseQuery);
});
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    const createdcourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdcourse);
    console.log(createdcourse);
    res
        .status(201)
        .json(createdcourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// const http = require('http')
// const fs = require('fs')
// const { resolve } = require('path')
// //промисификация
// const delay = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, ms)
//     })
// }
// const readFile = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, (error, data) => {
//             if(error) reject(error)
//             else resolve(data)
//         })
//     })
// }
// const server = http.createServer(async (request, response) => {
//     switch(request.url){
//         case '/students':
//             response.write('Hello Nastya')
//             break;
//         case '/courses':
//             response.write('FRONT + BACk')
//             break;
//         case '/home':
//             try {
//                 const data = await readFile('pages/home.html')
//                 response.write(data)
//                 response.end()
//             } catch(error) {
//                 response.write('something wrong, 500')
//                 response.end()
//             }
//             break;
//         case '/about':
//             await delay(3000)
//             response.write('ABOUT COURSE')
//             response.end()
//             break;
//         default:
//             response.write('404 not found')
//             response.end()
//     }
// })
// server.listen(3000)
//# sourceMappingURL=index.js.map