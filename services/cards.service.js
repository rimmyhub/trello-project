const CardRepository = require('../repositories/cards.repository');

class CardService {
  cardRepository = new CardRepository();

  findCard = async ({ columnId, cardId }) => {
    const find = await this.cardRepository.findOne({ columnId, cardId });

    if (!find) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    return find;
  };

  createCard = async ({ userId, columnId, name, color, description, startDate, dueDate }) => {
    // if (!['red', 'blue', 'yellow', 'green'].includes(type)) {
    //   throw res.status(400).json({ message: '알맞은 타입을 지정해주세요' });
    // }
    await this.cardRepository.createOne({
      userId,
      columnId,
      name,
      color,
      description,
      startDate,
      dueDate,
    });
    return { code: 200, message: '카드 작성이 완료되었습니다.' };
  };

  updateCard = async ({
    columnId,
    userId,
    cardId,
    name,
    color,
    description,
    startDate,
    dueDate,
  }) => {
    const findCard = await this.cardRepository.findOne({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.UserId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.updateOne(
      { columnId, name, color, description, startDate, dueDate },
      [{ cardId }, { userId }],
    );
    return { code: 200, message: '카드를 수정했습니다.' };
  };

  deleteCard = async ({ cardId, userId }) => {
    const findCard = await this.cardRepository.findOne({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.UserId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.deleteOne({ cardId });
    return { code: 200, message: '카드를 삭제했습니다.' };
  };

  updateColumn = async ({ cardId, userId, columnId }) => {
    const findCard = await this.cardRepository.findOne({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.UserId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.updateColumn({ columnId }, [{ cardId }, { userId }]);
    return { code: 200, message: '카드의 칼럼을 수정했습니다.' };
  };
}

module.exports = CardService;
