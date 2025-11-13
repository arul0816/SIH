import profileModel from "../models/profileModel.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let profile = await profileModel.findOne({ user: userId });
    if (!profile) {
      profile = await profileModel.create({ user: userId });
    }
    return res.status(200).json({ success: true, profile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const updates = req.body;
    const profile = await profileModel.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, profile });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



