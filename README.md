# APTRANSCO — Tour Allowance Portal

A web-based Tour Allowance (TA) bill management system for APTRANSCO employees, built with React and Vite.

## Overview

This portal digitises the end-to-end lifecycle of employee travel reimbursement claims based on the official **A.P.T.C. Form 52** (Travelling Allowance Bill for Non-Gazetted Establishment). It covers bill submission, scrutiny, Pass Order creation, SAP FV-60 posting, Cash Section processing, LOC initiation, AAO/AO approval, and final payment via SAP F-53.

## Process Flow

```
Employee Submits Bill
       ↓
JAO (Other Bills) — Scrutiny & Pass Order
       ↓
AAO (Other Bills) — FV-60 SAP Entry (T-Code FV-60)
       ↓
Cash Section receives document
       ↓
JAO (Cash) — Initiates LOC Process
       ↓
AAO (Cash) approves  (<₹50,000)
AO  (Cash) approves  (₹50,000 – ₹5,00,000)
       ↓
JAO (Cash) — Posts Payment in SAP (T-Code F-53)
       ↓
Payment Confirmed — LOC / B&R Check to Bank
```

### Bill Statuses

| Status | Stage | Owner |
|---|---|---|
| Draft | Not yet submitted | Employee |
| Submitted | Awaiting scrutiny | JAO (Bills) |
| Under Scrutiny | Bill received, being verified | JAO (Bills) |
| Pass Order Created | Amount verified, PO generated | JAO (Bills) |
| FV-60 Posted (SAP) | Document posted in SAP | AAO (Bills) |
| Cash Section Pending | Received by Cash Section | JAO (Cash) |
| LOC Under Process | Letter of Credit initiated | JAO (Cash) |
| AAO Approved | Bills < ₹50,000 | AAO (Cash) |
| AO Approved | Bills ₹50,000 – ₹5,00,000 | AO (Cash) |
| F-53 Posted | Payment posted in SAP | JAO (Cash) |
| Paid | Payment disbursed | — |
| Rejected | Bill rejected with reason | Any approver |

## Role Hierarchy

```
CGM (Finance) → GM (Finance) → Pay Officer → AO → CPR → AAO (Other Bills)
                                                      ↓
                                              JAO (Cash) → AAO (Cash) → AO (Cash)
```

| Role | Capabilities |
|---|---|
| **Employee** | Submit TA bills, track status |
| **JAO (Other Bills)** | Scrutinise bills, modify amounts, create Pass Order, post FV-60 in SAP |
| **JAO (Cash)** | Receive bills from Bills Section, initiate LOC, post F-53 payment in SAP |
| **AAO (Cash)** | Approve bills below ₹50,000 |
| **AO (Cash)** | Approve bills ₹50,000 – ₹5,00,000 |
| **Pay Officer** | Payment oversight |
| **GM/CGM Finance** | Overall view and reporting |
| **Admin** | Full access — audit log and user management |

## SAP T-Codes

### FV-60 — TA Document Post (AAO Other Bills)

Fields posted in SAP:

| Section | Field | Value |
|---|---|---|
| Header | Supplier | Employee ID |
| Header | Invoice Date | Date of document entry |
| Header | Reference | Inward Number |
| Header | Posting Date | System Date (auto) |
| Header | Amount | Employee Amount |
| Header | Text | Remarks |
| Line Item | GL A/C | 76132 |
| Line Item | Tax Code | V0 |
| Line Item | Business Area | Auto-fetched from Employee |
| Line Item | Cost Centre | Auto-fetched from Employee |
| Line Item | Qty | 1 |
| Line Item | Base on Measurement | MON |
| Line Item | HSN Code | ZN0001 |
| Business Area Tab | Payment Term | LC5T |
| Business Area Tab | Header Text | TA Bill For the Month of… |

Flow: **Simulation → Document Post → LOC Section**

### F-53 — Post Outgoing Payment (JAO Cash)

Posts payment against the FV-60 document number. Confirms that payment has been made against the TA Bill. Offline process: LOC / B&R Check to Bank.

## Key Modules

- **Submit TA Bill** — A.P.T.C. Form 52 wizard: bill header, journey details (mileage, DA, rail/road fare), certifications
- **Scrutiny Queue** — JAO (Bills) receives bills, assigns Inward Number, marks under scrutiny
- **FV-60 Queue** — Bills with Pass Order ready for SAP FV-60 posting
- **Cash Section Queue** — Bills forwarded from Bills Section for LOC and approval
- **F-53 Queue** — Approved bills ready for SAP F-53 payment posting
- **Process Timeline** — 9-step visual tracker on every bill detail panel
- **Payment Tracker** — Full pipeline view across all statuses with Pass Order / SAP Doc references
- **Reports** — Bill status breakdown and employee-wise summary
- **Team Directory** — Officers, designations, and contact numbers
- **Audit Log** — Timestamped activity trail for all actions (Admin only)
- **User Management** — User directory with role assignments (Admin only)

## Tech Stack

- **React 18** — UI with hooks
- **Vite 6** — Dev server and build tooling
- **Lucide React** — Icons
- **Inline CSS** — Component-scoped styling with a shared design token object

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

## Demo Login

The portal runs in demo mode — any username and password are accepted. Select a role from the dropdown.

| Role | Demo User | Employee ID | Contact |
|---|---|---|---|
| Employee | K. Praveen Kumar | 1073091 | — |
| JAO (Other Bills) | T. Ramesh Kumar | 1073045 | — |
| JAO (Cash) | V. Srinivasan | JAO001 | 9848167287 |
| AAO (Cash) | S. Lakshmi Devi | 1073012 | — |
| AO (Cash) | Murthy | AO001 | — |
| Pay Officer | P. Malleswari | PO001 | 9949635652 |
| GM (Finance) | Murthy (GM) | GM001 | 9398417653 |
| Admin | Admin User | ADMIN01 | — |

## Deployment

The app is deployed to GitHub Pages via GitHub Actions on every push to `main`.

Live URL: `https://moinUXDesigner.github.io/EmployeeOne-TABill/`

Workflow: `.github/workflows/deploy.yml` — builds with `npm ci && npm run build`, deploys `dist/` using the official GitHub Pages Actions.

## Project Structure

```
ta-bills/
├── ta_portal.jsx             # Main application — all components in one file
├── src/
│   ├── main.jsx              # React entry point
│   └── index.css             # CSS reset
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment workflow
├── index.html                # HTML entry point
├── vite.config.js            # Vite config (base: /EmployeeOne-TABill/)
└── package.json
```

## Organisation

**Company Code:** 3000 — APTRANSCO VIJAYAWADA
