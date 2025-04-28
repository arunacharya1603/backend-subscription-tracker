import { workflowClient } from "../config/upstash.js";
import Subscription from "../model/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: { subscription, workflowRunId },
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not authorized to access this resource");
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            message: "Subscriptions fetched successfully",
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
}

// get all subscriptions
export const getAllSubscriptions = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const skip = (page - 1) * limit;
        const query = {};
        if (status) query.status = status;

        const subscriptions = await Subscription.find(query)
            .skip(skip)
            .limit(limit);

        const total = await Subscription.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            message: "All subscriptions fetched successfully",
            data: {
                subscriptions,
                total,
                totalPages,
            },
        });
    } catch (error) {
        next(error);
    }
}

// get subscription by id
export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to access this resource");
            error.statusCode = 403;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
}

// renewal subscription reminder