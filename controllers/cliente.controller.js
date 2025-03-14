const { Cliente } = require('../models');

exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

exports.crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

exports.obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      res.status(404).json({ message: 'Cliente no encontrado' });
    } else {
      res.json(cliente);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar cliente' });
  }
};

exports.actualizarCliente = async (req, res) => {
  try {
    const updateRowsCount = await Cliente.update(
      req.body,
      { where: {id: req.params.id} }
    );

    if (updateRowsCount === 0) {
      res.status(404).json({ message: 'Cliente no encotrado' });
    } else {
      const cliente = await Cliente.findByPk(req.params.id);
      res.json(cliente);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

exports.eliminarCliente = async (req, res) => {
  try {
    const deletedRowsCount = await Cliente.destroy({ where: { id: req.params.id } });

    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Cliente no encotrado' });
    } else {
      res.json({ message: 'Cliente eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};
