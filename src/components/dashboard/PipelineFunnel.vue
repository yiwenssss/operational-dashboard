<script setup lang="ts">
interface PipelineItem {
  name: string
  count: number
  value: string
  color: string
}

const props = defineProps<{
  items: PipelineItem[]
}>()

const maxCount = Math.max(1, ...props.items.map((item) => item.count))
</script>

<template>
  <div class="funnel-wrap">
    <div v-for="stage in props.items" :key="stage.name" class="funnel-row">
      <div class="stage-label">
        <div class="text-subtitle-2 font-weight-bold">{{ stage.name }}</div>
        <div class="text-caption text-medium-emphasis">{{ stage.count }} apps</div>
      </div>
      <div class="funnel-bar-group">
        <div class="funnel-bar" :style="{ width: `${(stage.count / maxCount) * 100}%`, background: stage.color }" />
      </div>
      <div class="stage-value text-body-2 font-weight-medium">{{ stage.value }}</div>
    </div>
  </div>
</template>

<style scoped>
.funnel-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funnel-row {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 90px;
  align-items: center;
  gap: 18px;
}

.stage-label {
  min-width: 0;
}

.funnel-bar-group {
  background: var(--color-primary-soft);
  border-radius: 999px;
  overflow: hidden;
  height: 16px;
}

.funnel-bar {
  height: 100%;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
}

.stage-value {
  text-align: right;
  color: var(--color-ink);
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
