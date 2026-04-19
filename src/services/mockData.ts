import type { Customer, LoanApplication, CreditProduct, Trigger } from '../types';

export const mockCustomer: Customer = {
  id: 'CUST001',
  name: 'Rohan Mehta',
  phone: '+91 98004 XX789',
  email: 'rohan.mehta@email.com',
  tier: 'Gold',
  since: 'Oct 2023',
  ltv: 8.4,
  ltvScore: 84,
  monthlyIncome: 95000,
  foir: 36.9,
  creditScore: 782,
  segment: 'Urban Spender'
};

// Extended customer data
export const customerExtended = {
  kyc: {
    status: 'Verified',
    cif: 'CIF789456123',
    lastUpdated: 'Jan 2025'
  },
  riskProfile: {
    category: 'Low Risk',
    paymentHistory: '100% on-time',
    defaultHistory: 'None',
    bureauScore: 782
  },
  interactions: {
    ccCalls: 12,
    lastCall: '15 days ago',
    emails: 8,
    chats: 5,
    complaints: 0,
    lastAppLogin: '2 hours ago',
    appUsageFrequency: 'Daily'
  },
  preferences: {
    contactChannel: 'WhatsApp',
    contactTime: '6-9 PM',
    language: 'English',
    digitalPreference: 'High'
  },
  linkedAccounts: {
    coBorrowers: ['Priya Mehta (Spouse)'],
    deposits: ['FD: ₹2,50,000', 'RD: ₹10,000/mo'],
    otherLoans: []
  },
  alerts: {
    bureauTriggers: 0,
    dpd: 0,
    emiBounceLast12Mo: 0,
    ewsFlags: []
  },
  persona: 'Salaried - Senior Corporate'
};

export const mockLoanApplication: LoanApplication = {
  id: 'LOAN001',
  customerId: 'CUST001',
  amount: 500000,
  tenure: 36,
  interestRate: 10.5,
  apr: 5.78,
  monthlyEMI: 16251,
  processingFee: 0,
  totalInterest: 85036,
  totalAmount: 585036,
  prepaymentPenalty: 'Nil after 6 months',
  penalCharges: '2% p.a. on overdue',
  status: 'processing',
  type: 'Home Furnishing Loan'
};

export const mockCreditProducts: CreditProduct[] = [
  {
    type: 'Two Wheeler Loan',
    amount: 43200,
    outstanding: 43200,
    emi: 3600,
    tenure: '20/36 mo',
    status: 'active'
  },
  {
    type: 'Home Loan (Bureau)',
    amount: 16000000,
    outstanding: 16000000,
    emi: 0,
    tenure: '~12 yr left',
    status: 'active'
  },
  {
    type: 'Personal Loan (Bureau)',
    amount: 0,
    outstanding: 0,
    emi: 0,
    tenure: 'Feb 2026',
    status: 'closed'
  }
];

export const mockTriggers: Trigger[] = [
  {
    id: 'T1',
    name: 'Home Furnishing Need Identified',
    type: 'AI',
    urgency: 'high',
    timestamp: new Date(),
    description: 'Customer called CC to update address — relocating Pune to Bangalore. Est. requirement Rs.2-5 Lakhs'
  },
  {
    id: 'T2',
    name: 'Relocation trigger',
    type: 'Event',
    urgency: 'medium',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: 'Called CC to update address. Moving Pune → Bangalore. [CRM, 2 days ago]'
  },
  {
    id: 'T3',
    name: 'Re-engagement window open',
    type: 'Campaign',
    urgency: 'high',
    timestamp: new Date(),
    description: 'Competitor NBFC loan pre-closed Feb 2025. No active external loan. 3 competitor rate checks in 90 days. [Bureau, today]'
  },
  {
    id: 'T4',
    name: 'Credit & Income confirmed',
    type: 'Data',
    urgency: 'low',
    timestamp: new Date(),
    description: 'CIBIL 782. Rs.95K FOIR headroom. 28-month zero-default track. Pre-approved Rs.10L [CBI + Bureau]'
  }
];

export const spendingCategories = [
  { name: 'Groceries', percentage: 18, color: '#0072BC' },
  { name: 'Education', percentage: 15, color: '#C8102E' },
  { name: 'Home & Living', percentage: 25, color: '#F59E0B' },
  { name: 'Dining', percentage: 12, color: '#10B981' }
];
