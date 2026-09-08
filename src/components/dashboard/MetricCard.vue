<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  change: string
  tone?: 'primary' | 'success' | 'error' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'primary',
})
</script>

<template>
  <v-card rounded="xl" class="pa-4 stat-card" elevation="0">
    <div class="d-flex align-center justify-space-between mb-3">
      <span class="text-medium-emphasis text-body-2 text-uppercase">{{ props.label }}</span>
      <v-chip :color="props.tone" size="x-small" variant="tonal" class="text-uppercase">{{ props.change }}</v-chip>
    </div>
    <div class="text-h4 font-weight-bold metric-value">{{ props.value }}</div>
  </v-card>
</template>

<style scoped>
.stat-card {
  border: 1px solid rgba(0, 71, 187, 0.08);
  background: rgba(255, 255, 255, 0.82);
}

.metric-value {
  color: #0f172a;
}
</style>
