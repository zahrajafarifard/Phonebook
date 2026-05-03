const Company = require("../model/company");
const { Op } = require("sequelize");

exports.getAll = async (req, res, next) => {
  let _companies;
  try {
    _companies = await Company.findAll({
      order: [["name", "ASC"]],
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: _companies });
};

exports.newCompany = async (req, res, next) => {
  const { name } = req.body;

  try {
    await Company.create({
      name,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: "created new company ...." });
};

exports.update = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  let updatedRow;
  try {
    updatedRow = await Company.update(
      {
        name: name,
      },
      {
        where: { id: id },
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: "created new company ...." });
};
exports.fetchForUpdate = async (req, res, next) => {
  const { id } = req.params;

  let fetchedRow;
  try {
    fetchedRow = await Company.findOne({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ data: fetchedRow });
};
exports.delete = async (req, res, next) => {
  const { id } = req.body;

  try {
    await Company.destroy({ where: { id: id } });
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeForeignKeyConstraintError") {
      return res.status(422).json({
        data: "قادر به حذف شرکت نیستید",
      });
    }
  }

  res.status(200).json({ data: "row deleted..." });
};

exports.search = async (req, res, next) => {
  const { search } = req.body;
  let _companies;
  _companies = await Company.findAll({
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });


  res.status(200).json({ data: _companies });
};
