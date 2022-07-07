const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if(req.method === 'GET'){
        fs.readFile('./views/calculator.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const dataInput = qs.parse(data);
            fs.readFile('./views/calculator.html', 'utf-8' , (err, datahtml) => {
                if(err){
                    console.log(err)
                }
                let a = parseInt(dataInput.numberA);
                let b = parseInt(dataInput.numberB);
                let calculator = dataInput.calculator;
                let result = 0;
                if(calculator === '+'){
                    result += a + b;
                }else if(calculator === '-'){
                    result += a - b;
                }else if(calculator === '*'){
                    result += a * b;
                }else if(calculator === '/'){
                    result += a / b;
                }
                datahtml = datahtml.replace('{numberA}', a);
                datahtml = datahtml.replace('{calculator}', calculator);
                datahtml = datahtml.replace('{numberB}', b);
                datahtml = datahtml.replace('{result}', result);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(datahtml);
                return res.end();
            })
        })
        req.on('error', ()=>{
            console.log('error')
        })
    }
})

server.listen(8080, () => {
    console.log('Server running')
})