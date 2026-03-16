const express = require("express")
const Game = require("../models/Game")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", auth, async(req,res)=>{

    const games = await Game.find({user:req.user})
    res.json(games)

})

router.post("/", auth, async(req,res)=>{

    const game = await Game.create({
        ...req.body,
        user:req.user
    })

    res.json(game)
})

router.put("/:id", auth, async(req,res)=>{

    const game = await Game.findById(req.params.id)

    if(game.user.toString() !== req.user)
        return res.status(403).json({message:"Forbidden"})

    const updated = await Game.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json(updated)

})

router.delete("/:id", auth, async(req,res)=>{

    const game = await Game.findById(req.params.id)

    if(game.user.toString() !== req.user)
        return res.status(403).json({message:"Forbidden"})

    await Game.findByIdAndDelete(req.params.id)

    res.json({message:"Deleted"})
})

module.exports = router