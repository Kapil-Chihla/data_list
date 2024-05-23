import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require:true
    },
    phoneNumber: {
        type: String,
        required: [true, 'User phone number required'],
        validate: {
            validator: function (v) {
                return /\+?[1-9]\d{1,14}$/.test(v); // E.164 phone number format validation
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
      type: String,
      require: true,
      validate: {
         validator: function(v) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
         },
         message: props => `${props.value} is not a valid email address!`
      }
    },
    dob: {
        type: String,
        require: true
    }
})

const DataModel = mongoose.model('Data' , DataSchema);

export default DataModel;