export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORT = 'Transport',
  UTILITIES = 'Utilities',
  HOUSING = 'Housing',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SHOPPING = 'Shopping',
  OTHER = 'Other',
}

export enum Currency {
  INR = 'INR',
  USD = 'USD',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: string; // ISO string
  category?: ExpenseCategory;
}

export interface RecurringExpense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
}

export interface RecurringIncome {
  id: string;
  description: string;
  amount: number;
}

export interface SavingsGoal {
  id: string;
  destination: string;
  amount: number;
}

export interface CategoryBudget {
  category: ExpenseCategory;
  amount: number;
}

export interface MonthlySummary {
  month: string;
  monthIndex: number;
  income: number;
  expenses: number;
  balance: number;
}

export interface YearlySummary {
    totalIncome: number;
    totalExpenses: number;
    totalBalance: number;
    totalSavings: number;
}

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error';
}