import { useState } from "react";
import {
  LayoutDashboard, FileText, CheckCircle, XCircle, LogOut, Bell,
  Menu, Plus, Eye, Search, Activity, ChevronRight, AlertTriangle,
  ArrowLeft, X, User, Shield, Users, Download, Clock,
  IndianRupee, BarChart3, Truck, MapPin, CheckSquare, Inbox, Hourglass
} from "lucide-react";

const C = {
  primary: '#4C54E8', primaryHover: '#3D3FD4', primaryLight: '#F0F4FF',
  primaryMid: '#E0E9FF', primaryDark: '#2F3187',
  text: '#111827', textSec: '#4B5563', textMuted: '#6B7280', textDisabled: '#9CA3AF',
  bg: '#F9FAFB', surface: '#FFFFFF', border: '#E5E7EB', borderLight: '#F3F4F6',
  success: '#15803D', successBg: '#DCFCE7', successBorder: '#86EFAC',
  warning: '#B45309', warningBg: '#FEF3C7', warningBorder: '#FCD34D',
  danger: '#B91C1C', dangerBg: '#FEE2E2', dangerBorder: '#FCA5A5',
  info: '#3D3FD4', infoBg: '#E0E9FF', infoBorder: '#C7D7FE',
};

const btn = (bg, color, border = 'transparent') => ({
  background: bg, color, border: `1px solid ${border}`, padding: '8px 16px',
  borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6,
  fontFamily: 'Segoe UI, sans-serif', transition: 'opacity 0.15s',
});
const btnPrimary = btn(C.primary, '#fff');
const btnSecondary = btn(C.surface, C.text, C.border);
const btnSuccess = btn(C.successBg, C.success, C.successBorder);
const btnDanger = btn(C.dangerBg, C.danger, C.dangerBorder);
const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px' };

const ROLES = {
  EMPLOYEE:    'EMPLOYEE',
  JAO_BILLS:   'JAO_BILLS',
  JAO_CASH:    'JAO_CASH',
  AAO_CASH:    'AAO_CASH',
  AO_CASH:     'AO_CASH',
  PAY_OFFICER: 'PAY_OFFICER',
  FINANCE:     'FINANCE',
  ADMIN:       'ADMIN',
};

const USERS = [
  { id: 'U001', name: 'K. Praveen Kumar',  empId: '1073091', designation: 'Assistant Executive Engineer', role: ROLES.EMPLOYEE,    hq: 'VS, Vijayawada',              dept: 'IT Applications',    av: 'KP', phone: '' },
  { id: 'U002', name: 'T. Ramesh Kumar',   empId: '1073045', designation: 'Deputy Executive Engineer',   role: ROLES.JAO_BILLS,   hq: 'VS, Vijayawada',              dept: 'Finance & Accounts', av: 'TR', phone: '' },
  { id: 'U003', name: 'S. Lakshmi Devi',   empId: '1073012', designation: 'AAO (Other Bills)',           role: ROLES.AAO_CASH,    hq: 'Circle Office, Ongole',       dept: 'Finance & Accounts', av: 'SL', phone: '' },
  { id: 'U005', name: 'V. Srinivasan',     empId: 'JAO001',  designation: 'JAO (Cash) — F-53',          role: ROLES.JAO_CASH,    hq: 'Corporate Office, Hyderabad', dept: 'Cash Section',        av: 'VS', phone: '9848167287' },
  { id: 'U006', name: 'P. Malleswari',     empId: 'PO001',   designation: 'Pay Officer',                role: ROLES.PAY_OFFICER, hq: 'Corporate Office, Hyderabad', dept: 'Finance & Accounts', av: 'ML', phone: '9949635652' },
  { id: 'U007', name: 'Murthy',            empId: 'AO001',   designation: 'AO (Cash)',                  role: ROLES.AO_CASH,     hq: 'Corporate Office, Hyderabad', dept: 'Cash Section',        av: 'MU', phone: '' },
  { id: 'U008', name: 'Murthy (GM)',        empId: 'GM001',   designation: 'GM (Finance)',               role: ROLES.FINANCE,     hq: 'Corporate Office, Hyderabad', dept: 'Finance & Accounts', av: 'MG', phone: '9398417653' },
  { id: 'U004', name: 'Admin User',         empId: 'ADMIN01', designation: 'System Administrator',      role: ROLES.ADMIN,       hq: 'Corporate Office, Hyderabad', dept: 'IT Systems',          av: 'AU', phone: '' },
];

const ROLE_LABELS = {
  [ROLES.EMPLOYEE]:    'Employee — Submit & track TA bills',
  [ROLES.JAO_BILLS]:   'JAO (Other Bills) — Scrutiny, Pass Order & FV-60',
  [ROLES.JAO_CASH]:    'JAO (Cash) — LOC Process & F-53 Posting',
  [ROLES.AAO_CASH]:    'AAO (Cash) — Approve bills < ₹50,000',
  [ROLES.AO_CASH]:     'AO (Cash) — Approve bills ₹50,000 – ₹5,00,000',
  [ROLES.PAY_OFFICER]: 'Pay Officer — Payment oversight',
  [ROLES.FINANCE]:     'GM/CGM Finance — Overall view',
  [ROLES.ADMIN]:       'System Admin — Full access & audit logs',
};

const INIT_BILLS = [
  {
    id: 'B001', billNo: 'TA/2024/02/001',
    employeeId: 'U001', employeeName: 'K. Praveen Kumar', designation: 'Assistant Executive Engineer',
    empId: '1073091', pay: 94945, hq: 'VS, Vijayawada', dept: 'IT Applications',
    org: 'SE/O & M/VIZIANAGARAM', month: 'February', year: 2024,
    journeys: [
      { id: 'J1', dateFrom: '2024-02-26', dateTo: '2024-02-26', fromLoc: 'VS, Vijayawada', toLoc: 'Zonal Office, Vijayawada', purpose: 'To attend e-SR Functionality Awareness Programme at Zonal office', mode: 'Own Vehicle', distKm: 1.5, mileageAmt: 0, noDays: 0, daAmt: 0, railAmt: 0, roadConv: 0, total: 0, remarks: '' },
      { id: 'J2', dateFrom: '2024-02-26', dateTo: '2024-02-26', fromLoc: 'Zonal Office, Vijayawada', toLoc: 'VS, Vijayawada', purpose: 'Return journey', mode: 'Own Vehicle', distKm: 1.5, mileageAmt: 0, noDays: 0, daAmt: 0, railAmt: 0, roadConv: 0, total: 0, remarks: '' },
      { id: 'J3', dateFrom: '2024-02-27', dateTo: '2024-02-27', fromLoc: 'VS, Vijayawada', toLoc: 'Circle Office, Ongole', purpose: 'To attend e-SR Functionality Awareness Programme as per Lr.No.CE(Telecom & IT)/ACIDO(IT Application)/F.No.e-SR/D.No.22/2024 Dt:24/02/24', mode: 'Bus', distKm: 150, mileageAmt: 0, noDays: 1, daAmt: 400, railAmt: 760, roadConv: 0, total: 1160, remarks: '--' },
      { id: 'J4', dateFrom: '2024-02-27', dateTo: '2024-02-27', fromLoc: 'Circle Office, Ongole', toLoc: 'VS, Vijayawada', purpose: 'Return journey', mode: 'Bus', distKm: 150, mileageAmt: 0, noDays: 0, daAmt: 0, railAmt: 0, roadConv: 0, total: 0, remarks: '' },
    ],
    totalMileage: 0, totalDA: 400, totalRailway: 760, totalRoad: 0, grandTotal: 1160,
    certs: [true, true, true], status: 'fv60_posted',
    submittedAt: '2024-03-01T09:15:00Z', reviewedBy: 'U002', reviewedAt: '2024-03-02T10:30:00Z',
    approvedBy: 'U002', approvedAt: '2024-03-02T11:00:00Z', remarks: 'Pass order created. FV-60 posted.',
    passOrderNo: 'PO/2024/02/001', sapDocNo: 'SAP5100001234', inwardNo: 'IW/2024/0312',
  },
  {
    id: 'B002', billNo: 'TA/2024/03/001',
    employeeId: 'U001', employeeName: 'K. Praveen Kumar', designation: 'Assistant Executive Engineer',
    empId: '1073091', pay: 94945, hq: 'VS, Vijayawada', dept: 'IT Applications',
    org: 'SE/O & M/VIZIANAGARAM', month: 'March', year: 2024,
    journeys: [
      { id: 'J5', dateFrom: '2024-03-15', dateTo: '2024-03-15', fromLoc: 'VS, Vijayawada', toLoc: 'Vizianagaram', purpose: 'Site inspection of power infrastructure upgrades', mode: 'Bus', distKm: 180, mileageAmt: 0, noDays: 1, daAmt: 400, railAmt: 900, roadConv: 0, total: 1300, remarks: '' },
      { id: 'J6', dateFrom: '2024-03-15', dateTo: '2024-03-15', fromLoc: 'Vizianagaram', toLoc: 'VS, Vijayawada', purpose: 'Return journey', mode: 'Bus', distKm: 180, mileageAmt: 0, noDays: 0, daAmt: 0, railAmt: 0, roadConv: 0, total: 0, remarks: '' },
    ],
    totalMileage: 0, totalDA: 400, totalRailway: 900, totalRoad: 0, grandTotal: 1300,
    certs: [true, true, true], status: 'scrutiny',
    submittedAt: '2024-04-03T10:00:00Z', reviewedBy: 'U002', reviewedAt: '2024-04-04T09:00:00Z',
    approvedBy: null, approvedAt: null, remarks: '', inwardNo: 'IW/2024/0401',
  },
  {
    id: 'B003', billNo: 'TA/2024/04/002',
    employeeId: 'U001', employeeName: 'K. Praveen Kumar', designation: 'Assistant Executive Engineer',
    empId: '1073091', pay: 94945, hq: 'VS, Vijayawada', dept: 'IT Applications',
    org: 'SE/O & M/VIZIANAGARAM', month: 'April', year: 2024,
    journeys: [
      { id: 'J7', dateFrom: '2024-04-10', dateTo: '2024-04-11', fromLoc: 'VS, Vijayawada', toLoc: 'Hyderabad', purpose: 'Training: SAP ERP Module implementation workshop', mode: 'Rail', distKm: 440, mileageAmt: 0, noDays: 2, daAmt: 1000, railAmt: 2400, roadConv: 0, total: 3400, remarks: '2nd AC' },
      { id: 'J8', dateFrom: '2024-04-11', dateTo: '2024-04-11', fromLoc: 'Hyderabad', toLoc: 'VS, Vijayawada', purpose: 'Return journey', mode: 'Rail', distKm: 440, mileageAmt: 0, noDays: 0, daAmt: 0, railAmt: 2400, roadConv: 0, total: 2400, remarks: '2nd AC' },
    ],
    totalMileage: 0, totalDA: 1000, totalRailway: 4800, totalRoad: 0, grandTotal: 5800,
    certs: [true, true, true], status: 'pass_order',
    submittedAt: '2024-04-20T14:00:00Z', reviewedBy: 'U002', reviewedAt: '2024-04-21T09:00:00Z',
    approvedBy: null, approvedAt: null, remarks: '', passOrderNo: 'PO/2024/04/002', inwardNo: 'IW/2024/0418',
  },
  {
    id: 'B004', billNo: 'TA/2024/03/007',
    employeeId: 'U002', employeeName: 'T. Ramesh Kumar', designation: 'Deputy Executive Engineer',
    empId: '1073045', pay: 108000, hq: 'VS, Vijayawada', dept: 'IT Applications',
    org: 'SE/O & M/VIZIANAGARAM', month: 'March', year: 2024,
    journeys: [
      { id: 'J9', dateFrom: '2024-03-22', dateTo: '2024-03-22', fromLoc: 'VS, Vijayawada', toLoc: 'Tirupati', purpose: 'Official coordination meeting — Grid expansion project', mode: 'Own Vehicle', distKm: 220, mileageAmt: 1760, noDays: 1, daAmt: 500, railAmt: 0, roadConv: 0, total: 2260, remarks: '' },
    ],
    totalMileage: 1760, totalDA: 500, totalRailway: 0, totalRoad: 0, grandTotal: 2260,
    certs: [true, true, true], status: 'loc_processing',
    submittedAt: '2024-04-05T11:00:00Z', reviewedBy: 'U002', reviewedAt: '2024-04-06T10:00:00Z',
    approvedBy: 'U005', approvedAt: '2024-04-06T10:30:00Z', remarks: 'LOC initiated by JAO Cash.',
    passOrderNo: 'PO/2024/03/007', sapDocNo: 'SAP5100001200', inwardNo: 'IW/2024/0404',
  },
  {
    id: 'B005', billNo: 'TA/2024/04/009',
    employeeId: 'U001', employeeName: 'K. Praveen Kumar', designation: 'Assistant Executive Engineer',
    empId: '1073091', pay: 94945, hq: 'VS, Vijayawada', dept: 'IT Applications',
    org: 'SE/O & M/VIZIANAGARAM', month: 'April', year: 2024,
    journeys: [
      { id: 'J10', dateFrom: '2024-04-25', dateTo: '2024-04-25', fromLoc: 'VS, Vijayawada', toLoc: 'Nellore', purpose: 'IT infrastructure audit — Substation automation', mode: 'Bus', distKm: 160, mileageAmt: 0, noDays: 1, daAmt: 400, railAmt: 820, roadConv: 0, total: 1220, remarks: '' },
    ],
    totalMileage: 0, totalDA: 400, totalRailway: 820, totalRoad: 0, grandTotal: 1220,
    certs: [false, false, false], status: 'draft',
    submittedAt: null, reviewedBy: null, reviewedAt: null, approvedBy: null, approvedAt: null, remarks: '',
  },
];

const INIT_AUDIT = [
  { id: 'A001', billId: 'B001', billNo: 'TA/2024/02/001', action: 'created', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-02-28T08:30:00Z', details: 'Bill created as draft' },
  { id: 'A002', billId: 'B001', billNo: 'TA/2024/02/001', action: 'submitted', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-03-01T09:15:00Z', details: 'Bill submitted for approval. Grand Total: ₹1,160' },
  { id: 'A003', billId: 'B001', billNo: 'TA/2024/02/001', action: 'reviewed', userId: 'U002', userName: 'T. Ramesh Kumar', ts: '2024-03-02T10:30:00Z', details: 'Bill opened for review by DEE — moved to Under Review' },
  { id: 'A004', billId: 'B001', billNo: 'TA/2024/02/001', action: 'approved', userId: 'U002', userName: 'T. Ramesh Kumar', ts: '2024-03-02T11:00:00Z', details: 'Bill approved. Remarks: All documents verified.' },
  { id: 'A005', billId: 'B002', billNo: 'TA/2024/03/001', action: 'created', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-04-01T09:00:00Z', details: 'Bill created as draft' },
  { id: 'A006', billId: 'B002', billNo: 'TA/2024/03/001', action: 'submitted', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-04-03T10:00:00Z', details: 'Bill submitted for approval. Grand Total: ₹1,300' },
  { id: 'A007', billId: 'B003', billNo: 'TA/2024/04/002', action: 'submitted', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-04-20T14:00:00Z', details: 'Bill submitted for approval. Grand Total: ₹5,800' },
  { id: 'A008', billId: 'B003', billNo: 'TA/2024/04/002', action: 'reviewed', userId: 'U002', userName: 'T. Ramesh Kumar', ts: '2024-04-21T09:00:00Z', details: 'Bill opened for review — status changed to Under Review' },
  { id: 'A009', billId: 'B004', billNo: 'TA/2024/03/007', action: 'submitted', userId: 'U002', userName: 'T. Ramesh Kumar', ts: '2024-04-05T11:00:00Z', details: 'Bill submitted for approval. Grand Total: ₹2,260' },
  { id: 'A010', billId: 'B004', billNo: 'TA/2024/03/007', action: 'approved', userId: 'U004', userName: 'Admin User', ts: '2024-04-06T10:30:00Z', details: 'Bill approved by System Admin.' },
  { id: 'A011', billId: 'B005', billNo: 'TA/2024/04/009', action: 'created', userId: 'U001', userName: 'K. Praveen Kumar', ts: '2024-04-25T16:00:00Z', details: 'Bill created as draft — pending certifications' },
];

const fmtAmt = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const fmtDate = s => s ? new Date(s).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const fmtTs = s => s ? new Date(s).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

const STATUS = {
  draft:          { label: 'Draft',                bg: '#F3F4F6',  color: '#374151', border: '#D1D5DB' },
  submitted:      { label: 'Submitted',            bg: C.warningBg, color: C.warning, border: C.warningBorder },
  scrutiny:       { label: 'Under Scrutiny',       bg: '#FEF3C7',  color: '#92400E', border: '#FCD34D' },
  pass_order:     { label: 'Pass Order Created',   bg: C.infoBg,   color: C.info,    border: C.infoBorder },
  fv60_posted:    { label: 'FV-60 Posted (SAP)',   bg: '#F3E8FF',  color: '#7C3AED', border: '#C4B5FD' },
  cash_pending:   { label: 'Cash Section Pending', bg: '#CFFAFE',  color: '#0E7490', border: '#67E8F9' },
  aao_approved:   { label: 'AAO Approved',         bg: C.successBg, color: C.success, border: C.successBorder },
  ao_approved:    { label: 'AO Approved',          bg: '#D1FAE5',  color: '#065F46', border: '#6EE7B7' },
  loc_processing: { label: 'LOC Under Process',    bg: '#FEF9C3',  color: '#92400E', border: '#FDE68A' },
  f53_posted:     { label: 'F-53 Posted',          bg: '#DCFCE7',  color: '#15803D', border: '#86EFAC' },
  paid:           { label: 'Paid',                 bg: '#D1FAE5',  color: '#065F46', border: '#6EE7B7' },
  rejected:       { label: 'Rejected',             bg: C.dangerBg, color: C.danger,  border: C.dangerBorder },
};

const Badge = ({ status }) => {
  const s = STATUS[status] || STATUS.draft;
  return <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 20, letterSpacing: '0.03em' }}>{s.label}</span>;
};

const Avatar = ({ text, size = 34, bg = C.primaryMid, color = C.primary }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.35, fontWeight: 600, color, flexShrink: 0 }}>{text}</div>
);

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.EMPLOYEE);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!username || !password) { setErr('Please enter username and password'); return; }
    onLogin(USERS.find(u => u.role === role));
  };

  const inp = { width: '100%', padding: '10px 12px 10px 36px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Segoe UI, sans-serif', color: C.text };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#EEF2FF 0%,#F8FAFC 50%,#F0F9FF 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 4px 20px ${C.primary}55` }}>
        <User size={32} color="#fff" />
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: '0 0 4px', letterSpacing: '-0.3px' }}>TA Portal</h1>
      <p style={{ fontSize: 14, color: C.textSec, margin: '0 0 32px' }}>Tour Allowance Management System — APTRANSCO</p>

      <div style={{ background: '#fff', borderRadius: 16, padding: '32px 36px', width: 420, boxShadow: '0 4px 32px rgba(76,84,232,0.10)', border: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, margin: '0 0 24px' }}>Sign In</h2>
        {err && <div style={{ background: C.dangerBg, color: C.danger, padding: '8px 12px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>{err}</div>}

        {[
          { label: 'Username', icon: <User size={15} />, val: username, set: v => { setUsername(v); setErr(''); }, type: 'text', ph: 'Enter your username' },
          { label: 'Password', icon: <Shield size={15} />, val: password, set: v => { setPassword(v); setErr(''); }, type: 'password', ph: 'Enter your password' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 6 }}>{f.label}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: C.textMuted }}>{f.icon}</span>
              <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={inp} onKeyDown={e => e.key === 'Enter' && submit()} />
            </div>
          </div>
        ))}

        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: C.text, display: 'block', marginBottom: 6 }}>Select Your Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, outline: 'none', background: '#fff', fontFamily: 'Segoe UI, sans-serif', cursor: 'pointer', color: C.text }}>
            {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <button onClick={submit} style={{ ...btnPrimary, width: '100%', justifyContent: 'center', padding: '11px 16px', fontSize: 15 }}>
          Sign In →
        </button>
        <p style={{ textAlign: 'center', fontSize: 12, color: C.textMuted, margin: '14px 0 0' }}>Demo Mode: Use any username and password to login</p>
      </div>
      <p style={{ marginTop: 24, fontSize: 12, color: C.textDisabled }}>© 2024 APTRANSCO — Tour Allowance Management System</p>
    </div>
  );
}

function Sidebar({ user, page, onNav, onLogout }) {
  const isEmployee    = user.role === ROLES.EMPLOYEE;
  const isJAOBills    = user.role === ROLES.JAO_BILLS;
  const isJAOCash     = user.role === ROLES.JAO_CASH;
  const isCashApprover= [ROLES.AAO_CASH, ROLES.AO_CASH].includes(user.role);
  const canViewAll    = [ROLES.FINANCE, ROLES.ADMIN, ROLES.PAY_OFFICER].includes(user.role);
  const isAdmin       = user.role === ROLES.ADMIN;
  const financeSection= [ROLES.JAO_BILLS, ROLES.JAO_CASH, ROLES.AAO_CASH, ROLES.AO_CASH, ROLES.PAY_OFFICER, ROLES.FINANCE, ROLES.ADMIN].includes(user.role);

  const items = [
    { p: 'dashboard',    label: 'Dashboard',          Icon: LayoutDashboard },
    { p: 'submit',       label: 'Submit TA Bill',      Icon: Plus,        hide: !isEmployee },
    { p: 'mybills',      label: 'My Bills',            Icon: FileText,    hide: !isEmployee },
    { p: 'scrutiny',     label: 'Scrutiny Queue',      Icon: Inbox,       hide: !isJAOBills },
    { p: 'fv60',         label: 'FV-60 Posting (SAP)', Icon: CheckSquare, hide: !isJAOBills },
    { p: 'cash_queue',   label: 'Cash Section Queue',  Icon: Inbox,       hide: !(isJAOCash || isCashApprover) },
    { p: 'f53',          label: 'F-53 Posting (SAP)',  Icon: IndianRupee, hide: !isJAOCash },
    { p: 'allbills',     label: 'All Bills',           Icon: FileText,    hide: !canViewAll },
    { p: 'finance',      label: 'Payment Tracker',     Icon: BarChart3,   hide: !financeSection },
    { p: 'reports',      label: 'Reports',             Icon: BarChart3,   hide: !canViewAll },
    { p: 'team',         label: 'Team Directory',      Icon: Users,       hide: !financeSection },
    { p: 'auditlog',     label: 'Audit Log',           Icon: Activity,    hide: !isAdmin },
    { p: 'users',        label: 'User Management',     Icon: Users,       hide: !isAdmin },
  ].filter(i => !i.hide);

  return (
    <div style={{ width: 256, minHeight: '100vh', background: '#fff', borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, background: C.primary, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: '-0.3px' }}>APTRANSCO</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>Tour Allowance Portal</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '10px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textDisabled, letterSpacing: '0.09em', padding: '10px 8px 6px', textTransform: 'uppercase' }}>Tour Allowance</div>
        {items.map(({ p, label, Icon }) => {
          const active = page === p;
          return (
            <button key={p} onClick={() => onNav(p)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active ? C.primaryLight : 'transparent', color: active ? C.primary : C.textSec, fontSize: 14, fontWeight: active ? 600 : 400, marginBottom: 2, textAlign: 'left', fontFamily: 'Segoe UI, sans-serif' }}>
              <Icon size={18} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={14} />}
            </button>
          );
        })}
      </div>

      <div style={{ padding: '14px 14px 16px', borderTop: `1px solid ${C.border}` }}>
        <button onClick={onLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '7px 12px', border: `1px solid ${C.border}`, borderRadius: 8, background: '#fff', color: C.textSec, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Segoe UI, sans-serif' }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

function TopBar({ user, page, onLogout, pendingCount }) {
  const TITLES = {
    dashboard: 'Dashboard', submit: 'Submit TA Bill', mybills: 'My Bills',
    scrutiny: 'Scrutiny Queue — JAO (Other Bills)', fv60: 'FV-60 Posting — SAP Entry',
    cash_queue: 'Cash Section Queue', f53: 'F-53 Posting — SAP Payment',
    allbills: 'All Bills', finance: 'Payment Tracker',
    finance_payment: 'Post Vendor Invoice — FV-60', f53_form: 'Post Payment — F-53',
    reports: 'Reports', auditlog: 'Audit Log', users: 'User Management', team: 'Team Directory',
  };
  return (
    <div style={{ height: 60, background: '#fff', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 24px 0 20px', position: 'fixed', top: 0, left: 256, right: 0, zIndex: 99, fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.text, letterSpacing: '-0.2px' }}>{TITLES[page] || 'Dashboard'}</div>
        <div style={{ fontSize: 12, color: C.textMuted }}>APTRANSCO — Tour Allowance Management System</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color={C.textMuted} />
          {pendingCount > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: C.danger, color: '#fff', fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pendingCount}</span>}
        </div>
        <div style={{ width: 1, height: 28, background: C.border }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar text={user.av} />
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{user.name.split(' ').slice(0, 2).join(' ')}</div>
            <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, bills, onNav }) {
  const isEmp = user.role === ROLES.EMPLOYEE;
  const scopedBills = isEmp ? bills.filter(b => b.employeeId === user.id) : bills;
  const paid = scopedBills.filter(b => ['f53_posted', 'paid'].includes(b.status));
  const totalPaid = paid.reduce((s, b) => s + b.grandTotal, 0);
  const myDrafts = bills.filter(b => b.employeeId === user.id && b.status === 'draft');

  const scrutinyQueue = bills.filter(b => b.status === 'submitted');
  const passOrderQueue = bills.filter(b => b.status === 'scrutiny');
  const fv60Queue     = bills.filter(b => b.status === 'pass_order');
  const cashQueue     = bills.filter(b => ['fv60_posted', 'cash_pending'].includes(b.status));
  const locQueue      = bills.filter(b => b.status === 'loc_processing');
  const approvalQueue = bills.filter(b => ['fv60_posted', 'cash_pending'].includes(b.status));

  const metrics = [
    { label: isEmp ? 'My Bills' : 'Total Bills', val: scopedBills.length, Icon: FileText, c: C.primary, bg: C.primaryLight },
    { label: isEmp ? 'In Progress' : 'Pending Processing', val: isEmp ? scopedBills.filter(b => !['draft','paid','f53_posted','rejected'].includes(b.status)).length : scrutinyQueue.length + fv60Queue.length, Icon: Clock, c: C.warning, bg: C.warningBg },
    { label: isEmp ? 'Paid Bills' : 'LOC Processing', val: isEmp ? paid.length : locQueue.length, Icon: CheckCircle, c: C.success, bg: C.successBg },
    { label: isEmp ? 'Total Paid Amt' : 'Total Paid Amt', val: fmtAmt(totalPaid), Icon: IndianRupee, c: '#B45309', bg: '#FEF3C7' },
  ];

  const actions = [
    ...(myDrafts.length > 0 ? [{ txt: `${myDrafts.length} draft bill(s) not yet submitted`, pri: 'High', nav: 'submit', due: 'Submit before month-end' }] : []),
    ...(user.role === ROLES.JAO_BILLS && scrutinyQueue.length > 0 ? [{ txt: `${scrutinyQueue.length} bill(s) received — pending scrutiny & Pass Order`, pri: 'High', nav: 'scrutiny', due: 'Verify bill, correct amounts if needed, create Pass Order' }] : []),
    ...(user.role === ROLES.JAO_BILLS && fv60Queue.length > 0 ? [{ txt: `${fv60Queue.length} bill(s) with Pass Order — pending FV-60 SAP entry`, pri: 'High', nav: 'fv60', due: 'Post FV-60 in SAP against Employee ID' }] : []),
    ...(user.role === ROLES.JAO_CASH && cashQueue.length > 0 ? [{ txt: `${cashQueue.length} bill(s) received from Bills Section — initiate LOC`, pri: 'High', nav: 'cash_queue', due: 'Initiate Letter of Credit (LOC) for payment processing' }] : []),
    ...(user.role === ROLES.JAO_CASH && locQueue.length > 0 ? [{ txt: `${locQueue.length} bill(s) LOC approved — post F-53 in SAP`, pri: 'High', nav: 'f53', due: 'Post payment in SAP using T-Code F-53' }] : []),
    ...([ROLES.AAO_CASH, ROLES.AO_CASH].includes(user.role) && approvalQueue.filter(b => user.role === ROLES.AAO_CASH ? b.grandTotal < 50000 : b.grandTotal >= 50000).length > 0 ? [{
      txt: `${approvalQueue.filter(b => user.role === ROLES.AAO_CASH ? b.grandTotal < 50000 : b.grandTotal >= 50000).length} bill(s) pending your approval`,
      pri: 'High', nav: 'cash_queue',
      due: user.role === ROLES.AAO_CASH ? 'Bills below ₹50,000 require AAO approval' : 'Bills ₹50,000–₹5,00,000 require AO approval',
    }] : []),
  ];

  const recentBills = [...scopedBills].sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0)).slice(0, 8);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <m.Icon size={22} color={m.c} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{m.val}</div>
              <div style={{ fontSize: 12, color: C.textSec, marginTop: 1 }}>{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
        <div style={card}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Pending Actions</h3>
          {actions.length === 0
            ? <div style={{ textAlign: 'center', padding: '24px 0', color: C.textMuted }}><CheckCircle size={28} style={{ opacity: 0.35, display: 'block', margin: '0 auto 8px' }} /><p style={{ margin: 0, fontSize: 14 }}>All caught up! No pending actions.</p></div>
            : actions.map((a, i) => (
              <div key={i} onClick={() => onNav(a.nav)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                <AlertTriangle size={18} color={a.pri === 'High' ? C.danger : C.warning} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: C.text }}>{a.txt}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{a.due}</div>
                </div>
                <span style={{ background: a.pri === 'High' ? C.dangerBg : C.warningBg, color: a.pri === 'High' ? C.danger : C.warning, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, flexShrink: 0 }}>{a.pri}</span>
              </div>
            ))
          }

          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '20px 0 12px' }}>Recent Bills</h3>
          {recentBills.length === 0
            ? <div style={{ fontSize: 13, color: C.textMuted, padding: '12px 0' }}>No bills submitted yet.</div>
            : recentBills.map(b => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                <FileText size={15} color={C.textMuted} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{b.billNo}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{b.month} {b.year} · {fmtAmt(b.grandTotal)}</div>
                </div>
                <Badge status={b.status} />
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MODES = ['Own Vehicle','Bus','Rail','Auto','Boat','Air'];
const mkJourney = () => ({ id: 'J' + Date.now(), dateFrom: '', dateTo: '', fromLoc: '', toLoc: '', purpose: '', mode: 'Bus', distKm: '', mileageRate: '', mileageAmt: 0, noDays: '', daRate: '', daAmt: 0, railClass: '', railAmt: '', roadConv: '', total: 0, remarks: '' });

function SubmitBillPage({ user, onSubmit }) {
  const [step, setStep] = useState(1);
  const [hdr, setHdr] = useState({ name: user.name, empId: user.empId, designation: user.designation, pay: user.role === ROLES.EMPLOYEE ? '94945' : '', hq: user.hq, org: 'SE/O & M/VIZIANAGARAM', month: MONTHS[new Date().getMonth() > 0 ? new Date().getMonth() - 1 : 11], year: String(new Date().getFullYear()) });
  const [journeys, setJourneys] = useState([mkJourney()]);
  const [certs, setCerts] = useState([false, false, false]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const totals = { mileage: journeys.reduce((s, j) => s + (+j.mileageAmt || 0), 0), da: journeys.reduce((s, j) => s + (+j.daAmt || 0), 0), rail: journeys.reduce((s, j) => s + (+j.railAmt || 0), 0), road: journeys.reduce((s, j) => s + (+j.roadConv || 0), 0) };
  totals.grand = totals.mileage + totals.da + totals.rail + totals.road;

  const upd = (id, f, v) => setJourneys(js => js.map(j => {
    if (j.id !== id) return j;
    const u = { ...j, [f]: v };
    if (f === 'mileageRate' || f === 'distKm') u.mileageAmt = (+u.distKm || 0) * (+u.mileageRate || 0);
    if (f === 'noDays' || f === 'daRate') u.daAmt = (+u.noDays || 0) * (+u.daRate || 0);
    u.total = (+u.mileageAmt || 0) + (+u.daAmt || 0) + (+u.railAmt || 0) + (+u.roadConv || 0);
    return u;
  }));

  const L = { fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 4, display: 'block' };
  const I = { width: '100%', padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Segoe UI, sans-serif', color: C.text };
  const IR = { ...I, background: C.bg, color: C.textMuted };

  if (done) return (
    <div style={{ textAlign: 'center', padding: '80px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <CheckCircle size={32} color={C.success} />
      </div>
      <h2 style={{ color: C.text, margin: '0 0 8px' }}>Bill Submitted Successfully!</h2>
      <p style={{ color: C.textSec, margin: '0 0 24px' }}>Your TA bill has been submitted for supervisor approval. You will be notified once reviewed.</p>
      <button onClick={() => { setDone(false); setStep(1); setJourneys([mkJourney()]); setCerts([false, false, false]); }} style={btnSecondary}>Submit Another Bill</button>
    </div>
  );

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', maxWidth: 1060 }}>
      <div style={{ display: 'flex', marginBottom: 24, background: '#fff', borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {['Bill Header', 'Journey Details', 'Certify & Submit'].map((s, i) => (
          <div key={i} onClick={() => i < step - 1 && setStep(i + 1)} style={{ flex: 1, padding: '12px 16px', textAlign: 'center', cursor: i < step - 1 ? 'pointer' : 'default', background: step === i + 1 ? C.primary : step > i + 1 ? C.successBg : '#fff', color: step === i + 1 ? '#fff' : step > i + 1 ? C.success : C.textMuted, fontSize: 13, fontWeight: step === i + 1 ? 600 : 400, borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            {step > i + 1 ? '✓ ' : `${i + 1}. `}{s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ width: 32, height: 32, background: C.primaryLight, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} color={C.primary} /></div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>A.P.T.C. FORM - 52</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>Subsidiary Rule 16(a) Under Treasury Rule (6) — Travelling Allowance Bill for Non-Gazetted Establishment</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[{ l: 'Employee Name', f: 'name' }, { l: 'Employee ID', f: 'empId' }, { l: 'Designation', f: 'designation' }, { l: 'Basic Pay (₹)', f: 'pay' }, { l: 'Headquarters', f: 'hq' }, { l: 'Organisation', f: 'org' }].map(({ l, f }) => (
              <div key={f}><label style={L}>{l}</label><input value={hdr[f]} onChange={e => setHdr({ ...hdr, [f]: e.target.value })} style={I} /></div>
            ))}
            <div><label style={L}>Month</label><select value={hdr.month} onChange={e => setHdr({ ...hdr, month: e.target.value })} style={{ ...I, cursor: 'pointer' }}>{MONTHS.map(m => <option key={m}>{m}</option>)}</select></div>
            <div><label style={L}>Year</label><select value={hdr.year} onChange={e => setHdr({ ...hdr, year: e.target.value })} style={{ ...I, cursor: 'pointer' }}>{[2024, 2025, 2026].map(y => <option key={y}>{y}</option>)}</select></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button onClick={() => setStep(2)} style={btnPrimary}>Next: Journey Details →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div><h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: C.text }}>Journey Details</h3><p style={{ margin: '2px 0 0', fontSize: 12, color: C.textMuted }}>Add one row per journey leg (outward + return separately)</p></div>
            <button onClick={() => setJourneys([...journeys, mkJourney()])} style={btnSecondary}><Plus size={14} /> Add Journey Row</button>
          </div>

          {journeys.map((j, idx) => (
            <div key={j.id} style={{ ...card, marginBottom: 14, borderLeft: `3px solid ${C.primary}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>Journey #{idx + 1}</span>
                {journeys.length > 1 && <button onClick={() => setJourneys(journeys.filter(jj => jj.id !== j.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.danger, padding: 2 }}><X size={15} /></button>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div><label style={L}>Date From</label><input type="date" value={j.dateFrom} onChange={e => upd(j.id, 'dateFrom', e.target.value)} style={I} /></div>
                <div><label style={L}>Date To</label><input type="date" value={j.dateTo} onChange={e => upd(j.id, 'dateTo', e.target.value)} style={I} /></div>
                <div><label style={L}>From Location</label><input value={j.fromLoc} onChange={e => upd(j.id, 'fromLoc', e.target.value)} style={I} placeholder="Departure" /></div>
                <div><label style={L}>To Location</label><input value={j.toLoc} onChange={e => upd(j.id, 'toLoc', e.target.value)} style={I} placeholder="Destination" /></div>
              </div>
              <div style={{ marginBottom: 10 }}><label style={L}>Purpose of Journey / Order Reference</label><input value={j.purpose} onChange={e => upd(j.id, 'purpose', e.target.value)} style={{ ...I, width: '100%' }} placeholder="Official purpose and reference order number..." /></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 8 }}>
                <div><label style={L}>Mode</label><select value={j.mode} onChange={e => upd(j.id, 'mode', e.target.value)} style={{ ...I, cursor: 'pointer' }}>{MODES.map(m => <option key={m}>{m}</option>)}</select></div>
                <div><label style={L}>KM</label><input type="number" value={j.distKm} onChange={e => upd(j.id, 'distKm', e.target.value)} style={I} placeholder="0" /></div>
                <div><label style={L}>Mile. Rate</label><input type="number" value={j.mileageRate} onChange={e => upd(j.id, 'mileageRate', e.target.value)} style={I} placeholder="₹/km" /></div>
                <div><label style={L}>Mile. Amt ₹</label><input readOnly value={j.mileageAmt || 0} style={IR} /></div>
                <div><label style={L}>DA Days</label><input type="number" value={j.noDays} onChange={e => upd(j.id, 'noDays', e.target.value)} style={I} placeholder="0" /></div>
                <div><label style={L}>DA Rate ₹</label><input type="number" value={j.daRate} onChange={e => upd(j.id, 'daRate', e.target.value)} style={I} placeholder="0" /></div>
                <div><label style={L}>DA Amount ₹</label><input readOnly value={j.daAmt || 0} style={IR} /></div>
                <div><label style={L}>Rail/Road ₹</label><input type="number" value={j.railAmt} onChange={e => upd(j.id, 'railAmt', e.target.value)} style={I} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 10, marginTop: 10 }}>
                <div><label style={L}>Railway Class / Conveyance Type</label><input value={j.railClass} onChange={e => upd(j.id, 'railClass', e.target.value)} style={I} placeholder="e.g. 2nd AC, AC Bus" /></div>
                <div><label style={L}>Road Conv. ₹</label><input type="number" value={j.roadConv} onChange={e => upd(j.id, 'roadConv', e.target.value)} style={I} /></div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}><div style={{ flex: 1 }}><label style={L}>Line Total ₹</label><input readOnly value={j.total || 0} style={{ ...IR, fontWeight: 700, color: C.primary, background: C.primaryLight, border: `1px solid ${C.infoBorder}` }} /></div></div>
              </div>
              <div style={{ marginTop: 10 }}><label style={L}>Remarks</label><input value={j.remarks} onChange={e => upd(j.id, 'remarks', e.target.value)} style={I} placeholder="Optional" /></div>
            </div>
          ))}

          <div style={{ ...card, background: C.primaryLight, border: `1px solid ${C.infoBorder}` }}>
            <h4 style={{ margin: '0 0 14px', color: C.info, fontSize: 14 }}>Allowance Summary — A.P.T.C. Form 52</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
              {[['Mileage', totals.mileage], ['Daily Allowance', totals.da], ['Railway / Road Fare', totals.rail], ['Road Conveyance', totals.road], ['Grand Total', totals.grand, true]].map(([l, v, hi]) => (
                <div key={l} style={{ background: hi ? C.primary : '#fff', padding: '12px 14px', borderRadius: 8, textAlign: 'center', border: `1px solid ${hi ? 'transparent' : C.infoBorder}` }}>
                  <div style={{ fontSize: 11, color: hi ? 'rgba(255,255,255,0.8)' : C.textMuted, marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: hi ? '#fff' : C.text }}>{fmtAmt(v)}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <button onClick={() => setStep(1)} style={btnSecondary}><ArrowLeft size={14} /> Back</button>
            <button onClick={() => setStep(3)} style={btnPrimary}>Review & Certify →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={card}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Review Bill Before Submission</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 20 }}>
              {[['Employee', hdr.name], ['Employee ID', hdr.empId], ['Designation', hdr.designation], ['Basic Pay', fmtAmt(hdr.pay)], ['Headquarters', hdr.hq], ['Period', `${hdr.month} ${hdr.year}`], ['Journeys', journeys.length], ['Grand Total', fmtAmt(totals.grand)]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 8, padding: '10px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                  <span style={{ width: 130, fontSize: 13, color: C.textMuted, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: k === 'Grand Total' ? C.success : C.text }}>{v}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 600, color: C.textSec, margin: '0 0 12px' }}>Mandatory Certifications</h4>
            {['Certified that this TA bill was not claimed and paid before', 'Certified that I have not taken any tour advance for this month', 'Certified that all journeys were performed exclusively in the interest of APTRANSCO works only'].map((txt, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={certs[i]} onChange={e => { const c = [...certs]; c[i] = e.target.checked; setCerts(c); }} style={{ marginTop: 2, accentColor: C.primary, width: 15, height: 15 }} />
                <span style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{txt}</span>
              </label>
            ))}

            {!certs.every(Boolean) && (
              <div style={{ background: C.warningBg, border: `1px solid ${C.warningBorder}`, color: C.warning, padding: '10px 14px', borderRadius: 8, fontSize: 13, marginTop: 8 }}>
                ⚠ Please accept all three certifications before submitting this bill.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <button onClick={() => setStep(2)} style={btnSecondary}><ArrowLeft size={14} /> Back</button>
            <button onClick={() => { if (!certs.every(Boolean)) return; setBusy(true); setTimeout(() => { onSubmit({ ...hdr, journeys, totals, certs }); setBusy(false); setDone(true); }, 600); }} disabled={!certs.every(Boolean) || busy} style={{ ...btnPrimary, opacity: certs.every(Boolean) ? 1 : 0.45 }}>
              <CheckSquare size={15} /> {busy ? 'Submitting…' : 'Submit Bill for Approval'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BillsTable({ bills, currentUser, onView }) {
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('all');

  const filtered = bills.filter(b =>
    (q === '' || b.billNo.toLowerCase().includes(q.toLowerCase()) || b.employeeName.toLowerCase().includes(q.toLowerCase())) &&
    (sf === 'all' || b.status === sf)
  );

  const TH = { fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 14px', textAlign: 'left', background: C.bg, borderBottom: `1px solid ${C.border}` };
  const TD = { padding: '12px 14px', fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}`, verticalAlign: 'middle' };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textMuted }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by bill number or employee…" style={{ width: '100%', padding: '9px 10px 9px 32px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Segoe UI, sans-serif' }} />
        </div>
        <select value={sf} onChange={e => setSf(e.target.value)} style={{ padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', cursor: 'pointer', color: C.text, background: '#fff' }}>
          <option value="all">All Status</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Bill No.', 'Employee', 'Period', 'Journeys', 'Amount', 'Status', 'Submitted', 'Action'].map(h => <th key={h} style={TH}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={8} style={{ ...TD, textAlign: 'center', padding: '48px', color: C.textMuted }}>No bills match your filter.</td></tr>
              : filtered.map(b => (
                <tr key={b.id}>
                  <td style={TD}><span style={{ fontWeight: 600, color: C.primary }}>{b.billNo}</span></td>
                  <td style={TD}><div style={{ fontWeight: 500 }}>{b.employeeName}</div><div style={{ fontSize: 11, color: C.textMuted }}>{b.designation}</div></td>
                  <td style={TD}>{b.month} {b.year}</td>
                  <td style={{ ...TD, textAlign: 'center' }}>{b.journeys.length}</td>
                  <td style={{ ...TD, fontWeight: 700 }}>{fmtAmt(b.grandTotal)}</td>
                  <td style={TD}><Badge status={b.status} /></td>
                  <td style={{ ...TD, color: C.textMuted }}>{fmtDate(b.submittedAt)}</td>
                  <td style={TD}><button onClick={() => onView(b)} style={{ ...btnSecondary, padding: '5px 10px', fontSize: 12 }}><Eye size={13} /> View</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: C.textMuted }}>{filtered.length} of {bills.length} bill(s)</div>
    </div>
  );
}

const PROCESS_STEPS = [
  { key: 'submitted',      label: 'Bill Submitted',         who: 'Employee' },
  { key: 'scrutiny',       label: 'Under Scrutiny',         who: 'JAO (Bills)' },
  { key: 'pass_order',     label: 'Pass Order Created',     who: 'JAO (Bills)' },
  { key: 'fv60_posted',    label: 'FV-60 Posted in SAP',    who: 'AAO (Bills)' },
  { key: 'cash_pending',   label: 'Cash Section Received',  who: 'JAO (Cash)' },
  { key: 'loc_processing', label: 'LOC Initiated',          who: 'JAO (Cash)' },
  { key: 'aao_approved',   label: 'AAO Approved (<50k)',     who: 'AAO (Cash)' },
  { key: 'ao_approved',    label: 'AO Approved (>50k)',      who: 'AO (Cash)' },
  { key: 'f53_posted',     label: 'F-53 Posted — Payment',  who: 'JAO (Cash)' },
];

function ProcessTimeline({ bill }) {
  const ORDER = ['submitted','scrutiny','pass_order','fv60_posted','cash_pending','loc_processing',
                 bill && bill.grandTotal < 50000 ? 'aao_approved' : 'ao_approved','f53_posted'];
  const cur = ORDER.indexOf(bill.status);
  return (
    <div style={{ marginBottom: 16, padding: '16px 20px', background: '#F8FAFF', border: `1px solid ${C.infoBorder}`, borderRadius: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>Process Flow</div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 4 }}>
        {ORDER.map((key, i) => {
          const step = PROCESS_STEPS.find(s => s.key === key) || { label: key, who: '' };
          const done = cur > i;
          const active = cur === i;
          const rejected = bill.status === 'rejected';
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center', width: 90 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', margin: '0 auto 6px',
                  background: done ? C.success : active ? (rejected ? C.danger : C.primary) : C.borderLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${done ? C.success : active ? (rejected ? C.danger : C.primary) : C.border}` }}>
                  {done ? <CheckCircle size={14} color="#fff" /> : <span style={{ fontSize: 10, fontWeight: 700, color: active ? '#fff' : C.textMuted }}>{i + 1}</span>}
                </div>
                <div style={{ fontSize: 10, color: active ? C.primary : done ? C.success : C.textMuted, fontWeight: active || done ? 600 : 400, lineHeight: 1.3 }}>{step.label}</div>
                <div style={{ fontSize: 9, color: C.textDisabled, marginTop: 2 }}>{step.who}</div>
              </div>
              {i < ORDER.length - 1 && <div style={{ width: 20, height: 2, background: done ? C.success : C.borderLight, flexShrink: 0, marginBottom: 18 }} />}
            </div>
          );
        })}
      </div>
      {bill.passOrderNo && <div style={{ marginTop: 10, fontSize: 12, color: C.textSec }}>Pass Order: <strong>{bill.passOrderNo}</strong>{bill.sapDocNo && <> &nbsp;·&nbsp; SAP Doc: <strong>{bill.sapDocNo}</strong></>}{bill.inwardNo && <> &nbsp;·&nbsp; Inward No: <strong>{bill.inwardNo}</strong></>}</div>}
    </div>
  );
}

function BillDetail({ bill, currentUser, onClose, onApprove, onReject, onPassOrder, onFV60, onCashReceive, onLOC, onCashApprove, onF53 }) {
  const [rejectReason, setRejectReason] = useState('');
  const [rejectMode, setRejectMode] = useState(false);
  const [passOrderNo, setPassOrderNo] = useState('');
  const [inwardNo, setInwardNo] = useState(bill.inwardNo || '');

  const canScrutiny   = currentUser.role === ROLES.JAO_BILLS && bill.status === 'submitted';
  const canPassOrder  = currentUser.role === ROLES.JAO_BILLS && bill.status === 'scrutiny';
  const canFV60       = currentUser.role === ROLES.JAO_BILLS && bill.status === 'pass_order';
  const canCashRcv    = currentUser.role === ROLES.JAO_CASH  && bill.status === 'fv60_posted';
  const canLOC        = currentUser.role === ROLES.JAO_CASH  && bill.status === 'cash_pending';
  const canAct = (currentUser.role === ROLES.ADMIN && ['submitted','scrutiny'].includes(bill.status)) ||
                 (currentUser.role === ROLES.AAO_CASH && ['cash_pending','fv60_posted'].includes(bill.status) && bill.grandTotal < 50000) ||
                 (currentUser.role === ROLES.AO_CASH  && ['cash_pending','fv60_posted'].includes(bill.status) && bill.grandTotal >= 50000);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.45)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ width: 680, background: '#fff', height: '100%', overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.text }}>{bill.billNo}</h2>
              <Badge status={bill.status} />
            </div>
            <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textMuted }}>A.P.T.C. Form 52 — Travelling Allowance Bill for Non-Gazetted Establishment</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: C.textMuted }}><X size={20} /></button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <ProcessTimeline bill={bill} />
          <div style={{ ...card, marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Employee Details</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Name', bill.employeeName], ['Employee ID', bill.empId], ['Designation', bill.designation], ['Basic Pay', fmtAmt(bill.pay)], ['Headquarters', bill.hq], ['Period', `${bill.month} ${bill.year}`], ['Organisation', bill.org], ['Department', bill.dept]].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>{k}</div><div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{v}</div></div>
              ))}
            </div>
          </div>

          <div style={{ ...card, marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Journey Details ({bill.journeys.length} legs)</h4>
            {bill.journeys.map((j, i) => (
              <div key={j.id} style={{ padding: '14px 0', borderBottom: i < bill.journeys.length - 1 ? `1px solid ${C.borderLight}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.primary, background: C.primaryLight, padding: '2px 8px', borderRadius: 4 }}>Leg {i + 1}</span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{j.dateFrom === j.dateTo ? j.dateFrom : `${j.dateFrom} → ${j.dateTo}`}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={13} color={C.textMuted} />{j.fromLoc} → {j.toLoc}
                </div>
                {j.purpose && <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8, lineHeight: 1.5 }}>{j.purpose}</div>}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                  {[['Mode', j.mode], ['Distance', j.distKm ? `${j.distKm} km` : '—'], ['DA', fmtAmt(j.daAmt)], ['Rail/Road', fmtAmt(j.railAmt)], ['Line Total', fmtAmt(j.total)]].map(([k, v]) => (
                    <div key={k}><span style={{ fontSize: 11, color: C.textMuted }}>{k} </span><span style={{ fontSize: 13, fontWeight: 600, color: k === 'Line Total' ? C.primary : C.text }}>{v}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ ...card, background: C.primaryLight, border: `1px solid ${C.infoBorder}`, marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: C.info, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Financial Summary</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 12 }}>
              {[['Mileage', bill.totalMileage], ['Daily Allowance', bill.totalDA], ['Rail / Road Fare', bill.totalRailway], ['Road Conveyance', bill.totalRoad]].map(([k, v]) => (
                <div key={k} style={{ background: '#fff', padding: '10px', borderRadius: 8, border: `1px solid ${C.infoBorder}`, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{fmtAmt(v)}</div>
                </div>
              ))}
            </div>
            <div style={{ background: C.primary, borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Grand Total Claimed</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: '#fff' }}>{fmtAmt(bill.grandTotal)}</div>
            </div>
          </div>

          <div style={{ ...card, marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Approval Trail</h4>
            {[
              bill.submittedAt && { label: 'Submitted', by: bill.employeeName, at: bill.submittedAt, c: C.warning },
              bill.reviewedAt && { label: 'Under Review', by: USERS.find(u => u.id === bill.reviewedBy)?.name || '', at: bill.reviewedAt, c: C.info },
              bill.approvedAt && { label: bill.status === 'rejected' ? 'Rejected' : STATUS[bill.status]?.label || 'Approved', by: USERS.find(u => u.id === bill.approvedBy)?.name || '', at: bill.approvedAt, c: bill.status === 'rejected' ? C.danger : C.success },
            ].filter(Boolean).map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: t.c, flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.label}</span>
                  <span style={{ fontSize: 12, color: C.textMuted }}> by {t.by}</span>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{fmtTs(t.at)}</div>
                </div>
              </div>
            ))}
            {bill.remarks && <div style={{ marginTop: 8, padding: '8px 12px', background: C.bg, borderRadius: 6, fontSize: 13, color: C.textSec, fontStyle: 'italic' }}>"{bill.remarks}"</div>}
          </div>

          {canScrutiny && (
            <div style={{ ...card, border: `2px solid ${C.infoBorder}`, marginBottom: 12 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: C.info, textTransform: 'uppercase' }}>Step 1 — Scrutiny</h4>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textSec }}>Review the bill. Modify amounts if corrections are required, then mark as under scrutiny.</p>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 4 }}>Inward Number</label>
                <input value={inwardNo} onChange={e => setInwardNo(e.target.value)} placeholder="e.g. IW/2024/0312" style={{ padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', width: 240, boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => onPassOrder && onPassOrder(bill.id, 'scrutiny', inwardNo)} style={{ ...btn(C.infoBg, C.info, C.infoBorder), justifyContent: 'center' }}>
                <CheckSquare size={15} /> Mark as Under Scrutiny
              </button>
            </div>
          )}
          {canPassOrder && (
            <div style={{ ...card, border: `2px solid ${C.infoBorder}`, marginBottom: 12 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: C.info, textTransform: 'uppercase' }}>Step 2 — Create Pass Order</h4>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textSec }}>Scrutiny complete. Generate Pass Order number to proceed to FV-60 SAP entry.</p>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.textSec, display: 'block', marginBottom: 4 }}>Pass Order Number</label>
                <input value={passOrderNo} onChange={e => setPassOrderNo(e.target.value)} placeholder="e.g. PO/2024/04/001" style={{ padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', width: 260, boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => passOrderNo.trim() && onPassOrder && onPassOrder(bill.id, 'pass_order', inwardNo, passOrderNo)} disabled={!passOrderNo.trim()} style={{ ...btnPrimary, opacity: passOrderNo.trim() ? 1 : 0.45 }}>
                  <CheckCircle size={15} /> Create Pass Order
                </button>
                {!rejectMode
                  ? <button onClick={() => setRejectMode(true)} style={btnDanger}><XCircle size={14} /> Reject</button>
                  : <div style={{ display: 'flex', gap: 8, flex: 1 }}>
                      <input value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="Rejection reason…" style={{ flex: 1, padding: '8px 10px', border: `1px solid ${C.dangerBorder}`, borderRadius: 6, fontSize: 13, outline: 'none' }} />
                      <button onClick={() => rejectReason.trim() && onReject(bill.id, rejectReason)} style={{ ...btnDanger, opacity: rejectReason.trim() ? 1 : 0.45 }}>Confirm</button>
                      <button onClick={() => setRejectMode(false)} style={btnSecondary}>Cancel</button>
                    </div>
                }
              </div>
            </div>
          )}
          {canFV60 && (
            <div style={{ ...card, border: `2px solid #C4B5FD`, marginBottom: 12 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase' }}>Step 3 — FV-60 SAP Entry</h4>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textSec }}>Pass Order: <strong>{bill.passOrderNo}</strong> · Amount: <strong>{fmtAmt(bill.grandTotal)}</strong></p>
              <button onClick={() => onFV60 && onFV60(bill)} style={{ ...btn('#F3E8FF', '#7C3AED', '#C4B5FD') }}>
                <IndianRupee size={15} /> Open FV-60 Form (SAP Entry)
              </button>
            </div>
          )}
          {canCashRcv && (
            <div style={{ ...card, border: `2px solid #67E8F9`, marginBottom: 12 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: '#0E7490', textTransform: 'uppercase' }}>Cash Section — Receive Bill</h4>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textSec }}>SAP Doc: <strong>{bill.sapDocNo || '—'}</strong> · Amount: <strong>{fmtAmt(bill.grandTotal)}</strong></p>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: C.textMuted }}>
                {bill.grandTotal < 50000 ? 'Below ₹50,000 — requires AAO approval' : 'Above ₹50,000 — requires AO approval'}
              </p>
              <button onClick={() => onCashReceive && onCashReceive(bill.id)} style={{ ...btn('#CFFAFE', '#0E7490', '#67E8F9') }}>
                <Inbox size={15} /> Acknowledge Receipt — Initiate LOC
              </button>
            </div>
          )}
          {canLOC && (
            <div style={{ ...card, border: `2px solid ${C.warningBorder}`, marginBottom: 12 }}>
              <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 700, color: C.warning, textTransform: 'uppercase' }}>Initiate LOC Process</h4>
              <p style={{ margin: '0 0 12px', fontSize: 13, color: C.textSec }}>Process B&R Check / LOC for offline payment to bank.</p>
              <button onClick={() => onLOC && onLOC(bill.id)} style={{ ...btn(C.warningBg, C.warning, C.warningBorder) }}>
                <Activity size={15} /> Initiate LOC (Letter of Credit)
              </button>
            </div>
          )}
          {canAct && (
            <div style={{ ...card, border: `2px solid ${C.infoBorder}` }}>
              <h4 style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 700, color: C.info, textTransform: 'uppercase' }}>
                {currentUser.role === ROLES.AAO_CASH ? 'AAO Approval (Bills < ₹50,000)' : 'AO Approval (Bills ₹50,000–₹5,00,000)'}
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: C.textMuted }}>Amount: {fmtAmt(bill.grandTotal)}</p>
              {!rejectMode
                ? <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={() => onCashApprove && onCashApprove(bill.id, currentUser.role === ROLES.AAO_CASH ? 'aao_approved' : 'ao_approved')} style={{ ...btnSuccess, flex: 1, justifyContent: 'center', padding: '10px' }}>
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button onClick={() => setRejectMode(true)} style={{ ...btnDanger, flex: 1, justifyContent: 'center', padding: '10px' }}>
                    <XCircle size={16} /> Reject
                  </button>
                </div>
                : <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: C.textSec, display: 'block', marginBottom: 6 }}>Rejection Reason (required)</label>
                  <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3} placeholder="Specify reason…" style={{ width: '100%', padding: '8px 10px', border: `1px solid ${C.dangerBorder}`, borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'Segoe UI, sans-serif', color: C.text }} />
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <button onClick={() => { if (rejectReason.trim()) onReject(bill.id, rejectReason); }} disabled={!rejectReason.trim()} style={{ ...btnDanger, opacity: rejectReason.trim() ? 1 : 0.45 }}>Confirm Rejection</button>
                    <button onClick={() => setRejectMode(false)} style={btnSecondary}>Cancel</button>
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AuditLog({ log }) {
  const [q, setQ] = useState('');
  const filtered = [...log].filter(a => q === '' || a.billNo.toLowerCase().includes(q.toLowerCase()) || a.userName.toLowerCase().includes(q.toLowerCase()) || a.details.toLowerCase().includes(q.toLowerCase())).sort((a, b) => new Date(b.ts) - new Date(a.ts));
  const AC = { created: { c: '#374151', bg: '#F3F4F6' }, submitted: { c: C.warning, bg: C.warningBg }, reviewed: { c: C.info, bg: C.infoBg }, approved: { c: C.success, bg: C.successBg }, rejected: { c: C.danger, bg: C.dangerBg }, viewed: { c: C.textMuted, bg: C.borderLight } };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p style={{ margin: 0, color: C.textSec }}>{filtered.length} audit entries</p>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textMuted }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search logs…" style={{ padding: '8px 10px 8px 32px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', width: 280, fontFamily: 'Segoe UI, sans-serif' }} />
        </div>
      </div>
      <div style={card}>
        {filtered.map((a, i) => {
          const ac = AC[a.action] || AC.viewed;
          return (
            <div key={a.id} style={{ display: 'flex', gap: 14, padding: '14px 0', borderBottom: i < filtered.length - 1 ? `1px solid ${C.borderLight}` : 'none', alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: ac.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Activity size={16} color={ac.c} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.userName}</span>
                    <span style={{ background: ac.bg, color: ac.c, border: `1px solid ${ac.c}22`, fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: 20, letterSpacing: '0.04em' }}>{a.action.toUpperCase()}</span>
                    <span style={{ fontSize: 12, color: C.primary, fontWeight: 500 }}>{a.billNo}</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, flexShrink: 0 }}>{fmtTs(a.ts)}</span>
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{a.details}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Reports({ bills }) {
  const PAID_STATUSES = ['aao_approved','ao_approved','loc_processing','f53_posted','paid'];
  const approved = bills.filter(b => PAID_STATUSES.includes(b.status));
  const totalAmt = approved.reduce((s, b) => s + b.grandTotal, 0);
  const avgAmt = bills.length ? Math.round(bills.reduce((s, b) => s + b.grandTotal, 0) / bills.length) : 0;
  const approvalRate = bills.length ? Math.round(approved.length / bills.length * 100) : 0;

  const employeeStats = USERS.filter(u => u.role === ROLES.EMPLOYEE).map(u => {
    const eb = bills.filter(b => b.employeeId === u.id);
    return { name: u.name, designation: u.designation, total: eb.length, approved: eb.filter(b => PAID_STATUSES.includes(b.status)).length, rejected: eb.filter(b => b.status === 'rejected').length, amount: eb.filter(b => PAID_STATUSES.includes(b.status)).reduce((s, b) => s + b.grandTotal, 0) };
  });

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { l: 'Total Bills', v: bills.length, c: C.primary, bg: C.primaryLight },
          { l: 'Total Approved Amt', v: fmtAmt(totalAmt), c: C.success, bg: C.successBg },
          { l: 'Approval Rate', v: `${approvalRate}%`, c: C.info, bg: C.infoBg },
          { l: 'Average Bill Amount', v: fmtAmt(avgAmt), c: C.warning, bg: C.warningBg },
        ].map((m, i) => (
          <div key={i} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: m.c }}>{m.v}</div>
            <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={card}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Bills by Status</h3>
          {Object.entries(STATUS).map(([s, cfg]) => {
            const cnt = bills.filter(b => b.status === s).length;
            const pct = bills.length ? Math.round(cnt / bills.length * 100) : 0;
            return (
              <div key={s} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color }} />
                    <span style={{ fontSize: 13, color: C.text }}>{cfg.label}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{cnt} ({pct}%)</span>
                </div>
                <div style={{ height: 6, background: C.borderLight, borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: cfg.color, borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={card}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.text, margin: '0 0 16px' }}>Employee-wise Summary</h3>
          {employeeStats.map((e, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>{e.designation}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.success }}>{fmtAmt(e.amount)}</div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>approved</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: C.textMuted }}>
                <span>{e.total} total</span>
                <span style={{ color: C.success }}>✓ {e.approved} approved</span>
                {e.rejected > 0 && <span style={{ color: C.danger }}>✗ {e.rejected} rejected</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const TH = { fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 16px', background: C.bg, borderBottom: `1px solid ${C.border}` };
  const TD = { padding: '14px 16px', fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}` };
  const ROLE_COLORS = { EMPLOYEE: { bg: C.primaryLight, c: C.primary }, SUPERVISOR: { bg: C.warningBg, c: C.warning }, FINANCE: { bg: C.successBg, c: C.success }, ADMIN: { bg: C.dangerBg, c: C.danger } };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['User', 'Employee ID', 'Designation', 'Headquarters', 'Department', 'Role'].map(h => <th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id}>
                <td style={TD}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Avatar text={u.av} size={32} /><div><div style={{ fontWeight: 600 }}>{u.name}</div></div></div></td>
                <td style={TD}>{u.empId}</td>
                <td style={TD}>{u.designation}</td>
                <td style={TD}>{u.hq}</td>
                <td style={TD}>{u.dept}</td>
                <td style={TD}><span style={{ background: ROLE_COLORS[u.role].bg, color: ROLE_COLORS[u.role].c, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinancePaymentForm({ bill, onPost, onPark, onClose }) {
  const [tab, setTab] = useState(0);
  const [simulated, setSimulated] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [hdr, setHdr] = useState({
    supplierEmpId: bill.empId,
    invoiceDate: today,
    inwardNo: bill.inwardNo || '',
    postingDate: today,
    amount: bill.grandTotal,
    text: `TA Bill For the Month of ${bill.month} ${bill.year}`,
    currency: 'INR',
  });

  const [lineItem, setLineItem] = useState({
    glAc: '76132',
    amount: bill.grandTotal,
    taxCode: 'V0',
    text: `TA Bill For the Month of ${bill.month} ${bill.year}`,
    businessArea: '',
    costCenter: '',
    qty: '1',
    baseUOM: 'MON',
    hsnCode: 'ZN0001',
  });

  const [baTab, setBaTab] = useState({
    businessArea: '',
    paymentTerm: 'LC5T',
    headerText: `TA Bill For the Month of ${bill.month} ${bill.year}`,
  });

  const L = { fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 4, display: 'block' };
  const I = { padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', color: C.text, background: '#fff', width: '100%', boxSizing: 'border-box' };
  const IR = { ...I, background: C.bg, color: C.textMuted };
  const TABS = ['Basic Details', 'Line Item', 'Business Area', 'Tax'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#1e3a8a', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>T-Code</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>FV-60 — TA Document Post</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              Company Code: <strong style={{ color: '#fff' }}>3000</strong> · APTRANSCO VIJAYAWADA
            </div>
            {bill.passOrderNo && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Pass Order: <strong style={{ color: '#fff' }}>{bill.passOrderNo}</strong></div>}
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, color: '#fff', display: 'flex', alignItems: 'center' }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{ padding: '8px 18px', border: 'none', cursor: 'pointer', background: tab === i ? '#fff' : 'transparent', color: tab === i ? '#1e3a8a' : 'rgba(255,255,255,0.75)', fontWeight: tab === i ? 700 : 400, fontSize: 13, borderRadius: tab === i ? '6px 6px 0 0' : 0, fontFamily: 'Segoe UI, sans-serif' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: C.primaryLight, borderRadius: 8, border: `1px solid ${C.infoBorder}`, marginBottom: 20 }}>
          <FileText size={18} color={C.primary} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{bill.billNo} · Emp ID: {bill.empId}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{bill.employeeName} · {bill.designation} · {bill.month} {bill.year}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: C.textMuted }}>Pass Order Amount</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.success }}>{fmtAmt(bill.grandTotal)}</div>
          </div>
        </div>

        {tab === 0 && (
          <div style={card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Header — Basic Details</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={L}>Supplier (Employee ID)</label>
                <input value={hdr.supplierEmpId} onChange={e => setHdr({ ...hdr, supplierEmpId: e.target.value })} style={{ ...I, fontWeight: 600 }} />
              </div>
              <div>
                <label style={L}>Reference — Inward Number Entry</label>
                <input value={hdr.inwardNo} onChange={e => setHdr({ ...hdr, inwardNo: e.target.value })} placeholder="e.g. IW/2024/0312" style={I} />
              </div>
              <div>
                <label style={L}>Invoice Date (Date of Document Entry)</label>
                <input type="date" value={hdr.invoiceDate} onChange={e => setHdr({ ...hdr, invoiceDate: e.target.value })} style={I} />
              </div>
              <div>
                <label style={L}>Posting Date (System Date)</label>
                <input type="date" value={hdr.postingDate} readOnly style={IR} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 14, marginBottom: 14, alignItems: 'end' }}>
              <div>
                <label style={L}>Amount (Employee Amount)</label>
                <input type="number" value={hdr.amount} onChange={e => setHdr({ ...hdr, amount: +e.target.value, })} style={{ ...I, fontWeight: 700 }} />
              </div>
              <div>
                <label style={L}>Currency</label>
                <input value="INR" readOnly style={IR} />
              </div>
            </div>
            <div>
              <label style={L}>Text (Remarks)</label>
              <input value={hdr.text} onChange={e => setHdr({ ...hdr, text: e.target.value })} style={I} />
            </div>
          </div>
        )}

        {tab === 1 && (
          <div style={card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Line Item</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={L}>GL A/C</label>
                <input value={lineItem.glAc} readOnly style={{ ...IR, fontWeight: 700 }} />
              </div>
              <div>
                <label style={L}>Amount (same as Basic Details)</label>
                <input type="number" value={hdr.amount} readOnly style={{ ...IR, fontWeight: 700 }} />
              </div>
              <div>
                <label style={L}>Tax Code</label>
                <input value={lineItem.taxCode} readOnly style={{ ...IR, fontWeight: 600 }} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={L}>Text (same as Basic Details)</label>
              <input value={hdr.text} readOnly style={IR} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={L}>Business Area (Employee Business Area — Auto)</label>
                <input value={lineItem.businessArea} onChange={e => setLineItem({ ...lineItem, businessArea: e.target.value })} placeholder="Auto-fetched from Employee" style={I} />
              </div>
              <div>
                <label style={L}>Cost Centre (Employee Cost Centre — Auto)</label>
                <input value={lineItem.costCenter} onChange={e => setLineItem({ ...lineItem, costCenter: e.target.value })} placeholder="Auto-fetched from Employee" style={I} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div>
                <label style={L}>Qty</label>
                <input value={lineItem.qty} readOnly style={IR} />
              </div>
              <div>
                <label style={L}>Base on Measurement</label>
                <input value={lineItem.baseUOM} readOnly style={IR} />
              </div>
              <div>
                <label style={L}>HSN Code</label>
                <input value={lineItem.hsnCode} readOnly style={IR} />
              </div>
            </div>
          </div>
        )}

        {tab === 2 && (
          <div style={card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Business Area Tab</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={L}>Employee Business Area</label>
                <input value={baTab.businessArea} onChange={e => setBaTab({ ...baTab, businessArea: e.target.value })} placeholder="e.g. 1000" style={I} />
              </div>
              <div>
                <label style={L}>Payment Term</label>
                <input value={baTab.paymentTerm} readOnly style={{ ...IR, fontWeight: 700 }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={L}>Header Text</label>
                <input value={baTab.headerText} onChange={e => setBaTab({ ...baTab, headerText: e.target.value })} style={{ ...I, fontWeight: 600 }} />
              </div>
            </div>
            <div style={{ marginTop: 16, padding: '10px 14px', background: C.primaryLight, borderRadius: 8, border: `1px solid ${C.infoBorder}` }}>
              <div style={{ fontSize: 12, color: C.textSec }}><strong>Next step after posting:</strong> Document will appear in Cash Section (JAO → AAO/AO → LOC → F-53)</div>
            </div>
          </div>
        )}

        {tab === 3 && (
          <div style={card}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Tax</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><label style={L}>Tax Code</label><input value="V0" readOnly style={IR} /></div>
              <div><label style={L}>Document Currency</label><input value="INR" readOnly style={IR} /></div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 256, right: 0, padding: '14px 24px', borderTop: `2px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', zIndex: 10 }}>
        <div style={{ fontSize: 12, color: C.textMuted }}>
          {simulated && <span style={{ color: C.success, fontWeight: 600 }}>✓ Simulation successful — ready to post</span>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={btnSecondary}>Cancel</button>
          <button onClick={() => setSimulated(true)} style={btn(C.infoBg, C.info, C.infoBorder)}>
            <Activity size={14} /> Simulate
          </button>
          <button onClick={() => onPark({ hdr, lineItem, baTab })} style={btn(C.warningBg, C.warning, C.warningBorder)}>
            <Clock size={14} /> Park Document
          </button>
          <button onClick={() => onPost({ hdr, lineItem, baTab })} disabled={!simulated} style={{ ...btnPrimary, opacity: simulated ? 1 : 0.5 }}>
            <CheckCircle size={14} /> Post Document → LOC Section
          </button>
        </div>
      </div>
    </div>
  );
}

function F53Form({ bill, onPost, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    docType: 'KZ',
    companyCode: '3000',
    postingDate: today,
    docDate: today,
    vendorId: bill.empId,
    sapDocNo: bill.sapDocNo || '',
    fiscalYear: new Date().getFullYear().toString(),
    paymentMethod: 'NEFT',
    bankKey: 'SBI',
    bankAccount: '',
    amount: bill.grandTotal,
    text: `TA Bill ${bill.month} ${bill.year} - ${bill.employeeName}`,
  });
  const f = form;
  const L = { fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 4, display: 'block' };
  const I = { padding: '8px 10px', border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', color: C.text, background: '#fff', width: '100%', boxSizing: 'border-box' };
  const IR = { ...I, background: C.bg, color: C.textMuted };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: '#064e3b', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>T-Code</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>F-53 — Post Outgoing Payment</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Posting against Document · JAO (Cash)</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 6, color: '#fff', display: 'flex', alignItems: 'center' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: '#ECFDF5', borderRadius: 8, border: '1px solid #6EE7B7', marginBottom: 20 }}>
          <IndianRupee size={18} color="#065F46" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{bill.billNo} · FV-60 Doc: {bill.sapDocNo || '—'}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{bill.employeeName} · {bill.designation} · {bill.month} {bill.year}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: C.textMuted }}>Payment Amount</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#065F46' }}>{fmtAmt(bill.grandTotal)}</div>
          </div>
        </div>

        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Document Header</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={L}>Document Type</label><input value={f.docType} readOnly style={IR} /></div>
            <div><label style={L}>Company Code</label><input value={f.companyCode} readOnly style={IR} /></div>
            <div><label style={L}>Posting Date</label><input type="date" value={f.postingDate} onChange={e => setForm({ ...f, postingDate: e.target.value })} style={I} /></div>
            <div><label style={L}>Document Date</label><input type="date" value={f.docDate} onChange={e => setForm({ ...f, docDate: e.target.value })} style={I} /></div>
            <div><label style={L}>Vendor / Employee ID</label><input value={f.vendorId} readOnly style={{ ...IR, fontWeight: 700 }} /></div>
            <div><label style={L}>SAP Document No. (FV-60)</label><input value={f.sapDocNo} onChange={e => setForm({ ...f, sapDocNo: e.target.value })} placeholder="e.g. 5100001234" style={I} /></div>
          </div>
        </div>

        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>Payment Details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={L}>Payment Method</label>
              <select value={f.paymentMethod} onChange={e => setForm({ ...f, paymentMethod: e.target.value })} style={{ ...I, cursor: 'pointer' }}>
                {['NEFT', 'RTGS', 'Cheque (LOC)', 'B&R', 'DD'].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div><label style={L}>Bank Key</label><input value={f.bankKey} onChange={e => setForm({ ...f, bankKey: e.target.value })} style={I} /></div>
            <div><label style={L}>Bank Account (Beneficiary)</label><input value={f.bankAccount} onChange={e => setForm({ ...f, bankAccount: e.target.value })} placeholder="Account number" style={I} /></div>
            <div>
              <label style={L}>Amount</label>
              <input type="number" value={f.amount} onChange={e => setForm({ ...f, amount: +e.target.value })} style={{ ...I, fontWeight: 700 }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={L}>Text</label>
              <input value={f.text} onChange={e => setForm({ ...f, text: e.target.value })} style={I} />
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', background: '#ECFDF5', borderRadius: 8, border: '1px solid #6EE7B7', fontSize: 13, color: '#065F46' }}>
          <strong>Offline Process:</strong> LOC / B&R Check to Bank will be processed after F-53 posting. Payment is confirmed upon document posting.
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 256, right: 0, padding: '14px 24px', borderTop: `2px solid ${C.border}`, display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fff', zIndex: 10 }}>
        <button onClick={onClose} style={btnSecondary}>Cancel</button>
        <button onClick={() => onPost(form)} style={{ ...btn('#ECFDF5', '#065F46', '#6EE7B7'), fontWeight: 700 }}>
          <CheckCircle size={15} /> Post Payment (F-53) — Confirm Payment
        </button>
      </div>
    </div>
  );
}

function TeamDirectory() {
  const contacts = USERS.filter(u => u.phone || [ROLES.JAO_BILLS, ROLES.JAO_CASH, ROLES.AAO_CASH, ROLES.AO_CASH, ROLES.PAY_OFFICER, ROLES.FINANCE].includes(u.role));
  const ROLE_COLORS = {
    [ROLES.JAO_BILLS]: { bg: C.infoBg, c: C.info }, [ROLES.JAO_CASH]: { bg: '#ECFDF5', c: '#065F46' },
    [ROLES.AAO_CASH]: { bg: C.successBg, c: C.success }, [ROLES.AO_CASH]: { bg: '#FEF3C7', c: '#92400E' },
    [ROLES.PAY_OFFICER]: { bg: '#F3E8FF', c: '#7C3AED' }, [ROLES.FINANCE]: { bg: C.primaryLight, c: C.primary },
    [ROLES.ADMIN]: { bg: C.dangerBg, c: C.danger }, [ROLES.EMPLOYEE]: { bg: C.borderLight, c: C.textSec },
  };
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ marginBottom: 16, padding: '12px 16px', background: C.primaryLight, borderRadius: 8, border: `1px solid ${C.infoBorder}`, fontSize: 13, color: C.textSec }}>
        <strong>TA Bill Process Hierarchy:</strong> CGM(Finance) → GM(Finance) → Pay Officer → AO → CPR → AAO(Other Bills) → JAO(Cash) → AAO(Cash) → AO(Cash)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {contacts.map(u => {
          const rc = ROLE_COLORS[u.role] || { bg: C.borderLight, c: C.textSec };
          return (
            <div key={u.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar text={u.av} size={44} bg={rc.bg} color={rc.c} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{u.name}</div>
                <div style={{ fontSize: 12, color: C.textSec, margin: '2px 0' }}>{u.designation}</div>
                {u.phone && <div style={{ fontSize: 12, color: C.primary, fontWeight: 600 }}>{u.phone}</div>}
                <span style={{ background: rc.bg, color: rc.c, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.04em' }}>{ROLE_LABELS[u.role]?.split(' — ')[0] || u.role}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinanceProcessPage({ bills }) {
  const [q, setQ] = useState('');
  const [sf, setSf] = useState('all');

  const allStages = ['submitted','scrutiny','pass_order','fv60_posted','cash_pending','aao_approved','ao_approved','loc_processing','f53_posted','paid','rejected'];
  const eligible = bills.filter(b => allStages.includes(b.status));
  const filtered = eligible.filter(b =>
    (q === '' || b.billNo.toLowerCase().includes(q.toLowerCase()) || b.employeeName.toLowerCase().includes(q.toLowerCase())) &&
    (sf === 'all' || b.status === sf)
  );

  const stageCount = key => bills.filter(b => b.status === key).length;
  const metrics = [
    { label: 'New Bills (Scrutiny)', val: stageCount('submitted') + stageCount('scrutiny'), c: C.warning, bg: C.warningBg, Icon: Inbox },
    { label: 'FV-60 Pending', val: stageCount('pass_order'), c: '#7C3AED', bg: '#F3E8FF', Icon: Activity },
    { label: 'LOC Processing', val: stageCount('loc_processing') + stageCount('cash_pending'), c: '#0E7490', bg: '#CFFAFE', Icon: Hourglass },
    { label: 'Paid (F-53)', val: fmtAmt(bills.filter(b => ['f53_posted','paid'].includes(b.status)).reduce((s, b) => s + b.grandTotal, 0)), c: '#065F46', bg: '#D1FAE5', Icon: IndianRupee },
  ];

  const TH = { fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.07em', padding: '10px 14px', textAlign: 'left', background: C.bg, borderBottom: `1px solid ${C.border}` };
  const TD = { padding: '12px 14px', fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}`, verticalAlign: 'middle' };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ ...card, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><m.Icon size={20} color={m.c} /></div>
            <div><div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{m.val}</div><div style={{ fontSize: 12, color: C.textSec }}>{m.label}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: C.textMuted }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by bill number or employee…" style={{ width: '100%', padding: '9px 10px 9px 32px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Segoe UI, sans-serif' }} />
        </div>
        <select value={sf} onChange={e => setSf(e.target.value)} style={{ padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'Segoe UI, sans-serif', cursor: 'pointer', color: C.text, background: '#fff' }}>
          <option value="all">All Stages</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['Bill No.', 'Employee', 'Period', 'Amount', 'Pass Order / SAP Doc', 'Status'].map(h => <th key={h} style={TH}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={6} style={{ ...TD, textAlign: 'center', padding: 48, color: C.textMuted }}>No bills at this stage.</td></tr>
              : filtered.map(b => (
                <tr key={b.id}>
                  <td style={TD}><span style={{ fontWeight: 600, color: C.primary }}>{b.billNo}</span></td>
                  <td style={TD}><div style={{ fontWeight: 500 }}>{b.employeeName}</div><div style={{ fontSize: 11, color: C.textMuted }}>{b.designation} · {b.grandTotal < 50000 ? 'AAO limit' : 'AO limit'}</div></td>
                  <td style={TD}>{b.month} {b.year}</td>
                  <td style={{ ...TD, fontWeight: 700 }}>{fmtAmt(b.grandTotal)}</td>
                  <td style={TD}>
                    {b.passOrderNo && <div style={{ fontSize: 12 }}><span style={{ color: C.textMuted }}>PO: </span><strong>{b.passOrderNo}</strong></div>}
                    {b.sapDocNo    && <div style={{ fontSize: 12 }}><span style={{ color: C.textMuted }}>SAP: </span><strong>{b.sapDocNo}</strong></div>}
                    {b.paymentRef  && <div style={{ fontSize: 12 }}><span style={{ color: C.textMuted }}>F-53: </span><strong>{b.paymentRef}</strong></div>}
                    {!b.passOrderNo && !b.sapDocNo && !b.paymentRef && <span style={{ color: C.textMuted }}>—</span>}
                  </td>
                  <td style={TD}><Badge status={b.status} /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: C.textMuted }}>{filtered.length} of {eligible.length} bill(s)</div>
    </div>
  );
}

function AppShell({ user, onLogout, bills, setBills, auditLog, setAuditLog }) {
  const [page, setPage] = useState('dashboard');
  const [selected, setSelected] = useState(null);
  const [fv60Target, setFv60Target] = useState(null);
  const [f53Target, setF53Target] = useState(null);

  const pending = bills.filter(b => ['submitted','scrutiny','pass_order','fv60_posted','cash_pending','loc_processing'].includes(b.status));

  const addAudit = (action, billId, billNo, details) =>
    setAuditLog(prev => [{ id: 'A' + Date.now(), billId, billNo, action, userId: user.id, userName: user.name, ts: new Date().toISOString(), details }, ...prev]);

  const updateBill = (billId, patch) => setBills(prev => prev.map(b => b.id === billId ? { ...b, ...patch } : b));

  const handleSubmitBill = (data) => {
    const id = 'B' + Date.now();
    const mo = String(MONTHS.indexOf(data.month) + 1).padStart(2, '0');
    const billNo = `TA/${data.year}/${mo}/${String(Math.floor(Math.random() * 900) + 100)}`;
    const newBill = {
      id, billNo, employeeId: user.id, employeeName: user.name, designation: data.designation,
      empId: data.empId, pay: +data.pay, hq: data.hq, dept: user.dept, org: data.org,
      month: data.month, year: +data.year, journeys: data.journeys,
      totalMileage: data.totals.mileage, totalDA: data.totals.da, totalRailway: data.totals.rail, totalRoad: data.totals.road, grandTotal: data.totals.grand,
      certs: data.certs, status: 'submitted', submittedAt: new Date().toISOString(),
      reviewedBy: null, reviewedAt: null, approvedBy: null, approvedAt: null, remarks: '',
    };
    setBills(prev => [newBill, ...prev]);
    addAudit('submitted', id, billNo, `Bill submitted. Grand Total: ${fmtAmt(data.totals.grand)}`);
    setPage('mybills');
  };

  const handleView = (bill) => {
    const latest = bills.find(b => b.id === bill.id) || bill;
    setSelected(latest);
    addAudit('viewed', bill.id, bill.billNo, `Bill viewed by ${user.name}`);
  };

  const handlePassOrder = (billId, newStatus, inwardNo, passOrderNo) => {
    updateBill(billId, { status: newStatus, inwardNo, passOrderNo, reviewedBy: user.id, reviewedAt: new Date().toISOString() });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit(newStatus, billId, b.billNo, newStatus === 'scrutiny' ? `Bill received for scrutiny. Inward No: ${inwardNo}` : `Pass Order created: ${passOrderNo}`);
    setSelected(null);
  };

  const handleFV60Open = (bill) => { setFv60Target(bill); setPage('finance_payment'); setSelected(null); };

  const handleFV60Park = (billId, formData) => {
    updateBill(billId, { status: 'pass_order', fv60Data: formData });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('fv60_parked', billId, b.billNo, `FV-60 parked by ${user.name}`);
    setFv60Target(null); setPage('fv60');
  };

  const handleFV60Post = (billId, formData) => {
    const sapDocNo = `SAP${Date.now().toString().slice(-10)}`;
    updateBill(billId, { status: 'fv60_posted', sapDocNo, fv60PostedAt: new Date().toISOString(), fv60Data: formData });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('fv60_posted', billId, b.billNo, `FV-60 posted by ${user.name}. SAP Doc: ${sapDocNo}. Amount: ${fmtAmt(formData.hdr.amount)}`);
    setFv60Target(null); setPage('fv60');
  };

  const handleCashReceive = (billId) => {
    updateBill(billId, { status: 'cash_pending', cashReceivedBy: user.id, cashReceivedAt: new Date().toISOString() });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('cash_received', billId, b.billNo, `Cash section received bill. JAO: ${user.name}`);
    setSelected(null);
  };

  const handleLOC = (billId) => {
    updateBill(billId, { status: 'loc_processing', locInitiatedBy: user.id, locInitiatedAt: new Date().toISOString() });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('loc_initiated', billId, b.billNo, `LOC initiated by JAO Cash: ${user.name}`);
    setSelected(null);
  };

  const handleCashApprove = (billId, newStatus) => {
    updateBill(billId, { status: newStatus, approvedBy: user.id, approvedAt: new Date().toISOString() });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit(newStatus, billId, b.billNo, `Bill ${newStatus === 'aao_approved' ? 'approved by AAO' : 'approved by AO'} Cash: ${user.name}`);
    setSelected(null);
  };

  const handleReject = (billId, reason) => {
    updateBill(billId, { status: 'rejected', approvedBy: user.id, approvedAt: new Date().toISOString(), remarks: reason });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('rejected', billId, b.billNo, `Bill rejected by ${user.name}. Reason: ${reason}`);
    setSelected(null);
  };

  const handleF53Post = (billId, formData) => {
    const paymentRef = `F53${Date.now().toString().slice(-8)}`;
    updateBill(billId, { status: 'f53_posted', paymentRef, paymentDate: new Date().toISOString(), f53Data: formData });
    const b = bills.find(bb => bb.id === billId);
    if (b) addAudit('f53_posted', billId, b.billNo, `F-53 posted by JAO Cash: ${user.name}. Ref: ${paymentRef}. Amount: ${fmtAmt(formData.amount)}`);
    setF53Target(null); setPage('f53');
  };

  const myBills        = bills.filter(b => b.employeeId === user.id);
  const scrutinyQueue  = bills.filter(b => b.status === 'submitted');
  const fv60Queue      = bills.filter(b => b.status === 'pass_order');
  const cashQueue      = bills.filter(b => ['fv60_posted','cash_pending','aao_approved','ao_approved','loc_processing'].includes(b.status));
  const f53Queue       = bills.filter(b => ['aao_approved','ao_approved'].includes(b.status));
  const fullPage       = ['finance_payment','f53_form'].includes(page);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':    return <Dashboard user={user} bills={bills} onNav={setPage} />;
      case 'submit':       return <SubmitBillPage user={user} onSubmit={handleSubmitBill} />;
      case 'mybills':      return <BillsTable bills={myBills} currentUser={user} onView={handleView} />;
      case 'scrutiny':     return <BillsTable bills={scrutinyQueue} currentUser={user} onView={handleView} />;
      case 'fv60':         return <BillsTable bills={fv60Queue} currentUser={user} onView={handleView} />;
      case 'cash_queue':   return <BillsTable bills={cashQueue} currentUser={user} onView={handleView} />;
      case 'f53':          return <BillsTable bills={f53Queue} currentUser={user} onView={b => { setF53Target(b); setPage('f53_form'); }} />;
      case 'allbills':     return <BillsTable bills={bills} currentUser={user} onView={handleView} />;
      case 'finance':      return <FinanceProcessPage bills={bills} />;
      case 'finance_payment': return fv60Target ? <FinancePaymentForm bill={fv60Target} onPost={fd => handleFV60Post(fv60Target.id, fd)} onPark={fd => handleFV60Park(fv60Target.id, fd)} onClose={() => { setFv60Target(null); setPage('fv60'); }} /> : null;
      case 'f53_form':     return f53Target ? <F53Form bill={f53Target} onPost={fd => handleF53Post(f53Target.id, fd)} onClose={() => { setF53Target(null); setPage('f53'); }} /> : null;
      case 'reports':      return <Reports bills={bills} />;
      case 'auditlog':     return <AuditLog log={auditLog} />;
      case 'users':        return <UserManagement />;
      case 'team':         return <TeamDirectory />;
      default:             return <Dashboard user={user} bills={bills} onNav={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', ...(fullPage ? { height: '100vh', overflow: 'hidden' } : { minHeight: '100vh' }), background: C.bg }}>
      <Sidebar user={user} page={page} onNav={setPage} onLogout={onLogout} />
      <TopBar user={user} page={page} onLogout={onLogout} pendingCount={pending.length} />
      <main style={{ marginLeft: 256, marginTop: 60, padding: fullPage ? 0 : '24px 28px', ...(fullPage ? { height: 'calc(100vh - 60px)', overflow: 'hidden' } : { minHeight: 'calc(100vh - 60px)' }), background: C.bg }}>
        {renderPage()}
      </main>
      {selected && (
        <BillDetail
          bill={selected} currentUser={user}
          onClose={() => setSelected(null)}
          onPassOrder={handlePassOrder}
          onFV60={handleFV60Open}
          onCashReceive={handleCashReceive}
          onLOC={handleLOC}
          onCashApprove={handleCashApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState(INIT_BILLS);
  const [auditLog, setAuditLog] = useState(INIT_AUDIT);

  if (!user) return <LoginPage onLogin={setUser} />;
  return <AppShell user={user} onLogout={() => setUser(null)} bills={bills} setBills={setBills} auditLog={auditLog} setAuditLog={setAuditLog} />;
}
