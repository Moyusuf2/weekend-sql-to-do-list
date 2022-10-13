const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION
// GET
router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const sqlText = `
    SELECT * 
    FROM "tasks" 
    ORDER BY "id";
    `;
    pool.query(sqlText)
    
    .then((response) => {
        console.log('response is:',response);
        res.send(response.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log(req.body.newTask,)
    sqlText =`INSERT INTO "tasks" 
    ("task")
    VALUES 
    ($1);`;

    const sqlParams = [
      req.body.newTask
    ]
    // console.log(req.body);
    pool.query(sqlText,sqlParams)
        .then((res) => {
            console.log("res is :",res);
            res.send(res);
        })
        .catch((error) => {
            console.log('ERROR in POST /', error);
            res.sendStatus(500);
        })
   
})

router.delete('/:id', (req, res) => {
    console.log('req.params.id',req.params.id);
    const sqlText = `
    DELETE FROM "tasks"
    WHERE "id"=$1;`;
    
    pool.query(sqlText,[req.params.id])
    
      .then((dbRes) => {
        console.log(dbRes);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error in DELETE', err);
        res.sendStatus(500);
      });
  });




module.exports = router;