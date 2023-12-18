const Portfolio = require('../models/Portfolio')



/*
const renderAllPortafolios = (req,res)=>{
    res.send('Listar todos los portafolios')
}
*/
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

//metodo para guardar en la base de datos lo del form
const createNewPortafolio =async (req,res)=>{
    //desestructurar los datos de req.body
    const {title, category,description} = req.body
    //crear una nueva instancia 
    const newPortfolio = new Portfolio({title,category,description})
   //guardar en la base de edatos 
    await newPortfolio.save()
    //mostrar el resultado
    res.redirect("/portafolios")
}

//Metodo para listar los portafolios
const renderAllPortafolios = async(req,res)=>{
    //listar todos los portafolios y tarnsformatr en objetos lean
    const portfolios = await Portfolio.find().lean()
    //Mandar a la lista de portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}


/*const createNewPortafolio =(req,res)=>{
    console.log(req.body);
    res.send("Portafolio almacenado en la BDD")
}
*/
/*const createNewPortafolio = (req,res)=>{
    res.send('Crear un nuevo portafolio')
}*
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}*/
/*const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
}
*/

const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}



const renderEditPortafolioForm =async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

/*
//capturar los datos del formulario y guardar en base de datos 
const updatePortafolio = async(req,res)=>{
    //capturar los datos del body
    const {title,category,description}= req.body
    //actualizar el pritafolio en base de datos 
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    //redericcionar 
    res.redirect('/portafolios')
}*/
const updatePortafolio = async(req,res)=>{
    const {title,category,description}= req.body
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}
