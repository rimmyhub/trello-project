const ColumnService = require('../services/columns.service');
const AuthMiddleware = require('../middleware/auth.middleware.js');

class ColumnsController {
  constructor() {
    this.columnService = new ColumnService();
    this.authMiddleware = new AuthMiddleware();
  }

  createColumn = async (req, res) => {
    const columnData = {
      ...req.body,
      userId: res.locals.user.userId,
    };

    try {
      const createdColumn = await this.columnService.createColumn(columnData);
      res.status(201).json(createdColumn);
    } catch (error) {
      console.log();
      res.status(500).json({ error: '컬럼 생성 실패' });
    }
  };

  getColumnById = async (req, res) => {
    const { columnId } = req.params;
    try {
      const column = await this.columnService.getColumnById(columnId);
      if (column) {
        res.status(200).json(column);
      } else {
        res.status(404).json({ message: '컬럼이 존재하지 않습니다.' });
      }
    } catch (error) {
      res.status(500).json({ error: '컬럼 조회 실패' });
    }
  };

  getAllColumns = async (req, res) => {
    try {
      const columns = await this.columnService.getAllColumns();
      res.status(200).json(columns);
    } catch (error) {
      console.error('Error retrieving columns:', error);
      res.status(500).json({ error: '컬럼 조회 실패' });
    }
  };

  updateColumn = async (req, res) => {
    const { columnId } = req.params;
    const updatedData = req.body;
    const userId = res.locals.user.userId;

    try {
      const updatedColumn = await this.columnService.updateColumn(columnId, updatedData, userId);
      if (updatedColumn) {
        res.status(200).json(updatedColumn);
      } else {
        res.status(404).json({ message: '컬럼이 존재하지 않습니다.' });
      }
    } catch (error) {
      res.status(500).json({ error: '컬럼 수정 실패' });
    }
  };

  deleteColumn = async (req, res) => {
    const { columnId } = req.params;
    const userId = res.locals.user.userId;

    try {
      const deletedColumn = await this.columnService.deleteColumn(columnId, userId);
      if (deletedColumn) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: '컬럼이 존재하지 않습니다.' });
      }
    } catch (error) {
      console.error('Error deleting column:', error);
      res.status(500).json({ error: '컬럼 삭제 실패' });
    }
  };
}

module.exports = ColumnsController;
