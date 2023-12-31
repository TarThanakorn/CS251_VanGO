// importing the dependencies
const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const dbConnection = require('./database');
const bcrypt = require('bcrypt');
const upload = require('express-fileupload');

// defining the Express app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname,'src'));
app.set('view engine','ejs');
app.use(express.static('src'));

// adding Helmet to enhance your API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(upload());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  7200 * 1000 // 120 mins
}));

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('login');
    }
    next();
}
const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}

app.get('/', ifNotLoggedin, (req,res,next) => {
    return res.redirect('/home');
});

app.post('/', ifLoggedin, [
    body('username').custom((value) => {
        return dbConnection.execute('SELECT Username FROM account WHERE Username=?', [value])
        .then(([rows]) => {
            if(rows[0] === undefined)
                return Promise.reject('ชื่อผู้ใช้ไม่ถูกต้อง');
            if(value === rows[0].Username){
                return true;
            }
            return Promise.reject('ชื่อผู้ใช้ไม่ถูกต้อง');
        });
    }),
    body('password','กรุณากรอกรหัสผ่าน').trim().not().isEmpty(),
    ],(req, res) => {
    const validation_result = validationResult(req);
    const {password, username} = req.body;
    if(validation_result.isEmpty()){
        dbConnection.execute("SELECT * FROM `account` WHERE `Username`=?",[username])
        .then(([rows]) => {
            bcrypt.compare(password, rows[0].Password, function(err, result) {
                if(result==true){
                    dbConnection.execute("UPDATE account SET LastLogin=? WHERE UID=?", [new Date(),rows[0].UID], function (err) {
                        if (err) res.send(err);
                    });
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].UID;
                    req.session.user = rows[0].Username;
                    req.session.typeAccount = rows[0].Status;
                    res.redirect('/home');
                }else{
                    res.render('login',{
                        login_errors:['รหัสผ่านไม่ถูกต้อง']
                    });
                }

            });

        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login',{
            login_errors:allErrors
        });
    }
});

app.post('/reg', ifLoggedin, [
    body('username').custom((value) => {
        return dbConnection.execute('SELECT Username FROM account WHERE Username=?', [value])
        .then(([rows]) => {
            if(rows[0] === undefined){
                return true;
            }
            if(value === rows[0].Username)
                return Promise.reject('ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว');
            return Promise.reject('ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว');
        });
    }),
    body('password','กรุณากรอกรหัสผ่าน').trim().not().isEmpty(),
    ],(req, res) => {
    const validation_result = validationResult(req);
    const {password, passwordcon, username} = req.body;
    if(validation_result.isEmpty()){
        var check = true;
        if(username.length < 3){
            check = false;
            res.render('login',{
                register_errors:['ชื่อผู้ใช้ต้องมีความยาว 3 ตัวขึ้นไป']
            });
        }
        if(password.length < 8){
            check = false;
            res.render('login',{
                register_errors:['รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป']
            });
        }
        if(password != passwordcon){
            check = false;
            res.render('login',{
                register_errors:['รหัสผ่านไม่ตรงกัน']
            });
        }
        if(check == true){
            bcrypt.genSalt(10, function(err, salt) {
                if(err) throw err;
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err) throw err;
                    dbConnection.execute("INSERT INTO account(Username,Password) VALUES(?,?)", [username, hash], function (err) {
                        if (err) throw err;
                    }).then(()=>{
                        dbConnection.execute("INSERT INTO tel(Tel) VALUES(?)", [null], function (err) {
                            if (err) throw err;
                        });
                        dbConnection.execute("INSERT INTO data(Gender) VALUES(?)", ['-'], function (err) {
                            if (err) throw err;
                        }).then(()=>{
                            res.render('login',{
                                register_errors:['ลงทะเบียนสำเร็จ']
                            });
                        });
                    });
                });
            });
        }
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login',{
            register_errors:allErrors
        });
    }
});

app.get('/fetchData', (req, res, err) => {
    dbConnection.execute("SELECT * FROM `data` WHERE `UID`=?",[req.session.userID])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            dbConnection.execute("SELECT Tel FROM `tel` WHERE `UID`=?",[req.session.userID])
            .then(([tel]) => {
                if(tel[0] !== undefined)
                    res.send(Object.assign(rows[0], {Username: req.session.user,Status: req.session.typeAccount, Tel: tel[0].Tel}));
                else 
                    res.send(Object.assign(rows[0], {Username: req.session.user,Status: req.session.typeAccount}));
            });
        }
    });
});

app.get('/fetchRoute', (req, res) => {
    const FullSeat = '{"s1":"1","s2":"1","s3":"1","s4":"1","s5":"1","s6":"1","s7":"1","s8":"1","s9":"1","s10":"1","s11":"1","s12":"1","s13":"1","s14":"1"}';
    dbConnection.execute("SELECT * FROM `route` WHERE `RStatus`=1 AND `REnter`=? AND `SeatInf`<>?", [req.query.from, FullSeat])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/fetchAllRoute', (req, res) => {
    dbConnection.execute("SELECT * FROM `route` WHERE `RStatus` <> ?", [4])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/fetchSelectedRoute', (req, res) => {
    dbConnection.execute("SELECT * FROM `route` WHERE `RouteID`=?", [req.query.rid])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/fetchSelRoute', (req, res) => {
    const FullSeat = '{"s1":"1","s2":"1","s3":"1","s4":"1","s5":"1","s6":"1","s7":"1","s8":"1","s9":"1","s10":"1","s11":"1","s12":"1","s13":"1","s14":"1"}';
    dbConnection.execute("SELECT * FROM `route` WHERE `RStatus`=1 AND `REnter`=? AND `RExit`=? AND `SeatInf`<>?", [req.query.from, req.query.exit, FullSeat])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/fetchSeat', (req, res) => {
    dbConnection.execute("SELECT SeatInf FROM `route` WHERE `RouteID`=?", [req.query.rid])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/fetchTicket', (req, res) => {
    dbConnection.execute("SELECT * FROM `ticket` WHERE `TID`=?", [req.query.tid])
    .then(([rows]) => {
        if(rows[0] !== undefined){
            res.send(rows);    
        }
    });
});

app.get('/track', (req, res) => {
    dbConnection.execute("SELECT * FROM `ticket` WHERE `UID`=? ORDER BY `TID` DESC",[req.session.userID])
    .then(([rows]) => {
        res.send(rows);          
    });
});

app.get('/getroute', (req, res) => {
    dbConnection.execute("SELECT * FROM `route` WHERE `RouteID`=?",[req.query.rid])
    .then(([rows]) => {
        res.send(rows);
    });
});


app.post('/uploadprofile', (req, res) => {
    if(req.files){
        var file = req.files.file;
        var pathprofile = req.session.userID+'.png';
        file.mv('./src/profile/'+pathprofile, function(err){
            if(err) res.send(err);
        })
        dbConnection.execute("UPDATE data SET FName=?, LName=?, Birthday=?, Gender=?, ProfilePic=? WHERE UID=?", [req.body.fname, req.body.lname, req.body.bdate, req.body.gender, pathprofile, req.session.userID], function (err) {
            if (err) res.send(err);
        });
        dbConnection.execute("UPDATE tel SET Tel=? WHERE UID=?", [req.body.tel, req.session.userID], function (err) {
            if (err) res.send(err);
        });
    }else{
        dbConnection.execute("UPDATE data SET FName=?, LName=?, Birthday=?, Gender=? WHERE UID=?", [req.body.fname, req.body.lname, req.body.bdate, req.body.gender, req.session.userID], function (err) {
            if (err) res.send(err);
        });
        dbConnection.execute("UPDATE tel SET Tel=? WHERE UID=?", [req.body.tel, req.session.userID], function (err) {
            if (err) res.send(err);
        });
    }

    res.redirect('/profile');
    res.end();
});

app.post('/bookings', (req, res) => {
    dbConnection.execute("SELECT SeatInf FROM `route` WHERE `RouteID`=?", [req.query.rid])
    .then(([rows]) => {
        seat = JSON.parse(rows[0].SeatInf);
        for(var i = 0; i < req.query.selectseat.length; i++){
            if(req.query.selectseat[i]-1 != 0 && Object.values(seat)[req.query.selectseat[i]-1] == '1'){
                res.send("ที่นั่ง S"+i+" ถูกจองไปแล้ว");
                break;
            }
        }
        dbConnection.execute("UPDATE route SET SeatInf=? WHERE RouteID=?", [req.query.seatData,req.query.rid], function (err) {
            if (err) res.send(err);
        });
        dbConnection.execute("INSERT INTO ticket(TSeat,UID,RouteID) VALUES(?,?,?)", [req.query.selectseat.toString(),req.session.userID,req.query.rid], function (err) {
            if (err) res.send(err);
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });

});

app.post('/edittic', (req, res) => {
    dbConnection.execute("SELECT SeatInf FROM `route` WHERE `RouteID`=?", [req.query.rid])
    .then(([rows]) => {
        var conti = true;
        seat = JSON.parse(rows[0].SeatInf);
        for(var i = 0; i < req.query.selectseat.length; i++){
            if(req.query.selectseat[i]-1 != 0 && Object.values(seat)[req.query.selectseat[i]-1] == '1' && !req.query.useOldroute){
                conti = false;
                res.send("ที่นั่ง S"+i+" ถูกจองไปแล้ว");
                break;
            }
        }
        if(conti){
            dbConnection.execute("UPDATE route SET SeatInf=? WHERE RouteID=?", [req.query.removeSeat,req.query.oldrid], function (err) {
                if (err) res.send(err);
            });
            dbConnection.execute("UPDATE route SET SeatInf=? WHERE RouteID=?", [req.query.seatData,req.query.rid], function (err) {
                if (err) res.send(err);
            });
            dbConnection.execute("UPDATE ticket SET TSeat=?,RouteID=? WHERE TID=?", [req.query.selectseat.toString(),req.query.rid,req.query.tid], function (err) {
                if (err) res.send(err);
            });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });

});

app.post('/newroute', (req, res) => {
    dbConnection.execute("INSERT INTO route(REnter,RExit,RDate,RTime,RPrice) VALUES(?,?,?,?,?)", [parseInt(req.query.from),parseInt(req.query.exit),req.query.date,String(req.query.time),parseInt(req.query.price)], function (err) {
        if (err) res.send(err);
    });
});

app.post('/updateroute', (req, res) => {
    dbConnection.execute("UPDATE route SET RStatus=? WHERE RouteID=?", [req.query.status,req.query.rid], function (err) {
        if (err) res.send(err);
    });
});

app.get('/home', function(request, response) {
    if(request.session.isLoggedIn)
        if (request.session.typeAccount == 1 || request.session.typeAccount == 2)
            response.sendFile(path.join(__dirname + '/src/home.html'));
        else if (request.session.typeAccount == 3)
        response.sendFile(path.join(__dirname + '/src/driver.html'));
    else
        response.redirect('/');
});

app.get('/profile', function(request, response) {
    if(request.session.isLoggedIn)
        response.sendFile(path.join(__dirname + '/src/profile.html'));
    else
        response.redirect('/');
});

app.get('/booking', function(request, response) {
    if(request.session.isLoggedIn)
        response.sendFile(path.join(__dirname + '/src/booking.html'));
    else
        response.redirect('/');
});

app.get('/tracking', function(request, response) {
    if(request.session.isLoggedIn)
        response.sendFile(path.join(__dirname + '/src/tracking.html'));
    else
        response.redirect('/');
});

app.get('/newroute', function(request, response) {
    if(request.session.isLoggedIn && request.session.typeAccount == 3)
        response.sendFile(path.join(__dirname + '/src/newroute.html'));
    else
        response.redirect('/');
});

app.get('/ticket', function(req, res) {
    if(req.session.isLoggedIn){
        dbConnection.execute("SELECT UID,TStatus FROM `ticket` WHERE `TID`=?",[req.query.tid])
        .then(([rows]) => {
            if(rows[0] != null && rows[0].UID == req.session.userID && rows[0].TStatus !== 4)
                res.sendFile(path.join(__dirname + '/src/ticket.html'));
            else
                res.redirect('/tracking');
        });
    }else
        res.redirect('/tracking');
});

app.get('/editticket', function(req, res) {
    if(req.session.isLoggedIn){
        dbConnection.execute("SELECT UID,TStatus FROM `ticket` WHERE `TID`=?",[req.query.tid])
        .then(([rows]) => {
            if(rows[0] != null && rows[0].UID == req.session.userID && rows[0].TStatus == 1)
                res.sendFile(path.join(__dirname + '/src/editticket.html'));
            else
                res.redirect('/tracking');
        });
    }else
        res.redirect('/tracking');
});

app.get('/payment', function(request, response) {
    if(request.session.isLoggedIn)
        response.sendFile(path.join(__dirname + '/src/payment.html'));
    else
        response.redirect('/');
});

app.get('/statusroute', function(request, response) {
    if(request.session.isLoggedIn && request.session.typeAccount == 3)
        response.sendFile(path.join(__dirname + '/src/editstatus.html'));
    else
        response.redirect('/');
});

app.get('/editst', function(request, response) {
    if(request.session.isLoggedIn && request.session.typeAccount == 3)
        response.sendFile(path.join(__dirname + '/src/editst.html'));
    else
        response.redirect('/');
});

app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});

// starting the server
app.listen(3000, () => {
    console.log('listening on port 3000');
});