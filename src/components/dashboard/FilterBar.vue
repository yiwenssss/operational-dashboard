<script setup lang="ts">
import { defaultFilters, type DashboardFilters } from '../../data/dashboardData'

const props = defineProps<{
  modelValue: DashboardFilters
  rmItems: string[]
  underwriterItems: string[]
  loanTypeItems: string[]
  dateRangeItems: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DashboardFilters): void
}>()

const updateField = <K extends keyof DashboardFilters>(field: K, value: DashboardFilters[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  })
}

const clearFilters = () => {
  emit('update:modelValue', { ...defaultFilters })
}
</script>

<template>
  <v-card rounded="xl" class="pa-3 filter-card" elevation="0">
    <div class="d-flex flex-wrap align-center ga-3">
      <v-select
        :model-value="props.modelValue.relationshipManager"
        :items="props.rmItems"
        label="Relationship Manager"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-select"
        @update:model-value="(value) => updateField('relationshipManager', String(value ?? 'My book'))"
      />
      <v-select
        :model-value="props.modelValue.underwriter"
        :items="props.underwriterItems"
        label="Underwriter"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-select"
        @update:model-value="(value) => updateField('underwriter', String(value ?? 'All'))"
      />
      <v-select
        :model-value="props.modelValue.loanType"
        :items="props.loanTypeItems"
        label="Loan Type"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-select"
        @update:model-value="(value) => updateField('loanType', String(value ?? 'All'))"
      />
      <v-select
        :model-value="props.modelValue.dateRange"
        :items="props.dateRangeItems"
        label="Date Range"
        density="comfortable"
        variant="outlined"
        hide-details
        class="filter-select"
        @update:model-value="(value) => updateField('dateRange', String(value ?? 'Last 90 days'))"
      />
      <v-btn variant="text" class="text-none ml-auto" prepend-icon="mdi-filter-remove" @click="clearFilters">
        Clear all
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.filter-card {
  border: 1px solid rgba(0, 71, 187, 0.08);
  background: rgba(255, 255, 255, 0.72);
}

.filter-select {
  min-width: 180px;
}
</style>
