import { RequestHandler } from "express";
import Video from "./Video";



export const getVideos:RequestHandler =async (req, res) =>{
    try {
        let allVideos =await Video.find()
    res.json(allVideos)
    } catch (error) {
        res.json(error)
    }
}

export const getVideo:RequestHandler =async (req, res) =>{
    let videoFound = await Video.findById(req.params.id)
    if(!videoFound) return res.json("Video NOT found")
    return res.json(videoFound)
}

export const createVideo:RequestHandler =async(req,res) =>{
  const videoFound = await Video.findOne({url:req.body.url})
  if(videoFound) return res.status(301).json({message:"That url is already listed"})
  let newVideo = new Video(req.body);
  await newVideo.save()
  res.send(`Se ha agregado el video ${newVideo.title} `)
}

export const deleteVideo:RequestHandler =async  (req,res) =>{
    const videoFound = await Video.findByIdAndDelete(req.params.id)
    if(!videoFound) return res.json({videoFound})
    console.log("permiso back" + req.params.id)
    res.send("You deleted " + videoFound.title)
}

export const updateVideo:RequestHandler =async (req,res) =>{
    
    let updatedVideo =await Video.findByIdAndUpdate(req.params.id, req.body,{new:true})
    if(!updatedVideo) return res.status(204).json("Video NOT found")
    res.json(updatedVideo)
}