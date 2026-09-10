import React, { useState, useEffect } from 'react';
import {
  SerializedUnit,
  ReceivingRecord,
  QCInspection,
  AssemblyOrder,
  ReferralLedgerEntry,
  ErpDashboardMetrics
} from '../types';

interface ErpDashboardProps {
  onClose: () => void;
}

const DEFAULT_METRICS: ErpDashboardMetrics = {
  total_units_received: 12,
  qc_pending_count: 4,
  qc_passed_count: 6,
  qc_failed_count: 2,
  available_sellable_units: 5,
  active_assembly_orders: 2,
  total_stock_value: 1449995.0,
  total_referral_points_issued: 4500,
};

const INITIAL_RECEIVING: ReceivingRecord[] = [
  {
    id: 1,
    receiving_number: 'RCV-2026-0001',
    supplier_name: 'Global IT Distributors (Austin)',
    purchase_ref: 'PO-99120',
    product_type: 'laptop',
    brand: 'ASUS',
    model: 'ROG Strix Scar 18 (2025)',
    quantity: 3,
    unit_cost: 220000.0,
    physical_condition: 'Grade A Refurbished',
    accessories_received: '330W GaN Charger',
    status: 'qc_in_progress',
    created_at: '2026-09-10 10:15:00',
  },
  {
    id: 2,
    receiving_number: 'RCV-2026-0002',
    supplier_name: 'Enterprise Server Recyclers Inc.',
    purchase_ref: 'PO-99121',
    product_type: 'server',
    brand: 'Dell',
    model: 'PowerEdge R740xd Server',
    quantity: 2,
    unit_cost: 180000.0,
    physical_condition: 'Grade A Rack Server',
    accessories_received: 'Rail Kit, Dual PSU',
    status: 'qc_in_progress',
    created_at: '2026-09-10 11:45:00',
  }
];

const INITIAL_SERIAL_UNITS: SerializedUnit[] = [
  {
    id: 1,
    serial_number: 'ASUS-SCAR18-001',
    receiving_id: 1,
    product_title: 'ASUS ROG Strix Scar 18 (2025) i9-14900HX RTX 4090',
    product_type: 'laptop',
    current_status: 'available',
    warehouse_location: 'Austin Cleanroom Rack A-12',
    bin_location: 'BIN-L12',
    cost_price: 220000.0,
    selling_price: 289999.0,
    created_at: '2026-09-10 10:20:00',
  },
  {
    id: 2,
    serial_number: 'ASUS-SCAR18-002',
    receiving_id: 1,
    product_title: 'ASUS ROG Strix Scar 18 (2025) i9-14900HX RTX 4090',
    product_type: 'laptop',
    current_status: 'qc_pending',
    warehouse_location: 'Inspection Bay 2',
    bin_location: 'BIN-QC-02',
    cost_price: 220000.0,
    selling_price: 289999.0,
    created_at: '2026-09-10 10:20:00',
  },
  {
    id: 3,
    serial_number: 'ASUS-SCAR18-003',
    receiving_id: 1,
    product_title: 'ASUS ROG Strix Scar 18 (2025) i9-14900HX RTX 4090',
    product_type: 'laptop',
    current_status: 'qc_failed',
    warehouse_location: 'Repair Bench B',
    bin_location: 'BIN-RPR-01',
    cost_price: 220000.0,
    selling_price: 289999.0,
    created_at: '2026-09-10 10:20:00',
  },
];

const INITIAL_QC_HISTORY: QCInspection[] = [
  {
    id: 1,
    serial_unit_id: 1,
    serial_number: 'ASUS-SCAR18-001',
    product_title: 'ASUS ROG Strix Scar 18',
    technician_name: 'Senior Tech Alex (ID: 3)',
    overall_result: 'qc_passed',
    checklist_results: {
      "Power On": "PASS",
      "BIOS Check": "PASS",
      "RAM Test": "PASS (64GB DDR5)",
      "SSD Health": "PASS (100% Health)",
      "Display Test": "PASS (Zero Pixel Defect)",
      "Thermal Stress": "PASS (79°C Peak Liquid Metal)"
    },
    thermal_cpu_peak: 79.0,
    thermal_gpu_peak: 73.0,
    battery_health_percentage: 98,
    notes: 'Passed 4-hour thermal stress test. Silicon lottery top 5%.',
    completed_at: '2026-09-10 11:00:00',
  },
  {
    id: 2,
    serial_unit_id: 3,
    serial_number: 'ASUS-SCAR18-003',
    product_title: 'ASUS ROG Strix Scar 18',
    technician_name: 'Senior Tech Alex (ID: 3)',
    overall_result: 'qc_failed',
    failure_reason: 'Keyboard RGB Controller Fault (Key #F4 non-responsive)',
    checklist_results: {
      "Power On": "PASS",
      "BIOS Check": "PASS",
      "Keyboard Test": "FAIL (F4 Key Switch)",
      "Display Test": "PASS"
    },
    thermal_cpu_peak: 82.0,
    thermal_gpu_peak: 76.0,
    battery_health_percentage: 94,
    notes: 'Moved to Repair Required queue for ribbon cable replacement.',
    completed_at: '2026-09-10 11:30:00',
  }
];

export const ErpDashboard: React.FC<ErpDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'receiving' | 'qc' | 'inventory' | 'assembly' | 'referral'>('overview');

  // Data states
  const [metrics] = useState<ErpDashboardMetrics>(DEFAULT_METRICS);
  const [receivings, setReceivings] = useState<ReceivingRecord[]>(INITIAL_RECEIVING);
  const [units, setUnits] = useState<SerializedUnit[]>(INITIAL_SERIAL_UNITS);
  const [qcInspections, setQcInspections] = useState<QCInspection[]>(INITIAL_QC_HISTORY);
  
  // Search & Filter
  const [serialSearch, setSerialSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Receiving Form state
  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newType, setNewType] = useState('laptop');
  const [newQty, setNewQty] = useState(1);
  const [newCost, setNewCost] = useState(150000);

  // QC Inspection Form state
  const [selectedUnitForQc, setSelectedUnitForQc] = useState<SerializedUnit | null>(null);
  const [qcCpuTemp, setQcCpuTemp] = useState(78);
  const [qcGpuTemp, setQcGpuTemp] = useState(72);
  const [qcBatteryHealth, setQcBatteryHealth] = useState(96);
  const [qcNotes, setQcNotes] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add receiving record & generate serialized units
  const handleCreateReceiving = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand || !newModel) return;

    const rcvNum = `RCV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const rcvId = receivings.length + 1;

    const newRcv: ReceivingRecord = {
      id: rcvId,
      receiving_number: rcvNum,
      supplier_name: 'Global IT Distributors (Austin)',
      purchase_ref: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      product_type: newType,
      brand: newBrand,
      model: newModel,
      quantity: newQty,
      unit_cost: newCost,
      physical_condition: 'Grade A Intake',
      status: 'qc_in_progress',
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    const generatedUnits: SerializedUnit[] = [];
    for (let i = 0; i < newQty; i++) {
      generatedUnits.push({
        id: units.length + i + 1,
        serial_number: `${newBrand.toUpperCase()}-${newModel.replace(/\s+/g, '').slice(0, 6).toUpperCase()}-${rcvId.toString().padStart(3, '0')}-${(i + 1).toString().padStart(3, '0')}`,
        receiving_id: rcvId,
        product_title: `${newBrand} ${newModel}`,
        product_type: newType,
        current_status: 'qc_pending',
        warehouse_location: 'Inspection Bay 1',
        bin_location: `BIN-QC-0${i + 1}`,
        cost_price: newCost,
        selling_price: Math.round(newCost * 1.25),
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      });
    }

    setReceivings([newRcv, ...receivings]);
    setUnits([...generatedUnits, ...units]);
    setNewBrand('');
    setNewModel('');
    showToast(`Receiving ${rcvNum} created with ${newQty} serialized units queued for QC!`);
  };

  // Submit Technical QC Result
  const handleExecuteQc = (result: 'qc_passed' | 'qc_failed') => {
    if (!selectedUnitForQc) return;

    const newInspection: QCInspection = {
      id: qcInspections.length + 1,
      serial_unit_id: selectedUnitForQc.id,
      serial_number: selectedUnitForQc.serial_number,
      product_title: selectedUnitForQc.product_title,
      technician_name: 'Senior Tech Alex (ID: 3)',
      overall_result: result,
      failure_reason: result === 'qc_failed' ? 'Component stress test failed' : undefined,
      checklist_results: {
        "Power On": "PASS",
        "BIOS Check": "PASS",
        "Processor Stress": "PASS",
        "RAM Test": "PASS",
        "Thermal Peak": `${qcCpuTemp}°C CPU / ${qcGpuTemp}°C GPU`
      },
      thermal_cpu_peak: qcCpuTemp,
      thermal_gpu_peak: qcGpuTemp,
      battery_health_percentage: qcBatteryHealth,
      notes: qcNotes || (result === 'qc_passed' ? 'Unit passed 24-point bench inspection' : 'Unit failed stress check'),
      completed_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    setQcInspections([newInspection, ...qcInspections]);

    // Update Serial Unit status
    setUnits((prev) =>
      prev.map((u) =>
        u.id === selectedUnitForQc.id
          ? {
              ...u,
              current_status: result === 'qc_passed' ? 'qc_passed' : 'qc_failed',
            }
          : u
      )
    );

    showToast(`QC ${result.toUpperCase()} recorded for Serial: ${selectedUnitForQc.serial_number}!`);
    setSelectedUnitForQc(null);
    setQcNotes('');
  };

  // Inward Unit to Sellable Inventory (STRICT ENFORCEMENT)
  const handleInwardUnit = (unit: SerializedUnit) => {
    // Check if latest QC inspection is QC PASSED
    const latestQc = qcInspections.find((q) => q.serial_unit_id === unit.id);

    if (!latestQc) {
      alert("❌ CRITICAL BUSINESS RULE VIOLATION: Unit has NO Quality Check (QC) inspection record. Conduct QC test first!");
      return;
    }

    if (latestQc.overall_result !== 'qc_passed') {
      alert(`❌ STRICT INVENTORY RULE VIOLATION: Cannot inward unit ${unit.serial_number}. QC Status is '${latestQc.overall_result.toUpperCase()}'. Only 'QC PASSED' units can enter sellable inventory!`);
      return;
    }

    setUnits((prev) =>
      prev.map((u) =>
        u.id === unit.id
          ? {
              ...u,
              current_status: 'available',
              warehouse_location: 'Austin Main Storefront Inventory',
            }
          : u
      )
    );

    showToast(`✅ SUCCESS: Unit ${unit.serial_number} successfully inwarded to sellable store inventory!`);
  };

  const filteredUnits = units.filter((u) =>
    u.serial_number.toLowerCase().includes(serialSearch.toLowerCase()) ||
    u.product_title.toLowerCase().includes(serialSearch.toLowerCase()) ||
    u.current_status.toLowerCase().includes(serialSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900 text-white font-body flex flex-col">
      {/* ERP Top Header Bar */}
      <div className="bg-[#131921] border-b border-slate-700 px-6 py-3 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-lg font-mono shadow-md">
            PC
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
              PC WARE Enterprise ERP & Refurbishment Portal
            </h1>
            <p className="text-[11px] text-gray-400 font-mono">
              Strict Serialized Inventory & Quality Control Enforcement Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ERP API ONLINE • SQLite DB Connected
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-slate-700"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            Exit ERP
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#1e293b] border-b border-slate-800 px-6 py-2 flex items-center gap-2 text-xs font-bold overflow-x-auto whitespace-nowrap shrink-0">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">dashboard</span>
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('receiving')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'receiving' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">input</span>
          Step 1: Receiving Intake ({receivings.length})
        </button>

        <button
          onClick={() => setActiveTab('qc')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'qc' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          Step 2: Technical QC ({units.filter(u => u.current_status === 'qc_pending').length} Pending)
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'inventory' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          Step 3: Serialized Stock ({units.length} Units)
        </button>

        <button
          onClick={() => setActiveTab('assembly')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'assembly' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">build</span>
          Custom PC Assembly Orders
        </button>

        <button
          onClick={() => setActiveTab('referral')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'referral' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">group_add</span>
          Referral Ledger & Points
        </button>
      </div>

      {/* Main ERP Work Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-1 shadow-sm">
                <div className="text-[11px] text-gray-400 font-mono font-bold uppercase">Total Units Intake</div>
                <div className="text-3xl font-extrabold font-mono text-white">{metrics.total_units_received} Units</div>
                <div className="text-[11px] text-emerald-400 font-mono">100% Serial Traceable</div>
              </div>

              <div className="bg-slate-800/90 border border-amber-500/40 rounded-2xl p-4 space-y-1 shadow-sm">
                <div className="text-[11px] text-amber-400 font-mono font-bold uppercase">QC Inspection Queue</div>
                <div className="text-3xl font-extrabold font-mono text-amber-400">
                  {units.filter(u => u.current_status === 'qc_pending').length} Pending
                </div>
                <div className="text-[11px] text-gray-400 font-mono">Awaiting Technician Inspection</div>
              </div>

              <div className="bg-slate-800/90 border border-emerald-500/40 rounded-2xl p-4 space-y-1 shadow-sm">
                <div className="text-[11px] text-emerald-400 font-mono font-bold uppercase">Sellable Available Stock</div>
                <div className="text-3xl font-extrabold font-mono text-emerald-400">
                  {units.filter(u => u.current_status === 'available').length} Passed & Inwarded
                </div>
                <div className="text-[11px] text-emerald-300 font-mono">Published to E-Commerce</div>
              </div>

              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-1 shadow-sm">
                <div className="text-[11px] text-gray-400 font-mono font-bold uppercase">Total Available Valuation</div>
                <div className="text-2xl font-extrabold font-mono text-amber-300">
                  ₹{metrics.total_stock_value.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-gray-400 font-mono">Verified Cost + Margin</div>
              </div>
            </div>

            {/* Core Business Rule Alert Box */}
            <div className="bg-orange-950/40 border border-orange-500/50 rounded-2xl p-4 text-xs space-y-2">
              <div className="font-heading font-extrabold text-sm text-orange-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">shield</span>
                STRICT BUSINESS RULE ENFORCEMENT ENGINE ACTIVE
              </div>
              <p className="text-gray-300 leading-relaxed font-mono">
                No refurbished laptop, desktop, or server unit can be inwarded or displayed as sellable inventory on the e-commerce store until a technician completes a verified Quality Check (QC) with an explicit <strong className="text-emerald-400">QC_PASSED</strong> status. Units marked as <strong className="text-red-400">QC_FAILED</strong> are automatically routed to the repair/scrap queues.
              </p>
            </div>

            {/* Recent Serialized Hardware Pipeline */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                Real-Time Serialized Inventory Pipeline
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-gray-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-700">
                      <th className="p-3">SERIAL NUMBER</th>
                      <th className="p-3">HARDWARE PRODUCT</th>
                      <th className="p-3">LOCATION</th>
                      <th className="p-3">COST / SELLING</th>
                      <th className="p-3">QC STATUS</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 font-mono text-[11px]">
                    {units.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-700/50">
                        <td className="p-3 font-bold text-amber-300">{u.serial_number}</td>
                        <td className="p-3 font-semibold text-white">{u.product_title}</td>
                        <td className="p-3 text-gray-300">{u.warehouse_location}</td>
                        <td className="p-3">
                          <span className="text-gray-400">₹{u.cost_price.toLocaleString('en-IN')}</span> / <strong className="text-emerald-400">₹{u.selling_price.toLocaleString('en-IN')}</strong>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              u.current_status === 'available'
                                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50'
                                : u.current_status === 'qc_passed'
                                ? 'bg-indigo-900/80 text-indigo-300 border border-indigo-500/50'
                                : u.current_status === 'qc_failed'
                                ? 'bg-red-900/80 text-red-300 border border-red-500/50'
                                : 'bg-amber-900/80 text-amber-300 border border-amber-500/50'
                            }`}
                          >
                            {u.current_status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {u.current_status === 'qc_passed' && (
                            <button
                              onClick={() => handleInwardUnit(u)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] transition cursor-pointer"
                            >
                              Inward to Store
                            </button>
                          )}
                          {u.current_status === 'qc_pending' && (
                            <button
                              onClick={() => {
                                setSelectedUnitForQc(u);
                                setActiveTab('qc');
                              }}
                              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[10px] transition cursor-pointer"
                            >
                              Perform QC
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: RECEIVING INTAKE TAB */}
        {activeTab === 'receiving' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* New Intake Form (5 cols) */}
            <div className="md:col-span-5 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_box</span>
                Create Refurbishment Intake Record
              </h3>
              <form onSubmit={handleCreateReceiving} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-400 font-mono mb-1">Brand Name:</label>
                  <input
                    type="text"
                    required
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    placeholder="e.g. ASUS, Lenovo, Dell, HP"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Model Name / Specs:</label>
                  <input
                    type="text"
                    required
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    placeholder="e.g. ROG Strix Scar 18 (2025) i9 RTX 4090"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-400 font-mono mb-1">Type:</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop</option>
                      <option value="server">Server</option>
                      <option value="workstation">Workstation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-mono mb-1">Intake Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={newQty}
                      onChange={(e) => setNewQty(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 font-mono mb-1">Unit Purchase Cost (₹):</label>
                  <input
                    type="number"
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl uppercase tracking-wider shadow-md transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">inventory</span>
                  Record Receiving & Generate Serialized Units
                </button>
              </form>
            </div>

            {/* Receivings History List (7 cols) */}
            <div className="md:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Intake History Log
              </h3>

              <div className="space-y-3">
                {receivings.map((r) => (
                  <div key={r.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-400 text-sm">{r.receiving_number}</span>
                      <span className="bg-amber-900/80 text-amber-300 font-mono text-[10px] px-2 py-0.5 rounded border border-amber-500/40 uppercase font-bold">
                        {r.status}
                      </span>
                    </div>

                    <div className="font-bold text-white text-sm">{r.brand} {r.model}</div>
                    <div className="grid grid-cols-2 gap-2 text-gray-400 font-mono text-[11px]">
                      <div>Qty: <strong className="text-white">{r.quantity} Units</strong></div>
                      <div>Unit Cost: <strong className="text-emerald-400">₹{r.unit_cost.toLocaleString('en-IN')}</strong></div>
                      <div>Supplier: {r.supplier_name}</div>
                      <div>Ref #: {r.purchase_ref}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TECHNICAL QC INSPECTION TAB */}
        {activeTab === 'qc' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* QC Form (5 cols) */}
            <div className="md:col-span-5 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">science</span>
                Execute Multi-Point Quality Check (QC)
              </h3>

              {selectedUnitForQc ? (
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-900 p-3 rounded-xl border border-amber-500/40 space-y-1">
                    <div className="text-[10px] text-gray-400 font-mono">SELECTED UNIT FOR INSPECTION</div>
                    <div className="font-mono text-amber-300 font-bold text-sm">{selectedUnitForQc.serial_number}</div>
                    <div className="font-bold text-white">{selectedUnitForQc.product_title}</div>
                  </div>

                  {/* Checklist options */}
                  <div className="space-y-2">
                    <label className="block text-gray-300 font-bold font-mono">Mandatory Checklist:</label>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-400 font-bold flex justify-between">
                        <span>Power On & BIOS:</span> <span>PASS</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-400 font-bold flex justify-between">
                        <span>RAM Test:</span> <span>PASS</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-400 font-bold flex justify-between">
                        <span>SSD Health 100%:</span> <span>PASS</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-emerald-500/40 text-emerald-400 font-bold flex justify-between">
                        <span>Display / Ports:</span> <span>PASS</span>
                      </div>
                    </div>
                  </div>

                  {/* Thermal Telemetry */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-gray-400 font-mono text-[10px]">CPU Peak Temp (°C):</label>
                      <input
                        type="number"
                        value={qcCpuTemp}
                        onChange={(e) => setQcCpuTemp(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono text-[10px]">GPU Peak Temp (°C):</label>
                      <input
                        type="number"
                        value={qcGpuTemp}
                        onChange={(e) => setQcGpuTemp(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-mono text-[10px]">Battery Health %:</label>
                      <input
                        type="number"
                        value={qcBatteryHealth}
                        onChange={(e) => setQcBatteryHealth(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-mono mb-1">Technician Bench Notes:</label>
                    <textarea
                      rows={2}
                      value={qcNotes}
                      onChange={(e) => setQcNotes(e.target.value)}
                      placeholder="e.g. Conductonaut Liquid Metal verified. Passes 4-hr thermal stress."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-primary text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleExecuteQc('qc_passed')}
                      className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl uppercase tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      MARK QC PASSED
                    </button>

                    <button
                      type="button"
                      onClick={() => handleExecuteQc('qc_failed')}
                      className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl uppercase tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                      MARK QC FAILED
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center space-y-2 bg-slate-900/60 rounded-xl border border-slate-800 text-gray-400">
                  <span className="material-symbols-outlined text-[48px] text-gray-600">touch_app</span>
                  <div className="font-bold text-xs">Select a unit from the right table to begin QC inspection</div>
                </div>
              )}
            </div>

            {/* QC Inspection Pending Queue (7 cols) */}
            <div className="md:col-span-7 bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">checklist</span>
                  Serialized Queue Awaiting Inspection
                </span>
                <span className="font-mono text-xs text-amber-400 font-bold">
                  {units.filter(u => u.current_status === 'qc_pending').length} Pending
                </span>
              </h3>

              <div className="space-y-3">
                {units.filter(u => u.current_status === 'qc_pending').map((u) => (
                  <div key={u.id} className="bg-slate-900 p-4 rounded-xl border border-amber-500/40 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono font-bold text-amber-300 text-sm">{u.serial_number}</div>
                      <div className="font-bold text-white text-xs">{u.product_title}</div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">Location: {u.warehouse_location} ({u.bin_location})</div>
                    </div>

                    <button
                      onClick={() => setSelectedUnitForQc(u)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow cursor-pointer shrink-0 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      Start QC
                    </button>
                  </div>
                ))}

                {units.filter(u => u.current_status === 'qc_pending').length === 0 && (
                  <div className="py-12 text-center text-gray-400 font-mono text-xs">
                    ✅ All intake hardware units have completed Quality Check (QC)!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SERIALIZED STOCK & INWARDING TAB */}
        {activeTab === 'inventory' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">search</span>
                  Serialized Hardware Traceability Search
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  100% individual serial history tracking: Intake $\rightarrow$ QC $\rightarrow$ Inward $\rightarrow$ Invoice
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  value={serialSearch}
                  onChange={(e) => setSerialSearch(e.target.value)}
                  placeholder="Search Serial Number (e.g. ASUS-SCAR18-001)..."
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono outline-none focus:border-primary placeholder-gray-500"
                />
              </div>
            </div>

            {/* Units Grid / Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-gray-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-700">
                    <th className="p-3">SERIAL NUMBER</th>
                    <th className="p-3">PRODUCT</th>
                    <th className="p-3">TYPE</th>
                    <th className="p-3">LOCATION</th>
                    <th className="p-3">COST</th>
                    <th className="p-3">SELLING PRICE</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 text-right">INWARD ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 font-mono text-[11px]">
                  {filteredUnits.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-700/50">
                      <td className="p-3 font-bold text-amber-300">{u.serial_number}</td>
                      <td className="p-3 font-semibold text-white">{u.product_title}</td>
                      <td className="p-3 text-gray-400 uppercase">{u.product_type}</td>
                      <td className="p-3 text-gray-300">{u.warehouse_location}</td>
                      <td className="p-3 text-gray-400">₹{u.cost_price.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-bold text-emerald-400">₹{u.selling_price.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.current_status === 'available'
                              ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50'
                              : u.current_status === 'qc_passed'
                              ? 'bg-indigo-900/80 text-indigo-300 border border-indigo-500/50'
                              : u.current_status === 'qc_failed'
                              ? 'bg-red-900/80 text-red-300 border border-red-500/50'
                              : 'bg-amber-900/80 text-amber-300 border border-amber-500/50'
                          }`}
                        >
                          {u.current_status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {u.current_status === 'qc_passed' && (
                          <button
                            onClick={() => handleInwardUnit(u)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[10px] transition cursor-pointer shadow"
                          >
                            Inward to Sellable Stock
                          </button>
                        )}
                        {u.current_status === 'available' && (
                          <span className="text-emerald-400 font-bold text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                            LIVE ON STORE
                          </span>
                        )}
                        {u.current_status === 'qc_failed' && (
                          <span className="text-red-400 font-bold text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-500/40">
                            REPAIR QUEUE
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOM PC ASSEMBLY TAB */}
        {activeTab === 'assembly' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4">
            <h3 className="font-heading font-extrabold text-base text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">build</span>
                Custom PC Assembly Orders & Assembly QC Workflow
              </span>
              <span className="font-mono text-xs bg-indigo-950 text-indigo-400 border border-indigo-500/40 px-2.5 py-1 rounded-md font-bold">
                Assembly Bench Active
              </span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-sm">ASM-2026-0045</span>
                  <span className="bg-indigo-900 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-500/40">
                    VERIFIED COMPATIBLE
                  </span>
                </div>
                <div className="text-white font-bold text-sm">Custom Ryzen 7 7800X3D + RTX 4090 Workstation Rig</div>
                <div className="text-gray-400 text-[11px]">Client: EcoTech Solutions Inc. • Estimated Draw: 650W</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-emerald-400 font-bold">Total: ₹3,39,497</span>
                  <button className="px-3 py-1 bg-primary text-white font-bold rounded text-[10px]">
                    Perform Assembly QC
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REFERRAL LEDGER TAB */}
        {activeTab === 'referral' && (
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-4 text-xs font-mono">
            <h3 className="font-heading font-extrabold text-base text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>
                Immutable Referral Points Ledger
              </span>
              <span className="text-amber-400 font-bold text-sm">Total Ledger Points: {metrics.total_referral_points_issued} PTS</span>
            </h3>

            <p className="text-gray-400 text-[11px] leading-relaxed">
              Referral transactions are appended into an immutable transaction ledger (`referral_ledger`). Point balances are derived from ledger sum rather than direct overwrite.
            </p>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between text-gray-300 border-b border-slate-800 pb-2">
                <span>TIMESTAMP</span>
                <span>TYPE</span>
                <span>POINTS</span>
                <span>NOTES</span>
              </div>
              <div className="flex justify-between text-emerald-400 py-1">
                <span>2026-09-10 10:00:00</span>
                <span>admin_adjustment</span>
                <span>+2500 PTS</span>
                <span>Initial Admin signup reward bonus</span>
              </div>
              <div className="flex justify-between text-emerald-400 py-1">
                <span>2026-09-10 11:30:00</span>
                <span>earned_referral</span>
                <span>+2000 PTS</span>
                <span>Customer purchase referral reward linked</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-950 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slide-up text-xs font-mono">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
