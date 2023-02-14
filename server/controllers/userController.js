const mysql = require("mysql");

    //SQL
    const pool = mysql.createPool({
        connectionLimit : 100,
        host            : process.env.DB_HOST,
        user            : process.env.DB_USER,
        password        : process.env.DB_PASS,
        database        : process.env.DB_NAME
    });
    
// ? Return ALL users
exports.view = (req,res) =>{
    pool.getConnection((err,connection) =>{
        if(err){
            throw err;
        } 
        console.log("Connected As ID" + connection.threadId)
        //User The Connection
        connection.query(`SELECT * FROM user where status = "active"`,(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.render("home", { rows })
            }else{
                console.log(err)
            }
        });
    });
};

// ?FInd User VIA Search
exports.find = (req,res) =>{
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)

        let searcTerm = req.body.search
        //User The Connection
        connection.query(`SELECT * FROM user WHERE first_name LIKE ? OR last_name like ?`, [`%` + searcTerm +'%' , `%` + searcTerm +'%'],(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.render("home", { rows })
            }else{
                console.log(err)
            }

        });
    });
}

// ! Renders Page
exports.form = (req,res) =>{
    res.render("adduser")
}

// ? add user
exports.create = (req,res) =>{
    const{ first_name, last_name, email, phone, comments } = req.body;

    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)

        let searcTerm = req.body.search
        //User The Connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ? , phone = ?, comments = ? ',[first_name, last_name , email , phone, comments],(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.render("adduser", {alert: `User: ${first_name} Added Succesfully `})
            }else{
                console.log(err)
            }
        });
    });

}

// ? edit
exports.edit = (req,res) =>{
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)
        //User The Connection

        connection.query(`SELECT * FROM user where id = ?`,[req.params.id],(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.render("edituser",{rows})
            }else{
                console.log(err)
            }
        });
    });
}



exports.update = (req,res) =>{
    const{ first_name, last_name, email, phone, comments } = req.body;
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)
        //User The Connection

        connection.query(`UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?`, [first_name, last_name, email , phone,comments, req.params.id] , (err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                pool.getConnection((err,connection) =>{
                    if(err) throw err;
                    console.log("Connected As ID" + connection.threadId)
                    //User The Connection
            
                    connection.query(`SELECT * FROM user where id = ?`,[req.params.id],(err,rows) =>{
                        // ? After Connection Loading
                        connection.release();
                        if(!err){
                            res.render("edituser",{rows , alert:`user ${first_name} Has Been Updated`})
                        }else{
                            console.log(err)
                        }
                    });
                });
            }else{
                console.log(err)
            }
        });
    });
}



// ! delete

exports.delete = (req,res) =>{
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)
        //User The Connection
        connection.query(`DELETE FROM user WHERE id = ?`,[req.params.id],(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.redirect("/")
            }else{
                console.log(err)
            }
        });
    });
}


exports.viewAll = (req,res) =>{
    pool.getConnection((err,connection) =>{
        if(err) throw err;
        console.log("Connected As ID" + connection.threadId)    
        //User The Connection
        connection.query(`SELECT * FROM user WHERE id = ?`,[req.params.id],(err,rows) =>{
            // ? After Connection Loading
            connection.release();
            if(!err){
                res.render("viewuser", { rows })
            }else{
                console.log(err)
            }
        });
    });
};