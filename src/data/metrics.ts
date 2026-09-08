import metricsSource from './metrics.json'
import type { PipelineMetric, SummaryMetric } from '../types/dashboard'

export const dashboardMetrics = {
  summary: metricsSource.summary as SummaryMetric[],
  pipeline: metricsSource.pipeline as PipelineMetric[],
}
