const Post = require("../model/post");
const { Op } = require("sequelize");

exports.getAll = async (req, res, next) => {
  let _post;
  try {
    _post = await Post.findAll({
      order: [["name", "ASC"]],

    });
  } catch (error) {}

  res.status(200).json({ data: _post });
};

exports.newPost = async (req, res, next) => {
  const { name } = req.body;

  try {
    await Post.create({
      name,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ data: "created new Post ...." });
};

exports.update = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  let updatedRow;
  try {
    updatedRow = await Post.update(
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

  res.status(200).json({ data: "updated new post ...." });
};

exports.fetchForUpdate = async (req, res, next) => {
  const { id } = req.params;

  let fetchedRow;
  try {
    fetchedRow = await Post.findOne({
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
    await Post.destroy({ where: { id: id } });
  } catch (error) {
    if (error.name == 'SequelizeForeignKeyConstraintError') {
      return res.status(422).json({
        data: 'قادر به حذف سمت شغلی نیستید'
      })
    }
  }

  res.status(200).json({ data: "row deleted..." });
};


exports.search = async (req, res, next) => {
  const { search } = req.body;
  let _companies;
  _companies = await Post.findAll({
    where: {
      name: { [Op.like]: `%${search}%` },
    },
  });

  // console.log("ccccccccc", _companies);
  res.status(200).json({ data: _companies });
};
