import React, { useState } from 'react';
import { DocumentStore, AMLPolicy, SanctionEntity, MerchantRisk, CustomerPolicy, AuditLog } from '../types';
import { ICONS } from '../constants';

interface Props {
  documentStore: DocumentStore;
}

type TabType = 'policies' | 'sanctions' | 'merchants' | 'customers' | 'audit';

const DocumentStoreViewer: React.FC<Props> = ({ documentStore }) => {
  const [activeTab, setActiveTab] = useState<TabType>('policies');

  return (
    <div className="flex-1 bg-slate-950 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
            {ICONS.Database}
          </div>
          <h1 className="text-2xl font-bold text-white">Document Store</h1>
        </div>
        <p className="text-sm text-slate-400">Compliance policies, sanction lists, and merchant ratings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 pt-4 border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('policies')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition ${
            activeTab === 'policies'
              ? 'bg-slate-800 text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          AML Policies ({documentStore.policies.length})
        </button>
        <button
          onClick={() => setActiveTab('sanctions')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition ${
            activeTab === 'sanctions'
              ? 'bg-slate-800 text-white border-b-2 border-red-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Sanction List ({documentStore.sanction_lists.length})
        </button>
        <button
          onClick={() => setActiveTab('merchants')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition ${
            activeTab === 'merchants'
              ? 'bg-slate-800 text-white border-b-2 border-yellow-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Merchants ({documentStore.merchant_ratings.length})
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition ${
            activeTab === 'customers'
              ? 'bg-slate-800 text-white border-b-2 border-green-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Customers ({documentStore.customer_policies.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-t-lg transition ${
            activeTab === 'audit'
              ? 'bg-slate-800 text-white border-b-2 border-purple-500'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Audit Log ({documentStore.audit_logs.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'policies' && (
          <div className="space-y-4">
            {documentStore.policies.map((policy) => (
              <div key={policy.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white text-lg">{policy.name}</h3>
                    <p className="text-xs text-slate-400">{policy.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded">
                      v{policy.version}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-3">
                  <span className="font-semibold">Jurisdiction:</span> {policy.jurisdiction}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase">Rules</p>
                  {policy.rules.map((rule) => (
                    <div key={rule.rule_id} className="pl-4 border-l-2 border-slate-700">
                      <p className="text-sm text-slate-200">{rule.description}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-slate-500">{rule.rule_id}</span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            rule.action === 'BLOCK'
                              ? 'bg-red-500/20 text-red-400'
                              : rule.action === 'REQUIRE_APPROVAL'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-orange-500/20 text-orange-400'
                          }`}
                        >
                          {rule.action}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Updated: {new Date(policy.last_updated).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sanctions' && (
          <div className="space-y-3">
            {documentStore.sanction_lists.map((entity) => (
              <div
                key={entity.entity_id}
                className={`p-4 rounded-lg border ${
                  entity.action === 'BLOCK_ALL'
                    ? 'bg-red-500/10 border-red-500/50'
                    : entity.action === 'REVIEW'
                      ? 'bg-yellow-500/10 border-yellow-500/50'
                      : 'bg-orange-500/10 border-orange-500/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white">{entity.name}</h3>
                    <p className="text-xs text-slate-400">{entity.entity_id}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      entity.action === 'BLOCK_ALL'
                        ? 'bg-red-600 text-white'
                        : entity.action === 'REVIEW'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-orange-600 text-white'
                    }`}
                  >
                    {entity.action}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Type:</span>
                    <p className="text-white font-semibold">{entity.type}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Country:</span>
                    <p className="text-white font-semibold">{entity.country}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  <span className="text-slate-400">Reason:</span> {entity.reason}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'merchants' && (
          <div className="space-y-4">
            {documentStore.merchant_ratings.map((merchant) => (
              <div key={merchant.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white">{merchant.merchant_name}</h3>
                    <p className="text-xs text-slate-400">{merchant.merchant_type}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded ${
                      merchant.risk_tier === 'LOW'
                        ? 'bg-green-500/20 text-green-400'
                        : merchant.risk_tier === 'MEDIUM'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {merchant.risk_tier} RISK
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-slate-800 p-2 rounded">
                    <p className="text-xs text-slate-400">Risk Score</p>
                    <p className="text-lg font-bold text-white">{merchant.risk_score.toFixed(1)}/10</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <p className="text-xs text-slate-400">Fraud Rate</p>
                    <p className="text-lg font-bold text-white">{(merchant.fraud_rate * 100).toFixed(1)}%</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <p className="text-xs text-slate-400">Chargeback</p>
                    <p className="text-lg font-bold text-white">{(merchant.chargeback_rate * 100).toFixed(1)}%</p>
                  </div>
                </div>

                {merchant.compliance_issues.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Compliance Issues</p>
                    {merchant.compliance_issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2 rounded mb-1 ${
                          issue.severity === 'HIGH'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : issue.severity === 'MEDIUM'
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        <span className="font-semibold">{issue.issue}</span>
                        <span className="text-slate-500 ml-2">({issue.severity})</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      merchant.action_on_transaction === 'AUTO_APPROVE'
                        ? 'bg-green-500/20 text-green-400'
                        : merchant.action_on_transaction === 'REQUIRE_VERIFICATION'
                          ? 'bg-blue-500/20 text-blue-400'
                          : merchant.action_on_transaction === 'FLAG'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {merchant.action_on_transaction}
                  </span>
                  <span className="text-xs text-slate-500">
                    Updated: {new Date(merchant.updated_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-3">
            {documentStore.customer_policies.map((customer) => (
              <div key={customer.id} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-white">{customer.user_id}</h3>
                    <p className="text-xs text-slate-400">{customer.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        customer.risk_tier === 'LOW'
                          ? 'bg-green-500/20 text-green-400'
                          : customer.risk_tier === 'MEDIUM'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {customer.risk_tier}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        customer.compliance_status === 'VERIFIED_KYC'
                          ? 'bg-green-500/20 text-green-400'
                          : customer.compliance_status === 'PENDING_KYC'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {customer.compliance_status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-slate-800 p-2 rounded">
                    <p className="text-xs text-slate-400">Daily Limit</p>
                    <p className="text-sm font-bold text-white">${customer.daily_limit.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-800 p-2 rounded">
                    <p className="text-xs text-slate-400">Monthly Limit</p>
                    <p className="text-sm font-bold text-white">${customer.monthly_limit.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-slate-400 mb-1">
                    Allowed Countries ({customer.allowed_countries.length})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {customer.allowed_countries.map((country) => (
                      <span key={country} className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                {customer.blocked_countries.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-1">
                      Blocked Countries ({customer.blocked_countries.length})
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {customer.blocked_countries.slice(0, 5).map((country) => (
                        <span key={country} className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">
                          {country}
                        </span>
                      ))}
                      {customer.blocked_countries.length > 5 && (
                        <span className="px-2 py-1 text-xs bg-slate-700 text-slate-400 rounded">
                          +{customer.blocked_countries.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-3">
            {documentStore.audit_logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-lg border ${
                  log.event_type === 'TRANSACTION_BLOCKED'
                    ? 'bg-red-500/10 border-red-500/30'
                    : log.event_type === 'TRANSACTION_APPROVED'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-2 ${
                        log.event_type === 'TRANSACTION_BLOCKED'
                          ? 'bg-red-600 text-white'
                          : log.event_type === 'TRANSACTION_APPROVED'
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white'
                      }`}
                    >
                      {log.event_type}
                    </span>
                    <p className="text-xs text-slate-400">{log.id}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      log.approval_status === 'APPROVED'
                        ? 'bg-green-500/20 text-green-400'
                        : log.approval_status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {log.approval_status}
                  </span>
                </div>

                <p className="text-sm text-slate-300 mb-2">
                  <span className="text-slate-400">By:</span> {log.changed_by}
                </p>

                {Object.entries(log.details).length > 0 && (
                  <div className="bg-slate-950 p-2 rounded text-xs text-slate-300 mb-2">
                    {Object.entries(log.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-mono">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentStoreViewer;
