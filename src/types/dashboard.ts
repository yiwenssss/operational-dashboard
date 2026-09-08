export type MetricTone = 'primary' | 'success' | 'error' | 'warning' | 'info'

export interface SummaryMetric {
  label: string
  value: string | number
  change: string
  tone: MetricTone
}

export interface PipelineMetric {
  name: string
  count: number
  value: string
  color: string
}

export interface AlertRow {
  business: string
  stage: string
  days: number
  underwriter: string
  rm: string
  severity: 'warning' | 'error'
}

export interface DisbursementItem {
  business: string
  amount: string
  target: string
  conditions: number
  status: 'critical' | 'watch' | 'healthy'
}

export interface AtRiskLoanItem {
  business: string
  balance: string
  status: string
  reason: string
  rm: string
}
