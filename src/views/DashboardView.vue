<script setup lang="ts">
import { computed } from 'vue'
import MetricCard from '../components/dashboard/MetricCard.vue'
import FilterBar from '../components/dashboard/FilterBar.vue'
import PipelineFunnel from '../components/dashboard/PipelineFunnel.vue'
import { dateRanges, loanTypes, relationshipManagers, underwriters } from '../data/dashboardData'
import { dashboardMetrics } from '../data/metrics'
import { useDashboardData } from '../composables/useDashboardData'

const { filters, setFilter, summaryCards, pipelineStages, agingAlerts, disbursementQueue, atRiskLoans } = useDashboardData()
const summaryMetricData = dashboardMetrics.summary
const pipelineMetricData = dashboardMetrics.pipeline

const filterModel = computed({
  get: () => filters.value,
  set: (value) => {
    setFilter('relationshipManager', value.relationshipManager)
    setFilter('underwriter', value.underwriter)
    setFilter('loanType', value.loanType)
    setFilter('dateRange', value.dateRange)
  },
})
</script>

<template>
  <v-app>
    <v-app-bar color="primary" flat dark class="px-4">
      <v-toolbar-title class="font-weight-medium">Small Business Lending Pipeline</v-toolbar-title>
      <v-spacer />
      <v-btn variant="outlined" class="text-none">Export</v-btn>
    </v-app-bar>

    <v-main class="dashboard-shell">
      <v-container fluid class="py-6 px-6">
        <v-row class="mb-4">
          <v-col cols="12">
            <FilterBar
              v-model="filterModel"
              :rm-items="relationshipManagers"
              :underwriter-items="underwriters"
              :loan-type-items="loanTypes"
              :date-range-items="dateRanges"
            />
          </v-col>
        </v-row>

        <v-row class="mb-2">
          <v-col v-for="card in summaryCards.length ? summaryCards : summaryMetricData" :key="card.label" cols="12" sm="6" md="4" lg="2.4">
            <MetricCard :label="card.label" :value="card.value" :change="card.change" :tone="card.tone" />
          </v-col>
        </v-row>

        <v-row class="mb-2">
          <v-col cols="12">
            <v-card rounded="xl" class="pa-5" elevation="0">
              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <div class="text-overline text-medium-emphasis">Pipeline</div>
                  <div class="text-h5 font-weight-bold">Stage funnel</div>
                </div>
                <v-chip color="primary" variant="tonal">Volume by stage</v-chip>
              </div>

              <PipelineFunnel :items="pipelineStages.length ? pipelineStages : pipelineMetricData" />
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-2">
          <v-col cols="12" lg="7">
            <v-card rounded="xl" class="pa-5 h-100" elevation="0">
              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <div class="text-overline text-medium-emphasis">Alerts</div>
                  <div class="text-h5 font-weight-bold">Aging & SLA exceptions</div>
                </div>
                <v-chip color="error" variant="tonal">{{ agingAlerts.length }} past SLA</v-chip>
              </div>

              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th>Business</th>
                    <th>Stage</th>
                    <th>Days over SLA</th>
                    <th>Underwriter</th>
                    <th>RM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in agingAlerts" :key="item.business">
                    <td>
                      <div class="d-flex align-center ga-2">
                        <span class="status-dot" :class="item.severity" />
                        {{ item.business }}
                      </div>
                    </td>
                    <td>{{ item.stage }}</td>
                    <td>{{ item.days }}</td>
                    <td>{{ item.underwriter }}</td>
                    <td>{{ item.rm }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>

          <v-col cols="12" lg="5">
            <v-card rounded="xl" class="pa-5 h-100" elevation="0">
              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <div class="text-overline text-medium-emphasis">Funding</div>
                  <div class="text-h5 font-weight-bold">Disbursement queue</div>
                </div>
                <v-chip color="warning" variant="tonal">Next 7 days</v-chip>
              </div>

              <div class="queue-list">
                <div v-for="item in disbursementQueue" :key="item.business" class="queue-item">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <span class="font-weight-bold">{{ item.business }}</span>
                    <v-chip :color="item.status === 'critical' ? 'error' : item.status === 'watch' ? 'warning' : 'success'" size="x-small" variant="tonal">
                      {{ item.status }}
                    </v-chip>
                  </div>
                  <div class="d-flex justify-space-between text-body-2 text-medium-emphasis">
                    <span>{{ item.amount }}</span>
                    <span>{{ item.target }}</span>
                  </div>
                  <div class="text-body-2 text-medium-emphasis mt-1">Conditions: {{ item.conditions }}</div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card rounded="xl" class="pa-5" elevation="0">
              <div class="d-flex align-center justify-space-between mb-4">
                <div>
                  <div class="text-overline text-medium-emphasis">Portfolio risk</div>
                  <div class="text-h5 font-weight-bold">At-risk existing loans</div>
                </div>
                <v-chip color="error" variant="tonal">{{ atRiskLoans.length }} flagged</v-chip>
              </div>

              <v-table density="comfortable">
                <thead>
                  <tr>
                    <th>Borrower</th>
                    <th>Outstanding Balance</th>
                    <th>Status</th>
                    <th>Stress Reason</th>
                    <th>RM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in atRiskLoans" :key="item.business">
                    <td>{{ item.business }}</td>
                    <td>{{ item.balance }}</td>
                    <td>
                      <v-chip color="error" size="x-small" variant="tonal">{{ item.status }}</v-chip>
                    </td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.rm }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="dashboard-footer justify-center py-4">
      Responsible lending starts with clear, timely decisions.
    </v-footer>
  </v-app>
</template>

<style scoped>
.dashboard-shell {
  background: linear-gradient(180deg, #edf3f9 0%, #f7f9fc 100%);
}

.dashboard-footer {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: transparent;
  color: #64748b;
  font-size: 0.8rem;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.warning {
  background: #f59e0b;
}

.status-dot.error {
  background: #ef4444;
}

.queue-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.queue-item {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 14px 16px;
}

th {
  color: #475569 !important;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 960px) {
  .funnel-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .stage-value {
    text-align: left;
  }
}
</style>
