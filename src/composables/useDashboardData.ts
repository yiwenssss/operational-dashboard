import { computed, ref } from 'vue'
import {
  applications,
  atRiskLoans,
  defaultFilters,
  disbursementQueue,
} from '../data/dashboardData'
import { formatCurrency, getDaysInStage } from '../utils/formatters'

const activeFilters = ref({ ...defaultFilters })

const getStageSla = (stage: string) => {
  const slaMap: Record<string, number> = {
    'Document Collection': 5,
    Underwriting: 10,
    'Credit Committee': 3,
  }

  return slaMap[stage] ?? 0
}

const matchesFilter = (item: { relationship_manager?: string; assigned_underwriter?: string; loan_type?: string }) => {
  const currentRM = activeFilters.value.relationshipManager
  const currentUW = activeFilters.value.underwriter
  const currentType = activeFilters.value.loanType

  if (currentRM === 'My book' && item.relationship_manager && item.relationship_manager !== 'M. Chen') {
    return false
  }

  if (currentRM !== 'All RMs' && currentRM !== 'My book' && item.relationship_manager !== currentRM) {
    return false
  }

  if (currentUW !== 'All' && item.assigned_underwriter !== currentUW) {
    return false
  }

  if (currentType !== 'All' && item.loan_type !== currentType) {
    return false
  }

  return true
}

const getPipelineData = () => {
  const pipelineMap = new Map<string, { count: number; value: number }>()

  for (const stage of [
    'Submitted',
    'Document Collection',
    'Underwriting',
    'Credit Committee',
    'Approved',
    'Disbursed',
    'Declined',
    'Withdrawn',
  ]) {
    pipelineMap.set(stage, { count: 0, value: 0 })
  }

  applications.forEach((application) => {
    const item = pipelineMap.get(application.stage)
    if (!item) return

    const inScope = matchesFilter(application)
    if (!inScope) return

    item.count += 1
    item.value += application.loan_amount_requested
  })

  return [...pipelineMap.entries()].map(([name, value]) => {
    const colorMap: Record<string, string> = {
      Submitted: '#8db8d1',
      'Document Collection': '#6f9fbd',
      Underwriting: '#4a7fc1',
      'Credit Committee': '#004977',
      Approved: '#7fc6a8',
      Disbursed: '#1e7f5b',
      Declined: '#c92d39',
      Withdrawn: '#9aaab5',
    }

    return {
      name,
      count: value.count,
      value: formatCurrency(value.value),
      color: colorMap[name] ?? '#8db8d1',
    }
  })
}

const getSummary = () => {
  const filteredApplications = applications.filter((application) => matchesFilter(application))
  const filteredAtRisk = atRiskLoans.filter((loan) => {
    if (activeFilters.value.relationshipManager === 'My book' && loan.relationship_manager !== 'M. Chen') return false
    if (activeFilters.value.relationshipManager !== 'All RMs' && activeFilters.value.relationshipManager !== 'My book' && loan.relationship_manager !== activeFilters.value.relationshipManager) return false
    return true
  })

  const totalPipelineValue = filteredApplications.reduce((sum, item) => sum + item.loan_amount_requested, 0)
  const pastSlaCount = filteredApplications.filter((application) => {
    const daysInStage = getDaysInStage(application.stage_entry_date)
    return daysInStage > getStageSla(application.stage)
  }).length

  const disbursementValue = disbursementQueue
    .filter((item) => {
      if (activeFilters.value.relationshipManager === 'My book' && item.relationship_manager !== 'M. Chen') return false
      if (activeFilters.value.relationshipManager !== 'All RMs' && activeFilters.value.relationshipManager !== 'My book' && item.relationship_manager !== activeFilters.value.relationshipManager) return false
      return true
    })
    .reduce((sum, item) => sum + item.approved_amount, 0)

  return {
    appsInFlight: filteredApplications.length,
    pipelineValue: formatCurrency(totalPipelineValue),
    pastSla: pastSlaCount,
    disbursementValue: formatCurrency(disbursementValue),
    atRiskLoans: filteredAtRisk.length,
  }
}

const getAgingAlerts = () => {
  return applications
    .filter((application) => matchesFilter(application))
    .map((application) => {
      const daysOver = getDaysInStage(application.stage_entry_date) - getStageSla(application.stage)
      return {
        business: application.business_name,
        stage: application.stage,
        days: Math.max(0, daysOver),
        underwriter: application.assigned_underwriter,
        rm: application.relationship_manager,
        severity: daysOver > 6 ? 'error' : 'warning',
      }
    })
    .filter((alert) => alert.days > 0)
    .sort((a, b) => b.days - a.days)
    .slice(0, 5)
}

const getDisbursementQueueData = () => {
  return disbursementQueue
    .filter((item) => {
      if (activeFilters.value.relationshipManager === 'My book' && item.relationship_manager !== 'M. Chen') return false
      if (activeFilters.value.relationshipManager !== 'All RMs' && activeFilters.value.relationshipManager !== 'My book' && item.relationship_manager !== activeFilters.value.relationshipManager) return false
      if (activeFilters.value.loanType !== 'All' && !applications.some((app) => app.business_name === item.business_name && app.loan_type === activeFilters.value.loanType)) return false
      return true
    })
    .map((item) => {
      const daysUntilFunding = Math.max(0, Math.ceil((new Date(item.funding_target_date).getTime() - new Date('2026-09-07T00:00:00Z').getTime()) / (1000 * 60 * 60 * 24)))
      return {
        business: item.business_name,
        amount: formatCurrency(item.approved_amount),
        target: item.funding_target_date,
        conditions: item.conditions_outstanding,
        status: item.conditions_outstanding > 0 && daysUntilFunding <= 2 ? 'critical' : item.conditions_outstanding > 0 ? 'watch' : 'healthy',
        rm: item.relationship_manager,
      }
    })
}

const getAtRiskLoansData = () => {
  return atRiskLoans
    .filter((loan) => {
      if (activeFilters.value.relationshipManager === 'My book' && loan.relationship_manager !== 'M. Chen') return false
      if (activeFilters.value.relationshipManager !== 'All RMs' && activeFilters.value.relationshipManager !== 'My book' && loan.relationship_manager !== activeFilters.value.relationshipManager) return false
      return true
    })
    .map((loan) => ({
      business: loan.business_name,
      balance: formatCurrency(loan.outstanding_balance),
      status: loan.days_past_due > 0 ? `Past due ${loan.days_past_due} days` : 'Watchlist',
      reason: loan.risk_flag_reason,
      rm: loan.relationship_manager,
    }))
}

export function useDashboardData() {
  const filters = computed(() => activeFilters.value)

  const setFilter = (key: keyof typeof defaultFilters, value: string) => {
    activeFilters.value = {
      ...activeFilters.value,
      [key]: value,
    }
  }

  const summaryCards = computed(() => [
    { label: 'Apps in flight', value: getSummary().appsInFlight, change: '+18 vs last week', tone: 'primary' as const },
    { label: 'Pipeline value', value: getSummary().pipelineValue, change: '+$5.1M', tone: 'success' as const },
    { label: 'Past SLA', value: getSummary().pastSla, change: '6 critical', tone: 'error' as const },
    { label: 'Next 7-day funding', value: getSummary().disbursementValue, change: '14 deals', tone: 'warning' as const },
    { label: 'At-risk loans', value: getSummary().atRiskLoans, change: '2 new this week', tone: 'info' as const },
  ])

  return {
    filters,
    setFilter,
    summaryCards,
    pipelineStages: computed(() => getPipelineData()),
    agingAlerts: computed(() => getAgingAlerts()),
    disbursementQueue: computed(() => getDisbursementQueueData()),
    atRiskLoans: computed(() => getAtRiskLoansData()),
  }
}
