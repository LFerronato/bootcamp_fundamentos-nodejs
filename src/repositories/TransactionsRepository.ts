import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    // BANCO DE DADOS
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // const income = 0;
    // const outcome = 0;
    // this.transactions.forEach(t => {
    //   if (t.type === 'income') {
    //     income += t.value;
    //   } else if (t.type === 'outcome') {
    //     outcome += t.value;
    //   }
    // });
    // return { income, outcome, total: income - outcome };

    const balance = this.transactions.reduce(
      (accumulator: Balance, tr: Transaction) => {
        switch (tr.type) {
          case 'income':
            accumulator.income += tr.value;
            break;
          case 'outcome':
            accumulator.outcome += tr.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: CreateDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
