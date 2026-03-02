const User=require('../models/User');

const getUsers=async(req,res)=>{
    User.find({}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
}
const getParticularUser=async(req,res)=>{
  const id=req.params.id;
  User.findById(id)
  .then(user => res.json(user))
   .catch(err => res.status(400).json('Error: ' + err));
}
const UpdateUser = async (req, res) => {
  const { name, phone_no, profilepic } = req.body;
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name || user.name;
      user.phone_no = phone_no || user.phone_no;
      user.profilepic = profilepic || user.profilepic;
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
}
const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
module.exports = { getUsers,deleteUser,UpdateUser ,getParticularUser};