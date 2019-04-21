const connection = require('../conf');
const express = require('express')
const apiRouter = express.Router();
var mysql = require('mysql');

apiRouter.post(('/profile/sign-up'), (req, res, next) => {
    const formData = req.body;
    connection.query('INSERT INTO customer SET ?', formData, (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error while the creation of your profile');
        } else {
            res.json(results);
        }
    });
})

// API pour ajouter un Sales Account
apiRouter.post(('/add_sales'), (req, res, next) => {
    const formData = req.body;
    connection.query('INSERT INTO sales SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send('Error while creating a sale profile');
        } else {
            res.json(results);
        }
    });
})

// add product: API pour ajouter un produit
apiRouter.post(('/admin/add-product'), (req, res, next) => {
    const formData = req.body;
    connection.query('INSERT INTO product SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send('Error while adding a product');
        } else {
            res.json(results);
        }
    });
})


// add product: API pour ajouter un taille des produit
apiRouter.post(('/admin/add-product-sizes'), (req, res, next) => {
    const formData = req.body;
    connection.query('INSERT INTO sizes SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send('Error while adding product sizes');
        } else {
            res.json(results);
        }
    });
})

apiRouter.post(('/profile/login-customers'), (req, res) => {
    const formData = req.body;
    const login = formData.login;
    const password = formData.password;
    connection.query('SELECT * FROM customer WHERE login = ? AND password = ?', [login, password], (err, results) => {
        if (err) {
            res.status(500).json({ isValide: false });
        } else {
            if (results.length !== 0) {
                res.status(200).json({ id: results[0], isValide: true });
            } else {
                res.status(500).json({ isValide: false });
            }
        }

    });
});

apiRouter.post(('/profile/login-sales'), (req, res) => {
    const formData = req.body;
    const login = formData.login;
    const password = formData.password;
    connection.query(`SELECT id FROM sales WHERE country = ? And password = ?`, [login, password], (err, results) => {
        if (err) {
            res.status(500).json({ isValide: false });
        } else {
            if (results.length !== 0) {
                res.status(200).json({ id: results, isValide: true });

            } else {
                res.status(500).json({ isValide: false });
            }

        }

    });
});

apiRouter.get(('/orders/total-price'), (req, res) => {
    connection.query('SELECT price_total FROM orders', (err, results) => {
        if (err) {
            res.status(500).send('Errors with Invoices recuperation');
        } else {
            res.json(results);
        }

    });
});

apiRouter.get(('/orders/total-unit-sell'), (req, res) => {
    connection.query('SELECT quantity FROM order_detail', (err, results) => {
        if (err) {
            res.status(500).send('Error with sell parts recuperation');
        } else {
            res.json(results);
        }

    });
});

apiRouter.get(('/orders/unpaid'), (req, res) => {

    connection.query('SELECT * FROM orders INNER JOIN customer ON orders.customer_id=customer.id', (err, results) => {
        if (err) {

            res.status(500).send('Error while retrieving bills');
        } else {
            res.json(results);
        }

    });
});

apiRouter.get(('/orders/recent-orders'), (req, res) => {
    connection.query('SELECT name_shop, orders.id, price_total from orders inner join customer on customer.id=orders.customer_id ORDER BY date DESC', (err, results) => {
        if (err) {
            res.status(500).send('Error while retrieving orders');
        } else {
            res.json(results);
        }
    });
});

apiRouter.get('/orders/fourmonths', (req, res) => {
    connection.query('SELECT * FROM customer JOIN orders ON customer.id = orders.customer_id where date<= DATE_ADD(CURRENT_DATE, INTERVAL -4 MONTH)', (err, results) => {
        if (err) {
            res.status(500).send('Error with customer recuperation');
        } else {
            res.json(results);
        }
    });
});

// search customers
apiRouter.get('/customers', (req, res) => {
    connection.query('select * from customer', (err, results) => {
        if (err) {
            res.status(500).send('Error with customere recuperation');
        } else {
            res.json(results);
        }
    });
});



apiRouter.get('/calecons', (req, res) => {
    connection.query('SELECT * FROM product INNER JOIN sizes ON product.id=sizes.product_id WHERE product.type="Caleçons"', (err, results) => {
        if (err) {
            res.status(500).send('Error with product recuperation');
        } else {
            res.json(results);
        }
    });
});


apiRouter.get('/boxers', (req, res) => {
    connection.query('SELECT * FROM product INNER JOIN sizes ON product.id=sizes.product_id WHERE product.type="Boxers"', (err, results) => {
        if (err) {
            res.status(500).send('Error with product recuperation');
        } else {
            res.json(results);
        }
    });
});



apiRouter.get('/woman', (req, res) => {
    connection.query('SELECT * FROM product INNER JOIN sizes ON product.id=sizes.product_id WHERE product.type="Woman"', (err, results) => {
        if (err) {
            res.status(500).send('Error with product recuperation');
        } else {
            res.json(results);
        }
    });
});


apiRouter.post('/send-order', (req,res,next) =>{
    const formData = req.body
    connection.query('INSERT INTO orders SET ?', formData, (err, results) => {
        if (err) {
            res.status(500).send("error to create order");
        } else {
            res.json(results);
        }
    })
})

apiRouter.post('/send-quantity', (req,res) =>{
    const formData=req.body
    connection.query('INSERT INTO order_detail SET ?', formData, (err, results)=>{
        if (err) {
            res.status(500).send('Error to add quantity');
        } else {
            res.json(results);
        }
    })
})

apiRouter.put('/update-size', (req,res) =>{
    const formData = req.body;
    const formDataArray=Object.values(formData.data)
    var queries = '';
    formDataArray.forEach(function (item) {
        queries += mysql.format(`UPDATE sizes SET ? WHERE id = ${item.id}; `, item);
      });
    connection.query(queries, err =>{
        if(err){
            res.status(500).send("Error with the update of data in stock");
        }else{
            res.status(200);
        }
    });
})
// url affiche le stock dans section admin
apiRouter.get('/admin/stock-management', (req,res) => {
    connection.query('SELECT product.type, product.name, product.seasons_id, product.EAN, sizes.id, sizes.xs, sizes.s, sizes.m, sizes.l, sizes.xl, sizes.xxl  FROM product INNER JOIN sizes ON product.id=sizes.product_id', (err, results) => {
        if (err) {
            res.status(500).send('Error with product recuperation');
        } else {
            res.json(results);
        }
    });
});

apiRouter.get('/admin/resume-sell', (req,res) => {
    connection.query('SELECT sales.country, orders.id, customer.name_shop, orders.price_total, orders.date FROM orders INNER JOIN sales ON sales.id=orders.sales_id INNER JOIN customer ON customer.id=orders.customer_id', (err, results) => {
        if (err) {
            res.status(500).send('Error with product recuperation');
        } else {
            res.json(results);
        }
    });
});

apiRouter.get('/admin/bills', (req, res) => {
    connection.query('SELECT customer.*, customer.name_shop,orders.id, orders.price_total, orders.date, orders.status,orders.status_date, orders.customer_id FROM `orders` INNER JOIN customer ON customer.id=orders.customer_id', (err, results) => {
        if (err) {
            res.status(500).send('Error with bills recuperation');
        } else {
            res.json(results);
        }
    });
});
// modifie du stock dans section admin
apiRouter.put('/update-stock-size', (req,res) => {
    const formData = req.body;
    const formDataArray=Object.values(formData.data)
    var queries = '';
    

    formDataArray.forEach(function (item) {
        queries += mysql.format(`UPDATE sizes SET ? WHERE id = ${item.id}; `, item);
      });
    connection.query(queries, err =>{
        if(err){
       
            res.status(500).send("Error with the update of data in stock");
        }else{
            res.status(200);
        }
    });
})

// admin bills = status date recuperation
apiRouter.put('/paymentdate/:id', (req, res) => {
    const idOrder = req.params.id;
    const formData = req.body;
     connection.query('UPDATE orders SET ? WHERE id = ?', [formData, idOrder], err => {
      if (err) {
        res.status(500).send('Error with status date recuperation');
      } else {
        res.sendStatus(200);
      }
    } );
});

module.exports = apiRouter;
