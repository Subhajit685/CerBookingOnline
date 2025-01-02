import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rideSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    startLocation: {
      type: String,
      required: true,
    },
    endLocation: {
      type: String,
      required: true,
    },
    startLatLng: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    endLatLng: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    distance: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "in_progress", "completed", "cancelled"],
      default: "requested",
    },
    vehicle: {
      type: String,
      enum: ["car", "auto", "motorcycle"],
    },
    opt: {
      type: String,
      required: true,
      select: false,
    },
    paymentID: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model("Ride", rideSchema);

export default Ride;
