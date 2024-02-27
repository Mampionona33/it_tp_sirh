import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
})

const User = mongoose.model('users', UserSchema, 'users')
export default User
