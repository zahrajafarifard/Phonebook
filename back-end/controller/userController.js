const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const User = require("../model/user");
const Company = require("../model/company");
const Post = require("../model/post");
const Rule = require("../model/rule");
const Member = require("../model/member");

exports.getAll = async (req, res, next) => {
  let _users;
  try {
    _users = await User.findAll({});
  } catch (error) {}
  res.status(200).json({ data: _users });
};

exports.search = async (req, res, next) => {
  const { search } = req.body;
  let _companies, _posts;
  _companies = await Company.findAll({
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });

  let cmp = [];
  try {
    _companies.forEach((element) => {
      cmp.push(element.dataValues.id);
    });
  } catch (error) {
    console.log(error);
  }

  _posts = await Post.findAll({
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });

  let pst = [];
  try {
    _posts.forEach((element) => {
      pst.push(element.dataValues.id);
    });
  } catch (error) {
    console.log(error);
  }

  // let _rulesFinded;
  // try {
  //   _rulesFinded = await Rule.findAll({
  //     where: { UserId: req.userId },
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  // let positions = [];
  // try {
  //   _rulesFinded.forEach((element) => {
  //     positions.push(element.dataValues.PostId);
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  let _members;
  try {
    _members = await Member.findAll({
      where: {
        // PostId: {
        //   [Op.in]: positions,
        // },
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { mobile: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
          {
            CompanyId: _companies ? { [Op.in]: cmp } : "",
          },
          { PostId: _posts ? { [Op.in]: pst } : "" },
        ],
      },
      include: [{ model: Company }, { model: Post }],
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: _members });
};

exports.order = async (req, res, next) => {
  const { order, orderField } = req.body;

  let _members;
  try {
    if (orderField === "Company") {
      _members = await Member.findAll({
        include: [{ model: Company }, { model: Post }],
        order: [["Company", "name", order]],
      });

      return res.status(200).json({ data: _members });
    }
    if (orderField === "Post") {
      _members = await Member.findAll({
        include: [{ model: Company }, { model: Post }],
        order: [["Post", "name", order]],
      });

      return res.status(200).json({ data: _members });
    }

    _members = await Member.findAll({
      include: [{ model: Company }, { model: Post }],
      order: [[orderField, order]],
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: _members });
};

exports.newUser = async (req, res, next) => {
  const { name, mobile, ruleList, password, isAdmin, addContact } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
  }

  let createdRule, createdUser;
  try {
    createdUser = await User.create({
      name,
      mobile,
      password: hashedPassword,
      isAdmin,
      addContact,
    });
  } catch (error) {
    if (error.errors[0].message == "mobile must be unique") {
      return res.status(422).json({
        data: "شماره موبایل وارد شده تکراری می باشد",
      });
    }
  }

  try {
    if (!isAdmin) {
      for (const i of ruleList) {
        createdRule = await Rule.create({
          PostId: i,
          UserId: createdUser.id,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: "created new User ...." });
};

exports.logIn = async (req, res) => {
  const { mobile, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ where: { mobile: mobile } });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(403).json({ data: "Invalid credentials..." });
  }

  let unhashedPassword;
  try {
    unhashedPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
  }
  if (!unhashedPassword) {
    return res.status(403).json({ data: "Iinvalid password" });
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, mobile: existingUser.mobile },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "10h" }
    );
  } catch (err) {
    console.log(err);
  }

  res.status(201).json({
    userId: existingUser.id,
    mobile: existingUser.mobile,
    token: token,
    isAdmin: existingUser.isAdmin,
    addContact: existingUser.addContact,
  });
};

exports.delete = async (req, res, next) => {
  const { id } = req.body;

  try {
    await User.destroy({
      where: {
        [Op.and]: [{ id: id }, { name: { [Op.ne]: ["admin"] } }],
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: "row deleted..." });
};

exports.update = async (req, res, next) => {
  const { name, mobile, password, ruleList, isAdmin, addContact } = req.body;
  const { id } = req.params;
  if (password) {
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      console.log(err);
    }
  }
  let updatedRow;
  try {
    updatedRow = await User.findOne({ where: { id: id } });
  } catch (error) {
    console.log(error);
  }
  // let pass = (await password) ? hashedPassword : updatedRow.password
  try {
    updatedRow.name = name || updatedRow.name;
    updatedRow.mobile = mobile || updatedRow.mobile;
    updatedRow.password = password ? hashedPassword : updatedRow.password;
    updatedRow.isAdmin = isAdmin;
    updatedRow.addContact = addContact;
    await updatedRow.save();
  } catch (error) {
    if (error.errors[0].message == "mobile must be unique") {
      return res.status(422).json({
        data: "شماره موبایل وارد شده تکراری می باشد",
      });
    }
  }

  try {
    await Rule.destroy({ where: { UserId: updatedRow.id } });

    for (const i of ruleList) {
      await Rule.create({
        PostId: i,
        UserId: updatedRow.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: "updated new user ...." });
};

exports.fetchForUpdate = async (req, res, next) => {
  const { id } = req.params;

  let fetchedRow;
  try {
    fetchedRow = await User.findOne({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }

  // fetchedRow.password.unhashed

  res.status(200).json({ data: fetchedRow });
};
exports.fetchForUpdateRule = async (req, res, next) => {
  const { id } = req.params;

  let fetchedRules;
  try {
    fetchedRules = await Rule.findAll({
      where: { UserId: id },
    });
  } catch (error) {
    console.log(error);
  }

  // fetchedRow.password.unhashed

  res.status(200).json({ data: fetchedRules });
};

exports.searchUserName = async (req, res, next) => {
  const { search } = req.body;

  let _members;
  try {
    _members = await User.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
    });
  } catch (error) {
    console.log(error);
  }

  // console.log(_members);
  res.status(200).json({ data: _members });
};

exports.searchUserMobile = async (req, res, next) => {
  const { search } = req.body;

  let _members;
  try {
    _members = await User.findAll({
      where: {
        mobile: { [Op.like]: `%${search}%` },
      },
    });
  } catch (error) {
    console.log(error);
  }

  // console.log(_members);
  res.status(200).json({ data: _members });
};
