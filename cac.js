import React, { useState } from 'react';
import { AlertCircle, Heart, Calculator, FileText, Users, Github } from 'lucide-react';

const CACDecisionAlgorithm = () => {
  const [cacScore, setCacScore] = useState('');
  const [age, setAge] = useState('');
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [familyHistory, setFamilyHistory] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [results, setResults] = useState({
    riskCategory: '',
    statinRecommendation: '',
    aspirinRecommendation: '',
    followUp: '',
    riskLevel: '',
    additionalNotes: ''
  });

  const calculateRecommendations = () => {
    const score = parseInt(cacScore);
    const patientAge = parseInt(age);
    
    let riskCategory = '';
    let statinRecommendation = '';
    let aspirinRecommendation = '';
    let followUp = '';
    let riskLevel = '';
    let additionalNotes = '';

    // Determine risk category based on CAC score
    if (score === 0) {
      riskCategory = 'No identifiable coronary disease';
      riskLevel = 'low';
    } else if (score >= 1 && score <= 99) {
      riskCategory = 'Mild coronary disease';
      riskLevel = 'mild';
    } else if (score >= 100 && score <= 399) {
      riskCategory = 'Moderate coronary disease';
      riskLevel = 'moderate';
    } else if (score >= 400) {
      riskCategory = 'Severe coronary disease';
      riskLevel = 'high';
    }

    // Statin recommendations
    if (score === 0) {
      if (hasDiabetes || isSmoker || familyHistory) {
        statinRecommendation = 'Consider statin therapy due to additional risk factors';
        additionalNotes = 'Despite CAC score of 0, presence of diabetes, smoking, or family history may warrant statin consideration.';
      } else {
        statinRecommendation = 'No statin therapy indicated';
      }
    } else if (score >= 1 && score <= 99) {
      if (patientAge >= 55) {
        statinRecommendation = 'Initiate statin therapy (Class IIa recommendation)';
      } else {
        statinRecommendation = 'Statin therapy may be withheld - reassess in 3-5 years';
        followUp = 'Re-evaluate CAC scoring in 3-5 years';
      }
    } else if (score >= 100) {
      statinRecommendation = 'Strongly recommend statin therapy (Class I recommendation)';
      
      // Aspirin recommendation for primary prevention
      if (patientAge < 70 && score >= 100) {
        aspirinRecommendation = 'Consider aspirin for primary prevention (if bleeding risk acceptable)';
      } else if (patientAge >= 70) {
        aspirinRecommendation = 'Aspirin not routinely recommended due to increased bleeding risk with age';
      }
    }

    // Follow-up recommendations
    if (score >= 400) {
      followUp = 'Consider cardiology referral for further risk stratification and management';
      additionalNotes += ' Severe calcification associated with advanced obstructive coronary disease. May require additional cardiac testing.';
    }

    if (!followUp && score > 0) {
      followUp = 'Standard cardiovascular risk factor management and monitoring';
    }

    if (score === 0) {
      additionalNotes += ' Extremely low risk of cardiovascular events. CAC score of 0 has high negative predictive value.';
    }

    setResults({
      riskCategory,
      statinRecommendation,
      aspirinRecommendation,
      followUp,
      riskLevel,
      additionalNotes
    });

    setShowResults(true);
  };

  const resetForm = () => {
    setCacScore('');
    setAge('');
    setHasDiabetes(false);
    setIsSmoker(false);
    setFamilyHistory(false);
    setShowResults(false);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-50 border-green-200';
      case 'mild': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'moderate': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const isFormValid = cacScore !== '' && age !== '' && parseInt(cacScore) >= 0 && parseInt(age) > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">Coronary Artery Calcium Decision Algorithm</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Evidence-based decision support for CAC scoring interpretation and management recommendations 
          based on current ACC/AHA guidelines
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              Patient Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAC Score (Agatston Score)
                </label>
                <input
                  type="number"
                  min="0"
                  value={cacScore}
                  onChange={(e) => setCacScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter CAC score (0-2000+)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="18"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter age"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Risk Factors</h3>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hasDiabetes}
                    onChange={(e) => setHasDiabetes(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Diabetes Mellitus</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isSmoker}
                    onChange={(e) => setIsSmoker(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Current or Former Smoker</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={familyHistory}
                    onChange={(e) => setFamilyHistory(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Family History of Premature CAD</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={calculateRecommendations}
                disabled={!isFormValid}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Calculate Recommendations
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>
          </div>

          {/* CAC Score Reference */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              CAC Score Reference
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>0:</span>
                <span className="text-green-600 font-medium">No identifiable disease</span>
              </div>
              <div className="flex justify-between">
                <span>1-99:</span>
                <span className="text-blue-600 font-medium">Mild disease</span>
              </div>
              <div className="flex justify-between">
                <span>100-399:</span>
                <span className="text-orange-600 font-medium">Moderate disease</span>
              </div>
              <div className="flex justify-between">
                <span>≥400:</span>
                <span className="text-red-600 font-medium">Severe disease</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {showResults ? (
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Clinical Recommendations
              </h2>

              <div className="space-y-4">
                {/* Risk Category */}
                <div className={`p-4 rounded-lg border ${getRiskColor(results.riskLevel)}`}>
                  <h3 className="font-semibold mb-1">Risk Category</h3>
                  <p>{results.riskCategory}</p>
                </div>

                {/* Statin Recommendation */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-1">Statin Therapy</h3>
                  <p className="text-blue-700">{results.statinRecommendation}</p>
                </div>

                {/* Aspirin Recommendation */}
                {results.aspirinRecommendation && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-1">Aspirin Therapy</h3>
                    <p className="text-purple-700">{results.aspirinRecommendation}</p>
                  </div>
                )}

                {/* Follow-up */}
                {results.followUp && (
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-1">Follow-up</h3>
                    <p className="text-gray-700">{results.followUp}</p>
                  </div>
                )}

                {/* Additional Notes */}
                {results.additionalNotes && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Clinical Notes
                    </h3>
                    <p className="text-yellow-700 text-sm">{results.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Enter patient information and calculate to see recommendations</p>
            </div>
          )}

          {/* Guidelines Reference */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Evidence Base</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Based on 2018 ACC/AHA Cholesterol Guidelines</p>
              <p>• CAC independently predicts future MACE</p>
              <p>• CAC score of 0 has high negative predictive value</p>
              <p>• Serial CAC testing not recommended for treatment monitoring</p>
            </div>
          </div>

          {/* Clinical Utility */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Role of CAC in Risk Assessment
            </h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p className="font-medium">• Adding CAC to Framingham risk factors leads to improved prediction of MACE</p>
              <p className="font-medium">• Noninvasive assessment of CAC is reasonable in asymptomatic individuals with intermediate risk</p>
              <p className="text-xs text-blue-600 mt-3">
                CAC testing is most valuable for risk reclassification in patients with intermediate (10-20%) 10-year cardiovascular risk
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
    <div className="flex items-center justify-center gap-4 mb-2">
        <p>This tool provides evidence-based recommendations. Clinical judgment should always be applied in individual patient care.</p>
        <a 
            href="https://github.com/dcicantab5/cac" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="View on GitHub"
        >
            <Github className="h-5 w-5" />
        </a>
    </div>
</div>
    </div>
  );
};

export default CACDecisionAlgorithm;
