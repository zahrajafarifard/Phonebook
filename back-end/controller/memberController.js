const Member = require("../model/member");
const Company = require("../model/company");
const Post = require("../model/post");
const Rule = require("../model/rule");
const { Op } = require("sequelize");

// exports.getContacts = async (req, res, next) => {
//   let _members, _rulesFinded;
//   try {
//     _rulesFinded = await Rule.findAll({
//       where: { UserId: req.userId },
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   let positions = [];
//   try {
//     _rulesFinded.forEach((element) => {
//       positions.push(element.dataValues.PostId);
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   try {
//     _members = await Member.findAll({
//       where: {
//         PostId: {
//           [Op.in]: positions,
//         },
//       },
//       order: [["CompanyId", "ASC"]],
//       include: [{ model: Company }, { model: Post }],
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   res.status(200).json({ data: _members });
// };

exports.getAll = async (req, res, next) => {
  let _members;
  try {
    _members = await Member.findAll({
      order: [["name", "ASC"]],
      // order: [["PostId", "ASC"]],

      include: [{ model: Company }, { model: Post }],
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.status(200).json({ data: _members });
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
    return next(error);
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
    return next(error);
  }

  let _members;
  try {
    _members = await Member.findAll({
      where: {
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
    return next(error);
  }

  res.status(200).json({ data: _members });
};

exports.newMember = async (req, res, next) => {
  const { name, mobile, companyName, post, address } = req.body;
  try {
    await Member.create({
      name,
      mobile,
      CompanyId: companyName,
      PostId: post,
      address,
    });
  } catch (error) {
    try {
      if (error.errors[0].message == "mobile must be unique") {
        return res.status(422).json({
          data: "شماره موبایل وارد شده تکراری می باشد",
        });
      }
      
    } catch (error) {
      return next(error);
    }
    return next(error);
  }

  
  res.status(200).json({ data: "created new contact ...." });
};

exports.delete = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Member.destroy({ where: { id: id } });
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.status(200).json({ data: "row deleted..." });
};

exports.fetchForUpdate = async (req, res, next) => {
  const { id } = req.params;

  let fetchedRow;
  try {
    fetchedRow = await Member.findOne({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.status(200).json({ data: fetchedRow });
};

exports.update = async (req, res, next) => {
  const { companyName, name, post, mobile, address } = req.body;
  const { id } = req.params;

  try {
    updatedRow = await Member.update(
      {
        name: name,
        mobile: mobile,
        CompanyId: companyName,
        PostId: post,
        address,
      },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    try {
      if (error.errors[0].message == "mobile must be unique") {
        return res.status(422).json({
          data: "شماره موبایل وارد شده تکراری می باشد",
        });
      }
      
    } catch (error) {
      return next(error);
    }
    return next(error);
  }

  res.status(200).json({ data: "created new company ...." });
};
