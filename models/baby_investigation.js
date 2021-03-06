const table_const = require('../config/table')
module.exports = (sequelize, type) => {
  return sequelize.define(table_const.baby_investigation, {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    study_id: type.INTEGER,
    baby_thyroid_status: type.STRING,
    baby_thyroid_result: type.STRING,
    baby_blood_glucose: type.STRING,
    baby_haemoglobin_levels: type.STRING,
    // patient_id: [id, Validators.required],
    baby_c_reactive_protien_levels: type.STRING,
    micro_esr: type.STRING,
    baby_procalcitonin_levels: type.STRING,
    total_leucocute_count_unit: type.STRING,
    total_leucocute_count: type.STRING,
    absolute_neutrophil_count: type.STRING,
    absolute_neutrophil_count_unit: type.STRING,
    immature_to_mature_neutrophil_ratios: type.STRING,
    thrombocytopenia_unit: type.STRING,
    thrombocytopenia: type.STRING,
    urine_rest_for_pus_cells: type.STRING,
    urine_culture_test: type.STRING,
    blood_culture_report: type.STRING,
    gram_positive_bacteria: type.STRING,
    gram_positive_bacteria_if_other: type.STRING,
    gram_negative_bacteria: type.STRING,
    gram_negative_bacteria_if_other: type.STRING,
    fungi: type.STRING,
    other_organism: type.STRING,
    antibiotic_status: type.STRING,
    antibiotic_status_resisitant: type.STRING,
    antibiotic_status_intermediate: type.STRING,
    antibiotic_status_value: type.STRING,
    sodium: type.STRING,
    potassium: type.STRING,
    chlorine: type.STRING,
    calcium: type.STRING,
    phosphate: type.STRING,
    magnesium: type.STRING,
    urea: type.STRING,
    creatinine: type.STRING,
    lactate_levels: type.STRING,
    bilirubin_levels: type.STRING,
    cord_ph: type.STRING,
    arrhythmia: type.STRING,
    csf_culture: type.STRING,
    csf_culture_tsb_value: type.STRING,
    reading: type.STRING
  });
};
