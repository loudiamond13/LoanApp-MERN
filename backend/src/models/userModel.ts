//import mongoose,{Document} from 'mongoose';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//user type
export type  UserType = {
  _id:        string;
  email:      string;
  password:   string;
  lastName:   string;
  firstName:  string;
  role: string;
  emailVerified: boolean;
  isLocked: boolean;
};

//user schema
const userSchema = new mongoose.Schema<UserType>({
  email:{type: String, required: true, unique: true},
  password: {type: String, required: true },
  lastName: {type: String, required: true},
  firstName: {type: String, required: true},
  role: {type: String, enum: ['admin','employee', 'customer'], default: 'admin'}, //by default a user is just a regular user
  emailVerified: {type: Boolean, default: false},
  isLocked: {type: Boolean, default: false},
});






//encrypt the user password if changed/new password
userSchema.pre('save', async function(next) 
{
  if(this.isModified('password')){
  this.password = await bcrypt.hash(this.password, 8)
  }
  next();
});

//user model
const  User = mongoose.model<UserType>("User", userSchema);


export default User;