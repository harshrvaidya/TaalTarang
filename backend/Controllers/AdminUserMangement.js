const User=require('../models/User');

const getUsers=async(req,res)=>{
    User.find({}).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(500).json(err);
    })
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
module.exports = { getUsers,deleteUser };