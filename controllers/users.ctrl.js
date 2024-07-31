const { ApiResponse } = require("../configuration/utils/ApiResponse.conf.js");

const { flag, statusCode, status } = require("../configuration/utils/Constant.conf.js");

const User = require("../models/users.model.js");

const fun_SelectById = async (req, res) => {
  try {
    const userId = req.body.userId || 0;
    let result = await User.find({ _id: userId });

    if (result.length == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.success, result));
    }
  } catch (err) {
    return res.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  }
};

const fun_SelectAll = async (req, res) => {
  try {
    let pageIndex = req.body.pageIndex || "";
    let pageSize = req.body.pageSize || "";

    // Find the records with pagination
    const departments = await User.find()
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);

    // Count the total number of records
    const totalRecords = await User.countDocuments();

    if (departments.length == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(
        new ApiResponse(flag.success, status.success, statusCode.success, {
          records: departments,
          totalRecords: totalRecords,
        })
      );
    }
  } catch (err) {
    return res.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  }
};

const fun_DeleteById = async (req, res) => {
  try {
    const userId = req.body.userId || 0;
    const result = await User.findByIdAndDelete({ _id: userId });

    if (!result) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.delete, result));
    }
  } catch (err) {
    return res.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  }
};

const fun_Insert = async (req, res) => {
  try {
    const { firstName, lastName, mobile, emailId, passwordHash, isActive, createdBy } = req.body;

    const result = await User.create({
      firstName,
      lastName,
      mobile,
      emailId,
      passwordHash,
      isActive,
      createdBy,
    });

    return res.json(new ApiResponse(flag.success, status.success, statusCode.insert, result));
  } catch (err) {
    return res.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  }
};

const fun_Update = async (req, res) => {
  try {
    const { userId, firstName, lastName, mobile, emailId, passwordHash, isActive, createdBy } = req.body;

    const result = await User.findByIdAndUpdate(
      userId,
      {
        userId,
        firstName,
        lastName,
        mobile,
        emailId,
        passwordHash,
        isActive,
        createdBy,
      },
      { new: true }
    );

    if (!result) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.insert, result));
    }
  } catch (err) {
    return res.json(new ApiResponse(flag.fail, status.systemError, err, { originalUrl: req.originalUrl }));
  }
};

module.exports = { fun_SelectById, fun_SelectAll, fun_DeleteById, fun_Insert, fun_Update };
