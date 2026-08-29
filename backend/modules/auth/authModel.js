//A Model = blueprint of your collection
import mongoose from 'mongoose'

const authSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
 role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
  phone: String,
  profileImage: String,
  notification: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    enum: ["Light Mode", "Dark Mode", "System Default"],
    default: "Light Mode",
  },
}, {
  timestamps: true,
})

const authModal = mongoose.model('Auth', authSchema);
export default authModal