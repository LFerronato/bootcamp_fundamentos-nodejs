import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

interface CreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type }: CreateDTO = request.body;
  try {
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const newTransac = createTransaction.execute({ title, value, type });

    return response.status(201).json(newTransac);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
