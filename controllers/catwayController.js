const Catway = require('../models/catwayModel');

// GET /catways
exports.getAll = async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
};

// GET /catways/:id
exports.getOne = async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  res.json(catway);
};

// POST /catways
exports.create = async (req, res) => {
  console.log('REQ.BODY =', req.body);

  const catway = await Catway.create(req.body);
  res.status(201).json(catway);
};

// PUT /catways/:id
exports.update = async (req, res) => {
  const catway = await Catway.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(catway);
};

// DELETE /catways/:id
exports.remove = async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);
  res.json({ message: 'Catway supprimé' });
};
