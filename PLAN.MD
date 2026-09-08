Create a new Vue project called "operational-dashboard"
Use Vite with TypeScript and Vue Router. Then add Vuetify 3 with Material Design Icons, and also install cahrt.js and vue-chart.js for data visualizations. Set everything up and open the project.

# Small Business Lending Pipeline Dashboard: PLAN

## 1. Overview

**Industry:** Financial Services (Capital One style small business lending)

**Purpose:** Give the people who move loans through the pipeline a single view of where every application stands, which ones are stuck, what's about to fund, and which existing borrowers are starting to show stress. The goal is that a relationship manager or underwriting team lead can open this dashboard first thing and know exactly where to spend their morning, without pulling three different reports.

## 2. Primary Users

### 2.1 Relationship Manager (RM)

Owns the client relationship. Cares about their own book of applications and existing loans, wants to know which of their deals need a nudge and which clients are drifting toward trouble.

### 2.2 Underwriting Team Lead

Owns throughput across the whole underwriting queue. Cares about workload balance across underwriters, SLA breaches, and anything close to missing a decision deadline.

Both users share the same dashboard but likely filter it differently (my book vs. whole team).

## 3. Jobs to Be Done

- "Show me every application that is running late so I can chase it before it becomes a client complaint."
- "Show me what's about to fund so I can make sure nothing blocks it."
- "Show me which existing borrowers are showing early stress so I can get ahead of a default."
- "Show me how the pipeline is trending, is volume up, is the queue backing up."

## 4. Key Metrics and Sections

### 4.1 Summary Strip (top of page)

- Total applications in flight
- Total pipeline value ($)
- Applications past SLA (count, flagged red)
- Disbursement queue value, next 7 days
- At-risk existing loans (count)

### 4.2 Pipeline Funnel

Stage by stage view of applications: Submitted, Document Collection, Underwriting, Credit Committee, Approved, Disbursed, Declined, Withdrawn. Shows count and dollar value at each stage, so a bottleneck is visible at a glance.

### 4.3 Aging and SLA Alerts

This is the "something's off" panel. Table of applications where days in current stage exceeds the SLA for that stage. Sorted worst first. Each row shows business name, stage, days over SLA, assigned underwriter, and RM.

Example SLA targets to encode (adjust to real policy later):

- Document Collection: 5 business days
- Underwriting: 10 business days
- Credit Committee: 3 business days

### 4.4 Disbursement Queue

Approved loans waiting to fund. Shows approved amount, funding target date, and any outstanding conditions still blocking disbursement. Sorted by soonest funding date.

### 4.5 At-Risk Existing Loan Portfolio

Loans already on the books showing early stress signals:

- Payment past due
- Declining deposit/revenue trend over trailing 30 to 90 days
- Covenant or condition breach

Each row shows the stress reason so it's clear why it's flagged, not just that it is.

### 4.6 Filters

By RM, by underwriter, by loan type (term loan, SBA 7(a), line of credit, etc.), by date range. Defaults to "my book" for an RM, "whole team" for a team lead.

## 5. Data Model (draft)

### 5.1 Applications

| Field | Notes |
|---|---|
| application_id | unique id |
| business_name | |
| loan_type | term loan, SBA 7(a), line of credit, etc. |
| loan_amount_requested | |
| stage | current pipeline stage |
| stage_entry_date | used to compute days in stage |
| assigned_underwriter | |
| relationship_manager | |
| submission_date | |
| target_decision_date | |
| risk_score | internal score if available |
| documents_outstanding | count or list |

### 5.2 Existing Loans (at-risk monitoring)

| Field | Notes |
|---|---|
| loan_id | |
| business_name | |
| outstanding_balance | |
| payment_status | current, past due, default |
| days_past_due | |
| deposit_trend_30d | rising, flat, declining |
| risk_flag_reason | free text, why it's flagged |
| relationship_manager | |

### 5.3 Disbursement Queue

| Field | Notes |
|---|---|
| application_id | links to Applications |
| approved_amount | |
| approval_date | |
| funding_target_date | |
| conditions_outstanding | count or list |

## 6. Alert Logic

- Application flagged red if `days_in_stage > SLA` for that stage.
- Existing loan flagged if `days_past_due > 0`, or `deposit_trend_30d` is declining, or a covenant breach is on file.
- Disbursement item flagged if `funding_target_date` is within 7 days and `conditions_outstanding > 0`.

## 7. Layout Sketch

1. Summary strip across the top
2. Pipeline funnel, full width
3. Two column row: Aging/SLA alerts (left) and Disbursement queue (right)
4. At-risk existing loans, full width table below
5. Filter bar, sticky at top or in a side rail

## 8. Implementation Notes

- Build as a single page dashboard, likely React with Recharts for the funnel and trend visuals, and plain tables for the alert lists.
- Use mock/sample data to start, structured to match the data model above, so it can later be swapped for a real data source.
- Color coding: red for past SLA or stress flags, amber for approaching a threshold, green/neutral otherwise. Keep it restrained, the alerts should stand out precisely because most of the dashboard isn't red.

## 9. Out of Scope (for now)

- [ ] Real authentication or role based access
- [ ] Live data integration with core banking systems
- [ ] Automated notifications (email/Slack) when something is flagged
- [ ] Historical trend analysis beyond 90 days

## 10. Open Questions / Assumptions

- [ ] Confirm this is a first pass with sample data, not connected to a live system yet.
- [ ] Confirm SLA thresholds above, currently placeholders, real ones should come from underwriting policy.
- [ ] Decide whether the dashboard needs both an "RM view" and a "team lead view" as separate modes, or one view with filters. Currently planned as one view with filters.

