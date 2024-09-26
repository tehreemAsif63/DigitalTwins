import { Request, Response } from "express";
import { decodedData } from "../services/simulateDataService";

// Controller for sending all categories of patient based on the patient id
export const sendPatientData = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Assuming only '1' is valid for now
  if (id !== "1") {
    return res.status(404).json({
      success: false,
      message: `Patient with ID ${id} not found`,
    });
  }

  try {
    // Fetch patient data (simulated)
    const patientData = await decodedData();

    return res.status(200).json({
      success: true,
      data: patientData,
    });
  } catch (error: any) {
    // Handle and log errors
    console.error(`Error fetching patient data: ${error.message || error}`);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while retrieving patient data",
    });
  }
};
