
//metodo para proteger rutas y ala vez esta siendo exportada 
module.exports.isAuthenticated = (req,res,next)=>{
    //si existe un incio de sesion 
    if(req.isAuthenticated()){
        //continuar 
        return next()
    }
    //redireccionar
    res.redirect('/user/login')
}