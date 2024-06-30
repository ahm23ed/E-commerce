

export const find=async({model,conditions={},select="",skip=0,limit=10,populate=[]}={})=>{
const result=await model.find(conditions).limit(limit).skip(skip).select(select).populate(populate)
return result
}


export const findone=async({model,conditions={},select="",populate=[]}={})=>{
    const result=await model.findOne(conditions).select(select).populate(populate)
    return result
    }

export const findbyId=async({model,conditions={},select="",populate=[]}={})=>{
    const result=await model.findById(conditions).select(select).populate(populate)
    return result
    }
export const createandsave=async({model,options={}}={})=>{
    const newobj= new model(options)
    const result=await newobj.save()
    return result
    }

    export const updateone=async({model,conditions={},options={}}={})=>{
        const result=await model.updateOne(conditions,options)
        return result
        }

export const findoneAndUpdate=async({model,conditions={},options={},select="",populate=[]}={})=>{
    const result=await model.findOneAndUpdate(conditions,options).select(select).populate(populate)
    return result
    }

    export const deleteone=async({model,conditions={}}={})=>{
        const result=await model.deleteOne(conditions)
        return result
        }