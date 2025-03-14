const { Pedido } = require('../models');

exports.obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

exports.crearPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido' });
  }
};

exports.obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);

    if (!pedido) {
      res.status(404).json({ message: 'Pedido no encontrado' });
    } else {
      res.json(pedido);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar pedido' });
  }
};

exports.actualizarPedido = async (req, res) => {
  try {
    const updateRowsCount = await Pedido.update(
      req.body,
      { where: {id: req.params.id} }
    );

    if (updateRowsCount === 0) {
      res.status(404).json({ message: 'Pedido no encotrado' });
    } else {
      const pedido = await Pedido.findByPk(req.params.id);
      res.json(pedido);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    const deletedRowsCount = await Pedido.destroy({ where: { id: req.params.id } });

    if (deletedRowsCount === 0) {
      res.status(404).json({ message: 'Pedido no encotrado' });
    } else {
      res.json({ message: 'Pedido eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar pedido' });
  }
};
