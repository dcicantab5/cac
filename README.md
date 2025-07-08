# Coronary Artery Calcium Decision Algorithm

An evidence-based clinical decision support tool for interpreting CAC scores and providing management recommendations based on current ACC/AHA guidelines.

## The Webapp

🔗 **[Launch CAC Decision Tool](https://dcicantab5.github.io/cac/)**

## Features

- **Evidence-Based Algorithm**: Follows 2018 ACC/AHA Cholesterol Guidelines
- **Risk Stratification**: Color-coded categories (No disease, Mild, Moderate, Severe)
- **Clinical Recommendations**: 
  - Statin therapy guidance based on CAC score and age
  - Aspirin therapy for primary prevention
  - Follow-up and referral recommendations
- **Risk Factor Integration**: Considers diabetes, smoking, and family history
- **User-Friendly Interface**: Clean, professional medical design
- **Mobile Responsive**: Works on all devices

## Clinical Use Cases

- **Primary Prevention**: Risk stratification in asymptomatic patients
- **Intermediate Risk Patients**: Enhanced risk assessment beyond traditional risk factors
- **Statin Decision Making**: Evidence-based guidance for initiation
- **Patient Education**: Visual risk communication

## CAC Score Categories

| CAC Score | Risk Category | Management |
|-----------|---------------|------------|
| 0 | No identifiable disease | No statin unless additional risk factors |
| 1-99 | Mild disease | Statin if age ≥55, otherwise reassess 3-5 years |
| 100-399 | Moderate disease | Strong statin recommendation |
| ≥400 | Severe disease | Statin + consider cardiology referral |

## Evidence Base

- Adding CAC to Framingham risk factors improves MACE prediction
- CAC assessment reasonable in asymptomatic intermediate-risk individuals
- CAC score of 0 has high negative predictive value
- Most valuable for risk reclassification in intermediate (10-20%) 10-year risk patients

## Clinical Disclaimer

This tool provides evidence-based recommendations for educational purposes. Clinical judgment should always be applied in individual patient care. Not intended to replace clinical decision-making or consultation with healthcare providers.

## License

GNU AFFERO GENERAL PUBLIC LICENSE.

## References

1. Grundy SM, et al. 2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol. Circulation. 2019;139(25):e1082-e1143.

2. Arnett DK, et al. 2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease. Circulation. 2019;140(11):e596-e646.

3. Polonsky TS, et al. Coronary artery calcium score and risk classification for coronary heart disease prediction. JAMA. 2010;303(16):1610-6.

---

**For questions or issues, please open a GitHub issue or contact Dr Saiful Safuan Md Sani saifulsafuan@moh.gov.my.**
