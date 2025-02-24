import {Asset} from "../models/asset.model.js"

// Create an Asset
export const createAsset = async (req, res) => {
  try {
    const { name, type, value, purchaseDate } = req.body;

    const newAsset = new Asset({
      userId: req.user.id, // Using userId as per your schema
      name,
      type,
      value,
      purchaseDate,
    });

    await newAsset.save();

    res.status(201).json({
      message: "Asset added successfully",
      asset: newAsset,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding asset", error });
  }
};

// Get All Assets for a User
export const getUserAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user.id });

    res.status(200).json({
      message: "Assets fetched successfully",
      assets,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching assets", error });
  }
};

// Get a Single Asset by ID
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ asset });
  } catch (error) {
    res.status(500).json({ message: "Error fetching asset", error });
  }
};

// Update an Asset
export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    Object.assign(asset, req.body);
    await asset.save();

    res.status(200).json({ message: "Asset updated successfully", asset });
  } catch (error) {
    res.status(500).json({ message: "Error updating asset", error });
  }
};

// Delete an Asset
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    await Asset.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting asset", error });
  }
};
