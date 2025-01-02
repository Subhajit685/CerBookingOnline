import Ride from "../models/ride.js";
import { findCaptainsWithinRadius } from "./map.controller.js";
import { io } from "../socket.js";
import Captain from "../models/captain.js";
import User from "../models/user.js";

export const createRide = async (req, res) => {
  const { pic, dis, fare, vehicle, distance, picLocation, distLocation } =
    req.body;
  try {
    if (!pic || !dis || !fare || !vehicle) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid detailes" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newRide = await Ride.create({
      user: req.user._id,
      startLocation: pic,
      endLocation: dis,
      fare: fare,
      vehicle: vehicle,
      opt: otp,
      distance: distance,
      startLatLng: picLocation,
      endLatLng: distLocation,
    });

    const captains = await findCaptainsWithinRadius(
      picLocation.lat,
      picLocation.lng,
      10
    );

    const user = await User.findById(req.user._id);

    captains.map((captain) => {
      if (captain?.socketId) {
        if (captain?.status === "inactive") {
          io.to(captain?.socketId).emit("newRide", { newRide, user });
        }
      }
    });

    return res.status(200).json({ success: true, newRide });
  } catch (error) {
    console.log(error);
  }
};

export const accept = async (req, res) => {
  const { id } = req.body;
  try {
    const captain = await Captain.findByIdAndUpdate(
      { _id: req.user?._id },
      {
        $set: {
          status: "active",
        },
      }
    );

    if (!captain) {
      return res
        .status(400)
        .json({ success: false, message: "Captain not found" });
    }

    const ride = await Ride.updateMany(
      { _id: id },
      {
        $set: {
          caption: captain._id,
          status: "accepted",
        },
      }
    );

    if (!ride) {
      return res
        .status(400)
        .json({ success: false, message: "Ride not found" });
    }

    const acceptRide = await Ride.findById(id);
    const user = await User.findById(acceptRide?.user);

    if (user?.socketId) {
      io.to(user?.socketId).emit("accept", captain);
    }

    const captains = await findCaptainsWithinRadius(
      acceptRide?.startLatLng?.lat,
      acceptRide?.startLatLng?.lng,
      10
    );

    captains.map((cap) => {
      if (cap?._id !== captain?._id) {
        io.to(cap?.socketId).emit("RideAcceptAnotherCaptain", acceptRide );
      }
    });

    return res.status(200).json({ success: true, ride });
  } catch (error) {
    console.log(error);
  }
};

export const submitOtp = async (req, res) => {
  const { otp, rideID } = req.body;
  try {
    const ride = await Ride.findById(rideID).select("+opt");

    if (!ride) {
      return res
        .status(400)
        .json({ success: false, message: "Ride not match" });
    }

    const rideOtp = ride?.opt;

    const match = rideOtp === otp;

    if (!match) {
      return res.status(400).json({ success: false, message: "Otp not match" });
    }

    const Newride = await Ride.findByIdAndUpdate(
      { _id: rideID },
      {
        $set: {
          status: "in_progress",
        },
      }
    );

    const user = await User.findById(ride?.user);

    if (user?.socketId) {
      io.to(user?.socketId).emit("start", ride);
    }

    return res.status(200).json({ success: true, ride });
  } catch (error) {
    console.log(error);
  }
};

export const complete = async (req, res) => {
  const { rideId } = req.body;
  try {
    const caption = await Captain.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          status: "inactive",
        },
      }
    );

    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "You have not permission to complete ride",
      });
    }

    const ride = await Ride.findByIdAndUpdate(rideId, { status: "completed" });
    if (!ride) {
      return res
        .status(400)
        .json({ success: false, message: "Something wrong ride not found" });
    }

    const user = await User.findById(ride?.user);

    if (user?.socketId) {
      io.to(user?.socketId).emit("complete", { complete: true });
    }

    return res.status(200).json({ success: true, message: "Make payment" });
  } catch (error) {
    console.log(error);
  }
};

export const cancel = async (req, res) => {
  const { rideID } = req.body;
  try {
    const ride = await Ride.findByIdAndUpdate(rideID, {
      status: "cancelled",
    });

    if (!ride) {
      return res
        .status(400)
        .json({ success: false, message: "Ride not found" });
    }

    const captains = await findCaptainsWithinRadius(
      ride?.startLatLng?.lat,
      ride?.startLatLng?.lng,
      10
    );

    captains.map((cap) => {
      if (cap?.socketId) {
        io.to(cap?.socketId).emit("cancel", ride);
      }
    });

    return res.status(200).json({ success: true, message: "Ride cancel" });
  } catch (error) {
    console.log(error);
  }
};
