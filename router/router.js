module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('main.html')
     });
     app.get('/switch',function(req,res){
        res.render('index2.html');
    });
    
    app.get('/arerm',function(req,res){
        res.render('arerm.html');
    });

}
