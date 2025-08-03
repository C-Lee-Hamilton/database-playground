import mongoose, { Document, Schema } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
  animal?:string
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  animal:{type:String,required:false}
  
})

export const User = mongoose.model<IUser>('User', UserSchema)