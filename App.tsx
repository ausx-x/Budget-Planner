import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { BalanceOverview } from './components/BalanceOverview';
import { YearlySummaryCard } from './components/SavingsCard';
import { TransactionForm } from './components/TransactionForm';
import { RecurringIncomeManager } from './components/RecurringIncomeManager';
import { RecurringExpensesManager } from './components/RecurringExpensesManager';
import { SavingsManager } from './components/SavingsManager';
import { TransactionList } from './components/TransactionList';
import { Reports } from './components/Reports';
import { useBudget } from './hooks/useBudget';
import { Toast as ToastType } from './types';
import { CheckCircleIcon, XIcon } from './components/icons';
import { CategoryBudgetManager } from './components/CategoryBudgetManager';

const Toast: React.FC<{ toast: ToastType, onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
    return (
        <div className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{toast.message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button onClick={() => onDismiss(toast.id)} className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Close</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ToastContainer: React.FC<{ toasts: ToastType[], onDismiss: (id: string) => void }> = ({ toasts, onDismiss }) => {
    const [portalElement, setPortalElement] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        setPortalElement(document.getElementById('toast-container'));
    }, []);
    
    if (!portalElement) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-start justify-end px-4 py-6 pointer-events-none sm:p-6 z-50">
            <div className="w-full max-w-sm space-y-4">
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
                ))}
            </div>
        </div>,
        portalElement
    );
};


function App() {
  const {
    selectedYear,
    setSelectedYear,
    currency,
    setCurrency,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    recurringIncomes,
    addRecurringIncome,
    updateRecurringIncome,
    deleteRecurringIncome,
    recurringExpenses,
    addRecurringExpense,
    updateRecurringExpense,
    deleteRecurringExpense,
    savingsGoals,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    monthlySummaries,
    yearlySummary,
    incomeTransactions,
    expenseTransactions,
    expenseCategoriesData,
    formatCurrency,
    categoryBudgets,
    setCategoryBudget,
    deleteCategoryBudget,
    toasts,
    addToast,
    dismissToast,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
  } = useBudget();

  return (
    <div className="min-h-screen bg-slate-100">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      <Header 
        selectedYear={selectedYear} 
        setSelectedYear={setSelectedYear} 
        currency={currency}
        setCurrency={setCurrency}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms & Managers */}
          <div className="lg:col-span-1 space-y-8">
            <TransactionForm addTransaction={addTransaction} addToast={addToast} />
            <RecurringIncomeManager
              recurringIncomes={recurringIncomes}
              addRecurringIncome={addRecurringIncome}
              updateRecurringIncome={updateRecurringIncome}
              deleteRecurringIncome={deleteRecurringIncome}
              formatCurrency={formatCurrency}
              addToast={addToast}
            />
            <RecurringExpensesManager 
              recurringExpenses={recurringExpenses}
              addRecurringExpense={addRecurringExpense}
              updateRecurringExpense={updateRecurringExpense}
              deleteRecurringExpense={deleteRecurringExpense}
              formatCurrency={formatCurrency}
              addToast={addToast}
            />
            <SavingsManager
              savingsGoals={savingsGoals}
              addSavingsGoal={addSavingsGoal}
              updateSavingsGoal={updateSavingsGoal}
              deleteSavingsGoal={deleteSavingsGoal}
              formatCurrency={formatCurrency}
              addToast={addToast}
            />
             <CategoryBudgetManager
              categoryBudgets={categoryBudgets}
              setCategoryBudget={setCategoryBudget}
              deleteCategoryBudget={deleteCategoryBudget}
              formatCurrency={formatCurrency}
              addToast={addToast}
            />
          </div>

          {/* Right Column: Data Display */}
          <div className="lg:col-span-2 space-y-8">
            <YearlySummaryCard summary={yearlySummary} year={selectedYear} formatCurrency={formatCurrency} />
            
            <BalanceOverview monthlySummaries={monthlySummaries} formatCurrency={formatCurrency} />

            <Reports 
                monthlySummaries={monthlySummaries}
                expenseCategoriesData={expenseCategoriesData}
                formatCurrency={formatCurrency}
            />
            
            <TransactionList 
              income={incomeTransactions}
              expenses={expenseTransactions}
              updateTransaction={updateTransaction}
              deleteTransaction={deleteTransaction}
              formatCurrency={formatCurrency}
              addToast={addToast}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;