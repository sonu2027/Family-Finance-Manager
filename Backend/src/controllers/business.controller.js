import { Business } from "../models/business.model.js";

// Create a Business
export const createBusiness = async (req, res) => {
  try {
    const { name, type, revenue, expenses } = req.body;

    const newBusiness = new Business({
      userId: req.user.id,
      name,
      type,
      revenue,
      expenses,
      profit: revenue - expenses, // Ensure profit is calculated correctly
    });

    await newBusiness.save();

    res.status(201).json({
      message: "Business created successfully",
      business: newBusiness,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating business", error });
  }
};

// Get All Businesses for a User
export const getUserBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ userId: req.user.id });

    res.status(200).json({
      message: "Businesses fetched successfully",
      businesses,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching businesses", error });
  }
};

// Get a Single Business by ID
export const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.status(200).json({ business });
  } catch (error) {
    res.status(500).json({ message: "Error fetching business", error });
  }
};

// Update Business Details
export const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Update fields dynamically
    Object.assign(business, req.body);

    // Ensure profit is recalculated when revenue or expenses are updated
    if (req.body.revenue !== undefined || req.body.expenses !== undefined) {
      business.profit = business.revenue - business.expenses;
    }

    await business.save();

    res.status(200).json({ message: "Business updated successfully", business });
  } catch (error) {
    res.status(500).json({ message: "Error updating business", error });
  }
};

// Delete a Business
export const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    await Business.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting business", error });
  }
};
