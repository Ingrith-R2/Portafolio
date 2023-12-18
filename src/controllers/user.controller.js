const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

//importar el modelo
const passport = require("passport")

/*
const registerNewUser =(req,res)=>{
    res.send('register new user')
}*/
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}
/*
const loginUser =(req,res)=>{
    res.send('login user')
}*/
/*
const logoutUser =(req,res)=>{
    res.send('logout user')
}*/

const User = require('../models/User')


const registerNewUser = async(req,res)=>{
    


    const{name,email,password,confirmpassword} = req.body
    
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")

    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    const newUser = await new User({name,email,password,confirmpassword})
    newUser.password = await newUser.encrypPassword(password)
    newUser.save()
    res.redirect('/user/login')
}


const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

// Primera forma 
// const loginUser = async(req,res)=>{

//     const{name,email,password} = req.body
    
//     if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

//     const userBDD = await User.findOne({email})
//     if(!userBDD) return res.send("Lo sentimos, el email no se encuentra registrado")
    
//     const passwordUser = await userBDD.matchPassword(password)
//     if(!passwordUser) return res.send("Lo sentimos, los passwords no coinciden")

//     res.redirect('/portafolios') 
// }

// Segunda forma utilizando el módulo passport
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}

