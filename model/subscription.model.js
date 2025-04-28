import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [50, "Name must be less than 50 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    currency: {
        type: String,
        enum:['USD','EUR','GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
        default: 'monthly',
    },
    category: {
        type: String,
        enum: ['sports','news','entertainment','lifestyle','technology','finance', 'other'],
        required: [true, "Category is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active','expired','cancelled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function(v) {
                return v <= new Date();
            },
            message: "Start date must be in the past",
        },
    },
    renewalDate: {
        type: Date,
        required: false,
        validate: {
            validator: function(v) {
                return v > this.startDate;
            },
            message: "Renewal date must be after start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true,
    },
}, { timestamps: true });


// Auto set renewal date if status is expired
subscriptionSchema.pre('save', async function(next) {
    if (!this.renewalDate) {
       const renewalPeriod = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
       }

       this.renewalDate = new Date(this.startDate);
       this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate < new Date(this.startDate)) {
        this.status = 'expired';
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
