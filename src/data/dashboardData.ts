export type LoanStage =
  | 'Submitted'
  | 'Document Collection'
  | 'Underwriting'
  | 'Credit Committee'
  | 'Approved'
  | 'Disbursed'
  | 'Declined'
  | 'Withdrawn'

export type LoanType = 'Term Loan' | 'SBA 7(a)' | 'Line of Credit' | 'Equipment Finance'

export interface ApplicationRecord {
  application_id: string
  business_name: string
  loan_type: LoanType
  loan_amount_requested: number
  stage: LoanStage
  stage_entry_date: string
  assigned_underwriter: string
  relationship_manager: string
  submission_date: string
  target_decision_date: string
  risk_score: number
  documents_outstanding: number
}

export interface AtRiskLoanRecord {
  loan_id: string
  business_name: string
  outstanding_balance: number
  payment_status: 'Current' | 'Past Due' | 'Default' | 'Watchlist'
  days_past_due: number
  deposit_trend_30d: 'Rising' | 'Flat' | 'Declining'
  risk_flag_reason: string
  relationship_manager: string
}

export interface DisbursementRecord {
  application_id: string
  business_name: string
  approved_amount: number
  approval_date: string
  funding_target_date: string
  conditions_outstanding: number
  relationship_manager: string
}

export const applications: ApplicationRecord[] = [
  {
    application_id: 'APP-1042',
    business_name: 'Northline Foods',
    loan_type: 'Term Loan',
    loan_amount_requested: 1250000,
    stage: 'Document Collection',
    stage_entry_date: '2026-08-12',
    assigned_underwriter: 'A. Lopez',
    relationship_manager: 'M. Chen',
    submission_date: '2026-08-02',
    target_decision_date: '2026-09-18',
    risk_score: 71,
    documents_outstanding: 3,
  },
  {
    application_id: 'APP-1076',
    business_name: 'Bright Harbor Labs',
    loan_type: 'SBA 7(a)',
    loan_amount_requested: 950000,
    stage: 'Underwriting',
    stage_entry_date: '2026-08-06',
    assigned_underwriter: 'S. Patel',
    relationship_manager: 'L. Nguyen',
    submission_date: '2026-07-28',
    target_decision_date: '2026-09-14',
    risk_score: 64,
    documents_outstanding: 1,
  },
  {
    application_id: 'APP-1109',
    business_name: 'Summit 3D',
    loan_type: 'Equipment Finance',
    loan_amount_requested: 760000,
    stage: 'Credit Committee',
    stage_entry_date: '2026-08-21',
    assigned_underwriter: 'J. Morris',
    relationship_manager: 'P. Woods',
    submission_date: '2026-08-16',
    target_decision_date: '2026-09-10',
    risk_score: 68,
    documents_outstanding: 2,
  },
  {
    application_id: 'APP-1123',
    business_name: 'Harbor Freight Co',
    loan_type: 'Line of Credit',
    loan_amount_requested: 420000,
    stage: 'Underwriting',
    stage_entry_date: '2026-08-17',
    assigned_underwriter: 'A. Lopez',
    relationship_manager: 'K. Singh',
    submission_date: '2026-07-30',
    target_decision_date: '2026-09-12',
    risk_score: 58,
    documents_outstanding: 0,
  },
  {
    application_id: 'APP-1188',
    business_name: 'Maple Grove',
    loan_type: 'Term Loan',
    loan_amount_requested: 890000,
    stage: 'Approved',
    stage_entry_date: '2026-08-19',
    assigned_underwriter: 'J. Morris',
    relationship_manager: 'M. Chen',
    submission_date: '2026-08-01',
    target_decision_date: '2026-09-09',
    risk_score: 74,
    documents_outstanding: 2,
  },
  {
    application_id: 'APP-1204',
    business_name: 'Atlantic Roofing',
    loan_type: 'SBA 7(a)',
    loan_amount_requested: 1360000,
    stage: 'Approved',
    stage_entry_date: '2026-08-18',
    assigned_underwriter: 'S. Patel',
    relationship_manager: 'L. Nguyen',
    submission_date: '2026-08-05',
    target_decision_date: '2026-09-15',
    risk_score: 69,
    documents_outstanding: 1,
  },
  {
    application_id: 'APP-1221',
    business_name: 'Lakeview Dental',
    loan_type: 'Line of Credit',
    loan_amount_requested: 540000,
    stage: 'Approved',
    stage_entry_date: '2026-08-27',
    assigned_underwriter: 'A. Lopez',
    relationship_manager: 'P. Woods',
    submission_date: '2026-08-12',
    target_decision_date: '2026-09-13',
    risk_score: 62,
    documents_outstanding: 0,
  },
  {
    application_id: 'APP-1238',
    business_name: 'Cedar Valley HVAC',
    loan_type: 'Term Loan',
    loan_amount_requested: 690000,
    stage: 'Submitted',
    stage_entry_date: '2026-08-22',
    assigned_underwriter: 'A. Lopez',
    relationship_manager: 'K. Singh',
    submission_date: '2026-08-21',
    target_decision_date: '2026-09-20',
    risk_score: 55,
    documents_outstanding: 2,
  },
  {
    application_id: 'APP-1260',
    business_name: 'Lumen Outdoor',
    loan_type: 'Equipment Finance',
    loan_amount_requested: 980000,
    stage: 'Underwriting',
    stage_entry_date: '2026-08-10',
    assigned_underwriter: 'J. Morris',
    relationship_manager: 'M. Chen',
    submission_date: '2026-07-29',
    target_decision_date: '2026-09-16',
    risk_score: 78,
    documents_outstanding: 1,
  },
  {
    application_id: 'APP-1284',
    business_name: 'Northwest Build',
    loan_type: 'Term Loan',
    loan_amount_requested: 1110000,
    stage: 'Document Collection',
    stage_entry_date: '2026-08-15',
    assigned_underwriter: 'S. Patel',
    relationship_manager: 'P. Woods',
    submission_date: '2026-08-03',
    target_decision_date: '2026-09-21',
    risk_score: 66,
    documents_outstanding: 4,
  },
  {
    application_id: 'APP-1312',
    business_name: 'Harbor Fabrication',
    loan_type: 'SBA 7(a)',
    loan_amount_requested: 620000,
    stage: 'Approved',
    stage_entry_date: '2026-08-24',
    assigned_underwriter: 'A. Lopez',
    relationship_manager: 'M. Chen',
    submission_date: '2026-08-11',
    target_decision_date: '2026-09-11',
    risk_score: 73,
    documents_outstanding: 3,
  },
  {
    application_id: 'APP-1322',
    business_name: 'Summit Works',
    loan_type: 'Line of Credit',
    loan_amount_requested: 730000,
    stage: 'Submitted',
    stage_entry_date: '2026-08-30',
    assigned_underwriter: 'J. Morris',
    relationship_manager: 'L. Nguyen',
    submission_date: '2026-08-26',
    target_decision_date: '2026-09-27',
    risk_score: 57,
    documents_outstanding: 1,
  },
]

export const atRiskLoans: AtRiskLoanRecord[] = [
  {
    loan_id: 'LN-8841',
    business_name: 'Cedar Valley HVAC',
    outstanding_balance: 480000,
    payment_status: 'Past Due',
    days_past_due: 12,
    deposit_trend_30d: 'Declining',
    risk_flag_reason: 'Payment past due and deposit trend declining',
    relationship_manager: 'K. Singh',
  },
  {
    loan_id: 'LN-8927',
    business_name: 'Lumen Outdoor',
    outstanding_balance: 1120000,
    payment_status: 'Watchlist',
    days_past_due: 0,
    deposit_trend_30d: 'Declining',
    risk_flag_reason: 'Revenue contraction with covenant breach',
    relationship_manager: 'M. Chen',
  },
  {
    loan_id: 'LN-9004',
    business_name: 'Northwest Build',
    outstanding_balance: 670000,
    payment_status: 'Past Due',
    days_past_due: 3,
    deposit_trend_30d: 'Declining',
    risk_flag_reason: 'Late payment and tighter liquidity',
    relationship_manager: 'P. Woods',
  },
  {
    loan_id: 'LN-9051',
    business_name: 'Summit Works',
    outstanding_balance: 890000,
    payment_status: 'Watchlist',
    days_past_due: 0,
    deposit_trend_30d: 'Declining',
    risk_flag_reason: 'Declining deposit trend over 90 days',
    relationship_manager: 'L. Nguyen',
  },
]

export const disbursementQueue: DisbursementRecord[] = [
  {
    application_id: 'APP-1188',
    business_name: 'Maple Grove',
    approved_amount: 840000,
    approval_date: '2026-08-30',
    funding_target_date: '2026-09-08',
    conditions_outstanding: 2,
    relationship_manager: 'M. Chen',
  },
  {
    application_id: 'APP-1204',
    business_name: 'Atlantic Roofing',
    approved_amount: 1250000,
    approval_date: '2026-08-31',
    funding_target_date: '2026-09-09',
    conditions_outstanding: 1,
    relationship_manager: 'L. Nguyen',
  },
  {
    application_id: 'APP-1312',
    business_name: 'Harbor Fabrication',
    approved_amount: 620000,
    approval_date: '2026-09-02',
    funding_target_date: '2026-09-11',
    conditions_outstanding: 3,
    relationship_manager: 'M. Chen',
  },
  {
    application_id: 'APP-1221',
    business_name: 'Lakeview Dental',
    approved_amount: 475000,
    approval_date: '2026-09-03',
    funding_target_date: '2026-09-12',
    conditions_outstanding: 0,
    relationship_manager: 'P. Woods',
  },
]

export interface DashboardFilters {
  relationshipManager: string
  underwriter: string
  loanType: string
  dateRange: string
}

export const defaultFilters: DashboardFilters = {
  relationshipManager: 'My book',
  underwriter: 'All',
  loanType: 'All',
  dateRange: 'Last 90 days',
}

export const relationshipManagers = ['My book', 'All RMs', 'M. Chen', 'K. Singh', 'L. Nguyen', 'P. Woods']
export const underwriters = ['All', 'A. Lopez', 'S. Patel', 'J. Morris']
export const loanTypes = ['All', 'Term Loan', 'SBA 7(a)', 'Line of Credit', 'Equipment Finance']
export const dateRanges = ['Last 30 days', 'Last 90 days', 'YTD']
