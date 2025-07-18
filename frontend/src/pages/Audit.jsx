import React, { useState } from 'react';
import { Heart, AlertTriangle, FileText, Download, Calendar, Play, CheckCircle, X, AlertCircle } from 'lucide-react';

const CampusAuditSystem = () => {
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');

  const facilities = [
    {
      id: 1,
      name: 'Main Building',
      status: 'Good',
      lastAudit: '2024-01-15',
      overallScore: 85,
      scores: {
        hygiene: 90,
        supplies: 80,
        privacy: 85,
        accessibility: 85
      }
    },
    {
      id: 2,
      name: 'Library Building',
      status: 'Excellent',
      lastAudit: '2024-01-12',
      overallScore: 92,
      scores: {
        hygiene: 95,
        supplies: 90,
        privacy: 90,
        accessibility: 90
      }
    },
    {
      id: 3,
      name: 'Science Block',
      status: 'Needs Improvement',
      lastAudit: '2024-01-10',
      overallScore: 75,
      scores: {
        hygiene: 70,
        supplies: 80,
        privacy: 75,
        accessibility: 75
      }
    },
    {
      id: 4,
      name: 'Arts Building',
      status: 'Good',
      lastAudit: '2024-01-08',
      overallScore: 88,
      scores: {
        hygiene: 85,
        supplies: 90,
        privacy: 90,
        accessibility: 85
      }
    }
  ];

  const auditCriteria = [
    {
      category: 'Hygiene Standards',
      color: 'text-pink-500',
      items: [
        { name: 'Cleanliness of facilities', percentage: 85, weight: '25%', stars: 4 }
      ]
    },
    {
      category: 'Supply Management',
      color: 'text-pink-500',
      items: [
        { name: 'Product availability', percentage: 80, weight: '30%', stars: 4 }
      ]
    },
    {
      category: 'Privacy & Accessibility',
      color: 'text-pink-500',
      items: [
        { name: 'Door locks and privacy', percentage: 90, weight: '30%', stars: 5 }
      ]
    }
  ];

  const complianceItems = [
    { name: 'Health Standards', status: 'good' },
    { name: 'Safety Protocols', status: 'good' },
    { name: 'Accessibility', status: 'warning' },
    { name: 'Privacy Standards', status: 'error' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-orange-500';
      case 'Needs Improvement': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500 border-green-500';
    if (score >= 80) return 'text-orange-500 border-orange-500';
    if (score >= 70) return 'text-blue-500 border-blue-500';
    return 'text-red-500 border-red-500';
  };

  const CircularScore = ({ score, label, size = 'w-20 h-20' }) => (
    <div className="flex flex-col items-center">
      <div className={`${size} rounded-full border-4 ${getScoreColor(score)} flex items-center justify-center font-bold text-lg`}>
        {score}
      </div>
      <span className="text-sm text-gray-600 mt-2">{label}</span>
    </div>
  );

  const StarRating = ({ count }) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
    </div>
  );

  const ComplianceIcon = ({ status }) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-pink-400 mr-2" />
              <span className="text-xl font-semibold text-pink-400">MenstruCare</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <AlertTriangle className="w-5 h-5 mr-1" />
                Report Issue
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <FileText className="w-5 h-5 mr-1" />
                Dashboard
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <CheckCircle className="w-5 h-5 mr-1" />
                Audit
              </button>
              <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Campus Audit System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive facility assessments with scoring systems aligned to health standards
            and actionable improvement suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Facility Scores */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Facility Audit Scores</h2>
                <div className="flex items-center space-x-4">
                  <select 
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={selectedFacility}
                    onChange={(e) => setSelectedFacility(e.target.value)}
                  >
                    <option>All Facilities</option>
                    {facilities.map(facility => (
                      <option key={facility.id} value={facility.name}>{facility.name}</option>
                    ))}
                  </select>
                  <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 flex items-center">
                    <span className="mr-2">+</span>
                    New Audit
                  </button>
                </div>
              </div>

              {/* Facility Cards */}
              <div className="space-y-6">
                {facilities.map((facility) => (
                  <div key={facility.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-pink-400 rounded-full mr-3"></div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(facility.status)}`}>
                            {facility.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Last audit: {facility.lastAudit}</p>
                        <p className="text-3xl font-bold text-gray-900">{facility.overallScore}%</p>
                        <p className="text-sm text-gray-500">Overall Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <CircularScore score={facility.scores.hygiene} label="Hygiene" />
                      <CircularScore score={facility.scores.supplies} label="Supplies" />
                      <CircularScore score={facility.scores.privacy} label="Privacy" />
                      <CircularScore score={facility.scores.accessibility} label="Accessibility" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Criteria Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Audit Criteria & Standards</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {auditCriteria.map((category, index) => (
                  <div key={index}>
                    <h3 className={`text-lg font-semibold ${category.color} mb-4`}>
                      {category.category}
                    </h3>
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Weight: {item.weight}</span>
                          <StarRating count={item.stars} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Compliance */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-pink-100 text-pink-700 border border-pink-200 rounded-lg p-3 flex items-center justify-center hover:bg-pink-200">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
                <button className="w-full bg-pink-100 text-pink-700 border border-pink-200 rounded-lg p-3 flex items-center justify-center hover:bg-pink-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
                <button className="w-full bg-pink-100 text-pink-700 border border-pink-200 rounded-lg p-3 flex items-center justify-center hover:bg-pink-200">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Audit
                </button>
                <button className="w-full bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg p-3 flex items-center justify-center hover:from-pink-500 hover:to-blue-500">
                  <Play className="w-4 h-4 mr-2" />
                  Start Audit
                </button>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Status</h3>
              <div className="space-y-3">
                {complianceItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <ComplianceIcon status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampusAuditSystem;