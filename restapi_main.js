// Require the framework and instantiate it
const fastify = require('fastify')({debug:true})
const mysql = require('mysql')
var jwt = require('jsonwebtoken')
const https = require('https')
const secret_key = "secret"

var datetime = require('node-datetime');
const { parse } = require('path');
const { res } = require('pino-std-serializers')
var dt = datetime.create('2015-04-30 09:52:00 AM');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "algoji123",
    database: "algoji",
    connectionLimit: 10,
    port:3306,
    debug:true,
    multipleStatements: true
});

//#region  LOGIN
fastify.post('/login', async (request, reply) => {
    var body = request.body
    const options = {
        hostname: 'api.algoji.com',
        port: 443,
        path: '/api/Login/SubsUser',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        }

    const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    if(res.statusCode ==200){
        var user_credentials = {}
        for(var key in body){
            lower_key = key.toLowerCase()
            user_credentials[lower_key] = body[key]
        }

        console.log(user_credentials)
        var token = jwt.sign(JSON.stringify(user_credentials), secret_key);
        reply.send({"data":token,"error":false })
    }
    else{
        reply.send({"data":"Invalid Token","error":true })
    }   
    })

    req.on('error', error => {
        console.error(error)
        reply.send(error)
    })

    req.write(JSON.stringify(body))
    req.end() 
    return reply
})

//#endregion



// Declare a route

//GET METHODS
//#region GET METHODS
fastify.get('/api/v1/GetOpenOrders', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.get('/api/v1/GetOrderBook', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.get('/api/v1/GetTradeBook', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.get('/api/v1/GetSymbolSettings', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.get('/api/v1/GetAppSettings', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.get('/api/v1/GetAppLogs', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    if(Object.keys(request.query).length!=0){
        var id = request.query.id
        pool.query(`select * from test where name=? and id>=?`, [decoded.username,id] ,(error, results, fields) => {
            if (error) {
                return console.log("error" + error);
            }
            reply.send(results)
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }
    else{
        pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
            if (error) {
                return console.log("error" + error);
            }
            reply.send(results)
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }
    return reply
})

fastify.get('/api/v1/GetAPILogs', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    if(Object.keys(request.query).length!=0){
        var id = request.query.id
        pool.query(`select * from test where name=? and id>=?`, [decoded.username,id] ,(error, results, fields) => {
            if (error) {
                return console.log("error" + error);
            }
            reply.send(results)
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }
    else{
        pool.query(`select * from test where name=?`, decoded.username ,(error, results, fields) => {
            if (error) {
                return console.log("error" + error);
            }
            reply.send(results)
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }
    return reply
})

fastify.get('/api/v1/GetTodaysAppLogs', async (request, reply) => {
    
    var auth_token = request.headers.authorization

    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    var x= new Date()
    console.log(x)
    var start_today = datetime.create(x.toString(),'Y-m-d 00:00:00.000000').format()
    var end_today = datetime.create(x.toString(),'Y-m-d 23:59:59.999999').format()
    console.log("todays date is"+ JSON.stringify(start_today))
    console.log("todays date is"+ JSON.stringify(end_today))
    pool.query(`select * from test where name=? and ts>=? and ts<=?`, [decoded.username,start_today,end_today] ,(error, results, fields) => {
        if (error) {
            return console.log("error" + error);
        }
        reply.send(results)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})
//#endregion


//PUT METHODS
//#region PUT METHODS

fastify.put('/api/v1/UpdateOrderStatus', async (request, reply) => {
    var body = request.body
    body.date = new Date(datetime.create(body.date).now());
    console.log("values is"+ typeof values)

    //for upserting : 
    // insert into test set name="bbb",ts="2021-12-01" 
    // on duplicate key update name="bbb",ts="2022-12-01";
    // ALTER TABLE test AUTO_INCREMENT = 1;

    var query_string = `UPDATE test SET ? WHERE ID=?`;
    console.log(body)
    pool.query(query_string, [body,body.ID], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.insertId)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.put('/api/v1/UpdateAppSettings', async (request, reply) => {
    var body = request.body
    body.date = new Date(datetime.create(body.date).now());
    console.log("values is"+ typeof values)
    var query_string = `UPDATE test SET ? WHERE ID=?`;
    console.log(body)
    pool.query(query_string, [body,body.ID], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.insertId)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

//#endregion

//DELETE METHODS
//#region DELETE METHODS

fastify.delete('/api/v1/DeleteSignalSettings', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    
    var id = parseInt(request.query.id) 
    var query_string = `DELETE from test WHERE ID=?`;
    pool.query(query_string, id, (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.affectedRows)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.delete('/api/v1/DeleteAllSignalSettings', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    var id = parseInt(request.query.id) 
    var query_string = `DELETE from test WHERE ID=?`;
    pool.query(query_string, id, (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.affectedRows)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.delete('/api/v1/ClearAppLogs', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var id = parseInt(request.query.id) 
    var query_string = `DELETE from test WHERE ID=?`;
    pool.query(query_string, id, (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.affectedRows)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.delete('/api/v1/ClearAppLogsToday', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var id = parseInt(request.query.id) 
    var query_string = `DELETE from test WHERE ID=?`;
    pool.query(query_string, id, (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results.affectedRows)
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

//#endregion


//POST METHODS
//#region POST METHODS

fastify.post('/api/v1/AddOrder', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
    console.log("body is:"+ JSON.stringify(body) )
    pool.query(query_string, [body,parseInt(1)], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results[0].insertId)
        console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.post('/api/v1/AddTrade', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
    console.log("body is:"+ JSON.stringify(body) )
    pool.query(query_string, [body,parseInt(1)], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results[0].insertId)
        console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.post('/api/v1/AddSignalSetting', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
    console.log("body is:"+ JSON.stringify(body) )
    pool.query(query_string, [body,parseInt(1)], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results[0].insertId)
        console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.post('/api/v1/AddAppLog', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
    console.log("body is:"+ JSON.stringify(body) )
    pool.query(query_string, [body,parseInt(1)], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results[0].insertId)
        console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.post('/api/v1/AddAPILog', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
    console.log("body is:"+ JSON.stringify(body) )
    pool.query(query_string, [body,parseInt(1)], (error, results, fields) => {
        if (error) {
            reply.send("Error while inserting data, error is: "+error)
        }
        reply.send(results[0].insertId)
        console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
        console.log("fields are"+ JSON.stringify(fields) )
    })
    return reply
})

fastify.post('/api/v1/AddSignalSettingBulk', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }
    
    var errorcount=0
    var duplicate_count=0
    var inserted_count=0
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    for(var i =0; i<body.length;i++){

        //set username here from decoded

        var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
        console.log("body is:"+ JSON.stringify(body) )
        pool.query(query_string, [body[i],parseInt(1)], (error, results, fields) => {
            if (error) {
                errorcount+= 1 
            }
            duplicate_count+=  parseInt(results[0].changedRows) 
            inserted_count+=  parseInt(results[0].affectedRows) 
            console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }

    var reply = "Data inserted with inserted row count: "+inserted_count+" and duplicate count: "+duplicate_count+" .SQL insert errors: "+errorcount
    return reply
})

fastify.post('/api/v1/BulkAddAppLogs', async (request, reply) => {
    
    var auth_token = request.headers.authorization
    //get username here
    try {
        var decoded = jwt.verify(auth_token, secret_key);
    } catch(err) {
        return("Invalid token, error: "+err)
    }

    var errorcount=0, duplicate_count=0, inserted_count=0
    var body = request.body
    console.log("params are: "+ JSON.stringify(request.params) )
    console.log("headers are: "+ JSON.stringify(request.headers) )
    console.log("querystring is: "+JSON.stringify(request.query) )
    body.ts = new Date(datetime.create(body.ts).now());
    console.log("values is"+ typeof values)
    for(var i =0; i<body.length;i++){
        var query_string = `INSERT IGNORE INTO test SET ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
        console.log("body is:"+ JSON.stringify(body) )
        pool.query(query_string, [body[i],parseInt(1)], (error, results, fields) => {
            if (error) {
                errorcount+= 1 
            }
            duplicate_count+=  results[0].changedRows
            inserted_count+=results[0].affectedRows
            console.log("hufuwrfuerfuefgeuf"+JSON.stringify(results[0]))
            console.log("fields are"+ JSON.stringify(fields) )
        })
    }

    var reply = "Data inserted with inserted row count: "+inserted_count+" and duplicate count: "+duplicate_count+" .SQL insert errors: "+errorcount
    return reply
})


// fastify.post('/addDataBulk', async (request, reply) => {
//     var body = request.body
//     console.log("params are: "+ JSON.stringify(request.params) )
//     console.log("headers are: "+ JSON.stringify(request.headers) )
//     console.log("querystring is: "+JSON.stringify(request.query) )
//     body.ts = new Date(datetime.create(body.ts).now());
//     console.log("values is"+ typeof values)
//     var columns = []
//     var values=[]
//     for(var key in body[0]){
//         columns.push(key)
//     }
//     console.log("columns are"+columns)
//    for(var i =0; i<body.length;i++){
//         var temp=[]
//         console.log("current boooody is"+JSON.stringify(body[i]))
//         for(var key in body[i]){
//             temp.push(body[i][key])
//         }
//         console.log("temp is"+temp)
//         values.push(temp)
//    }
//    console.log("values aree"+JSON.stringify(values))
//     var query_string = `INSERT IGNORE INTO test(??) Values ?; ALTER TABLE test AUTO_INCREMENT = ?;`;
//     console.log("body is:"+ JSON.stringify(body) )
//     pool.query(query_string, [columns,values,parseInt(1)], (error, results, fields) => {
//         if (error) {
//             reply.send("Error while inserting data, error is: "+error)
//         }
//         console.log(JSON.stringify(results[0]))
//         reply.send("Data inserted with number of rows inserted: "+results[0].affectedRows+" and duplicates ignored: "+results[0].changedRows)
//         console.log("fields are"+ JSON.stringify(fields) )
//     })
//     return reply
// })

//#endregion



// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()