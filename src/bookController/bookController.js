const authorModel = require('../authorModel/authorModel')
const PublisherModel = require ('../publishermodel/publishermodel')
const bookModel= require('../bookModel/bookModel')

const createNewAuthor=async function(req,res){
    let newAuthorData =req.body;
    let saveData=await authorModel.create(newAuthorData);
    res.send(saveData);
 }

 const createNewPublisher = async function (req, res) {
    let newPublisherData = req.body
    let savePublisherData=await PublisherModel.create(newPublisherData)
    res.send(savePublisherData)
}

const createBook = async function (req, res) {

    let data = req.body
    let { author, publisher } = data
    if (!author) return res.send("please provide authorId")
    if (!publisher) return res.send("please provide publisherId")

    let checkAuthor = await authorModel.findById(data.author)
    if (!checkAuthor) return res.send("no data authors found")

    let checkPublisher = await PublisherModel.findById(data.publisher)
    if (!checkPublisher) return res.send("no data publishers found")

    let saveData = await bookModel.create(data)
    res.send({ msg: saveData, status: true })

}

const getFullDetail = async function (req, res) {
    let fullData = await bookModel.find().populate("author").populate ("publisher")
    res.send(fullData);

}
const updateBooks = async function(req,res){
    

        //Without populate
        let findIdByPublisher = await PublisherModel.find({ name: { $in: ["Penguin", "HarperCollins"] } }).select({ _id: 1 })
        let findIdByRating = await authorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
    
        //Using loop
        const arrOfPublisherId = []
        for (let i = 0; i < findIdByPublisher.length; i++) {
            arrOfPublisherId.push(findIdByPublisher[i]._id)

        }
    const arrfindIdByRating =[]
    for(let i =0; i<findIdByRating.length;i++)
    arrfindIdByRating.push(findIdByRating[i]._id)
    
        let setHardCover = await bookModel.updateMany({ publisher: { $in: arrOfPublisherId } }, { isHardCover: true }, { new: true })
        let updatePrice = await bookModel.updateMany({ rating: { $in: findIdByRating } }, { $inc: { price:75 } }, { new: true })
    
    
    
       res.send({ status: true, setHardCover: setHardCover, updatePice: updatePrice })
       
    }

    
    





module.exports.author = createNewAuthor
module.exports.Publisher = createNewPublisher
module.exports.NewBook = createBook
module.exports.myUpdate = getFullDetail
module.exports.myGetBooks = updateBooks


