class PatientContQueries{

    static getBabyAppearsModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_appears_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyRespModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_resp_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyCVModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_cv_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyCNSModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_cns_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyGITModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_git_infos pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyInvestigationModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_investigations pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyAntibioticModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_antibiotics pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static getBabyFinalModel_query(){
        let query = 'SELECT  DISTINCT * FROM patient_baby_finals pbai  JOIN patient_basic_infos pbi ON  pbai.study_id = pbi.id WHERE study_id =:study_id AND hospital_id=:hospital_id AND reading = :reading LIMIT 1'
        return query
    }

    static searchReadingIdByStudyIdAndMrn_query(){
        let query = 'SELECT DISTINCT pbai.study_id,pbi.baby_medical_record_number,pbai.reading FROM patient_baby_appears_infos AS pbai,patient_basic_infos AS pbi WHERE pbai.study_id= pbi.id AND pbi.baby_medical_record_number= :baby_medical_record_number AND pbi.hospital_id =:hospital_id'
        return query
    }

    static generateReport_query(){
        let query = 'SELECT * FROM vw_get_all_data'
        return query
    }

    static getBabyMedicalRecord_searchTextNull(isStaff, end, start) {
        let query = `SELECT patient_infos.baby_name,patient_infos.mother_name, 
        patient_infos.father_name,patient_infos.primary_contact_no,patient_infos.secondary_contact_no,
        patient_infos.createdAt,patient_infos.updated_by, 
        patient_infos.address,patient_infos.city,patient_infos.state,patient_infos.pincode, 
        patient_infos.nationality,patient_infos.email_id,patient_infos.study_id, 
        patient_infos.active_flag AS status , patient_infos.patient_id,patient_infos.created_by, 
        patient_basic_infos.hospital_id,m_hospitals.hospital_name,patient_basic_infos.hospital_branch_id, 
        patient_basic_infos.baby_medical_record_number,patient_basic_infos.baby_mother_medical_record_number, 
        m_hospitals_branches.branch_name,patient_basic_infos.id AS patient_basic_infos_id
        FROM patient_infos 
        JOIN patient_basic_infos ON patient_basic_infos.id=patient_infos.study_id`;
        if (isStaff) {
            query += ` JOIN map_staff_hospitals ON 
          patient_basic_infos.hospital_branch_id = map_staff_hospitals.hospital_branch_id`;
        }
        query += ` JOIN m_hospitals_branches ON  
        m_hospitals_branches.hospital_branch_id=patient_basic_infos.hospital_branch_id 
        JOIN m_hospitals ON  
        m_hospitals.hospital_id=patient_basic_infos.hospital_id 
        WHERE patient_basic_infos.hospital_id=:hospital_id`
        if (!isStaff) {
            query += ` and patient_basic_infos.hospital_branch_id=:hospital_branch_id`;
        }
        if (isStaff) {
            query += ` and patient_infos.active_flag =1 and map_staff_hospitals.staff_id=:staffID and map_staff_hospitals.active_flag = 1`;
        }
        query += ' order by patient_infos.active_flag desc LIMIT ' + end + ' OFFSET ' + start;
        return query
    }

    static getBabyMedicalRecord_searchText(isStaff, end, start) {
        let query = `SELECT patient_infos.baby_name,patient_infos.mother_name, 
        patient_infos.father_name,patient_infos.primary_contact_no,patient_infos.secondary_contact_no,
        patient_infos.createdAt,patient_infos.updated_by, 
        patient_infos.address,patient_infos.city,patient_infos.state,patient_infos.pincode, 
        patient_infos.nationality,patient_infos.email_id,patient_infos.study_id, 
        patient_infos.active_flag AS status , patient_infos.patient_id,patient_infos.created_by, 
        patient_basic_infos.hospital_id,m_hospitals.hospital_name,patient_basic_infos.hospital_branch_id, 
        patient_basic_infos.baby_medical_record_number,patient_basic_infos.baby_mother_medical_record_number, 
        m_hospitals_branches.branch_name,patient_basic_infos.id AS patient_basic_infos_id
        FROM patient_infos 
        JOIN patient_basic_infos ON patient_basic_infos.id=patient_infos.study_id`;
        if (isStaff) {
            query += ` JOIN map_staff_hospitals ON 
          patient_basic_infos.hospital_branch_id = map_staff_hospitals.hospital_branch_id`;
        }
        query += ` JOIN m_hospitals_branches ON  
        m_hospitals_branches.hospital_branch_id=patient_basic_infos.hospital_branch_id
        JOIN m_hospitals ON  
        m_hospitals.hospital_id=patient_basic_infos.hospital_id  
        WHERE patient_basic_infos.hospital_id=:hospital_id`
        if (!isStaff) {
            query += ` and patient_basic_infos.hospital_branch_id=:hospital_branch_id`;
        }
        if (isStaff) {
            query += ` and patient_infos.active_flag =1 and map_staff_hospitals.staff_id=:staffID and map_staff_hospitals.active_flag = 1`;
        }
        query += ` and ( patient_infos.mother_name LIKE(:searchText)
        or patient_basic_infos.baby_medical_record_number like(:searchText)
        or patient_basic_infos.baby_mother_medical_record_number LIKE (:searchText)
        or patient_infos.primary_contact_no LIKE (:searchText)
        or patient_infos.createdAt LIKE (:searchText)
        or patient_infos.active_flag LIKE (:searchText)
        or patient_infos.updatedAt LIKE (:searchText))`;
        query += ' order by patient_infos.active_flag desc LIMIT ' + end + ' OFFSET ' + start;
        return query
    }

    static getBabyMedicalRecord_query(){
        let query = `SELECT  CONCAT(m_staffs.first_name, ' ' ,m_staffs.last_name )  AS name  FROM m_staffs
        WHERE m_staffs.user_id =:user_id`
        return query
    }

    static babyMedicalRecordCount_searchTextNull(isStaff) {
        let query =`SELECT
        patient_infos.baby_name as  count, count(*) as total
        FROM patient_infos 
        JOIN patient_basic_infos ON patient_basic_infos.id=patient_infos.study_id 
        JOIN m_hospitals_branches ON  m_hospitals_branches.hospital_branch_id=patient_basic_infos.hospital_branch_id`;
        if (isStaff) {
            query += ` JOIN map_staff_hospitals ON 
           patient_basic_infos.hospital_branch_id = map_staff_hospitals.hospital_branch_id`;
        }
        query += ` WHERE patient_basic_infos.hospital_id=:hospital_id`
        if (!isStaff) {
            query += ` and patient_basic_infos.hospital_branch_id=:hospital_branch_id`;
        }
        if (isStaff) {
            query += ` and patient_infos.active_flag =1 and map_staff_hospitals.staff_id=:staffID and map_staff_hospitals.active_flag = 1`;
        }
        return query
    }

    static babyMedicalRecordCount_searchText(isStaff) {
        let query = `SELECT
        patient_infos.baby_name as  count, count(*) as total
        FROM patient_infos 
        JOIN patient_basic_infos ON patient_basic_infos.id=patient_infos.study_id 
        JOIN m_hospitals_branches ON  m_hospitals_branches.hospital_branch_id=patient_basic_infos.hospital_branch_id`;
        if (isStaff) {
            query += ` JOIN map_staff_hospitals ON 
           patient_basic_infos.hospital_branch_id = map_staff_hospitals.hospital_branch_id`;
        }
        query += ` WHERE patient_basic_infos.hospital_id=:hospital_id`
        if (!isStaff) {
            query += ` and patient_basic_infos.hospital_branch_id=:hospital_branch_id`;
        }
        if (isStaff) {
            query += ` and patient_infos.active_flag =1 and map_staff_hospitals.staff_id=:staffID and map_staff_hospitals.active_flag = 1`;
        }

        query += ` and ( patient_infos.mother_name LIKE(:searchText)
        or patient_basic_infos.baby_medical_record_number like(:searchText)
        or patient_basic_infos.baby_mother_medical_record_number LIKE (:searchText)
        or patient_infos.primary_contact_no LIKE (:searchText)
        or patient_infos.createdAt LIKE (:searchText)
        or patient_infos.active_flag LIKE (:searchText)
        or patient_infos.updatedAt LIKE (:searchText))`;
        return query
    }

    static scoreGeneratedReport_query(studyId, reading){
        let query = `SELECT * FROM vw_get_all_data WHERE study_id =`+studyId+` AND reading =`+reading
        return query
    }

}


exports.PatientContQueries = PatientContQueries