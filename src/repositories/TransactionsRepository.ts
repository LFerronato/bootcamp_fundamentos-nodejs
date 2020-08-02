import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    this.transactions.forEach(t => {
      if (t.type === 'income') {
        income += t.value;
      } else if (t.type === 'outcome') {
        outcome += t.value;
      }
    });

    return { income, outcome, total: income - outcome };
  }

  public create({ id, title, value, type }: CreateDTO): Transaction {
    const newTransaction = { id, title, value, type };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
