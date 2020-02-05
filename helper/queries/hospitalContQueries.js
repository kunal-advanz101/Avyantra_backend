class HospitalContQueries{

    static getHospitalProfile_query(){
        let query = 'SELECT m_hospitals.hospital_id,m_hospitals.user_id,m_hospitals.hospital_name, '+
        ' m_users.address,m_users.city, m_users.contact_number,m_users.email_address, m_users.pincode, m_users.state, m_users.user_name, m_users.password '+
        ' FROM m_hospitals '+
        ' JOIN m_users ON m_hospitals.user_id = m_users.user_id '+
        ' WHERE m_hospitals.hospital_id = :hospital_id '
        return query
    }
    
    static getRegisteredRefferal_searchTextNull(end, start){
        let query = `SELECT m_referral_doctors.referral_id, m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_users.address,m_users.city,m_users.contact_number,
        m_users.email_address,m_users.state,m_users.user_name,m_users.password, 
        m_referral_doctors.referral_source, m_referral_doctors.hospital_branch_speciality_id, m_specialities.speciality FROM m_referral_doctors 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        JOIN m_specialities ON m_referral_doctors.hospital_branch_speciality_id = m_specialities.speciality_id
        WHERE m_referral_doctors.referral_source =2 
        LIMIT ` + end +` OFFSET ` +start;
        return query
    }

    static getRegisteredRefferal_searchText(searchText){
        let query = `SELECT m_referral_doctors.referral_id, m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_users.address,m_users.city,m_users.contact_number,
        m_users.email_address,m_users.state,m_users.user_name,m_users.password, 
        m_referral_doctors.referral_source, m_referral_doctors.hospital_branch_speciality_id, m_specialities.speciality FROM m_referral_doctors 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        JOIN m_specialities ON m_referral_doctors.hospital_branch_speciality_id = m_specialities.speciality_id
        WHERE m_referral_doctors.referral_source =2
        AND ( m_referral_doctors.first_name LIKE('`+ searchText +`')
        OR  m_referral_doctors.last_name LIKE('` + searchText +`')
        OR  m_users.contact_number LIKE('` +searchText +`') )`
        return query
    }

    static getRegisteredRefferal_mQuery(referralIds){
        let query = 'SELECT m_status.status_name AS hospital_initiation_status ,ms.status_name AS  refferal_initiation_status,map_referral_hospitals.referral_action_status,map_referral_hospitals.hospital_id ,map_referral_hospitals.referral_hospital_id,map_referral_hospitals.referral_id , map_referral_hospitals.hospital_action_status  FROM map_referral_hospitals '+
        ' JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status '+
        ' JOIN m_status ms ON  ms.status_id = map_referral_hospitals.referral_action_status '+
        ' WHERE map_referral_hospitals.referral_id  IN ('+referralIds+') AND map_referral_hospitals.hospital_id =:hospital_id '
        return query
    }

    static getRefferalCount_searchTextNull(){
        let query = `SELECT m_referral_doctors.referral_id, m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_users.address,m_users.city,m_users.contact_number,
        m_users.email_address,m_users.state,m_users.user_name,m_users.password, 
        m_referral_doctors.referral_source, m_referral_doctors.hospital_branch_speciality_id, 
        m_specialities.speciality, count(*) as total
        FROM m_referral_doctors 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        JOIN m_specialities ON m_referral_doctors.hospital_branch_speciality_id = m_specialities.speciality_id
        WHERE m_referral_doctors.referral_source =2 `
        return query
    }

    static getRefferalCount_searchText(){
        let query = `SELECT m_referral_doctors.referral_id, m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_users.address,m_users.city,m_users.contact_number,
        m_users.email_address,m_users.state,m_users.user_name,m_users.password, 
        m_referral_doctors.referral_source, m_referral_doctors.hospital_branch_speciality_id, 
        m_specialities.speciality, count(*) as total
        FROM m_referral_doctors 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        JOIN m_specialities ON m_referral_doctors.hospital_branch_speciality_id = m_specialities.speciality_id
        WHERE m_referral_doctors.referral_source =2 
        AND ( m_referral_doctors.first_name LIKE(:searchText)
        OR  m_referral_doctors.last_name LIKE(:searchText)
        OR  m_users.contact_number LIKE(:searchText))` 
        return query
    }

    static getStaffAdmin_m_staffs(){
        let query = `SELECT user_id FROM m_staffs WHERE staff_id=:staff_id`
        return query
    }

    static getStaffAdmin_map_staff_hospitals(){
        let query = `SELECT DISTINCT map_staff_hospitals.hospital_id  AS id, m_hospitals.hospital_name AS name, m_users.contact_number,m_users.user_id
        FROM map_staff_hospitals
        JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id
        JOIN m_users ON m_users.user_id = m_hospitals.user_id 
        WHERE m_staffs.staff_id =:staff_id  AND m_hospitals.active_flag = 1 `
        return query
    }

    static getStaffAdmin_map_staff_hospitals_two(){
        let query = `SELECT DISTINCT map_staff_hospitals.hospital_branch_id AS id ,m_hospitals_branches.branch_name  AS name , m_users.user_id , m_users.contact_number 
        FROM map_staff_hospitals 
        JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN m_hospitals_branches ON  m_hospitals_branches.hospital_branch_id = map_staff_hospitals.hospital_branch_id
        JOIN m_users ON m_users.user_id = m_hospitals_branches.user_id 
        WHERE m_staffs.staff_id =:staff_id AND m_hospitals_branches.active_flag =1`
        return query
    }

    static getMessage_query(senderId, receiverId, ){
        let query = `SELECT  message_log_id , sender , receiver , message , is_read , createdAt , active_flag FROM t_message_logs
        WHERE sender IN(` + senderId + `,`+ receiverId + `) AND receiver IN(` + senderId +`,` + receiverId + `)`
        return query
    }

    static getReferralAdmin_m_referral_doctors(){
        let query = `SELECT user_id FROM m_referral_doctors WHERE referral_id =:referral_id`
        return query
    }

    static getReferralAdmin_map_referral_hospitals(){
        let query = `SELECT DISTINCT map_referral_hospitals.hospital_id AS id , m_hospitals.hospital_name AS name, m_users.contact_number,m_users.user_id
        FROM map_referral_hospitals
        JOIN  m_hospitals ON m_hospitals.hospital_id = map_referral_hospitals.hospital_id
        JOIN  m_users ON m_users.user_id = m_hospitals.user_id
        JOIN  m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id
        WHERE  map_referral_hospitals.referral_id =:referral_id AND m_referral_doctors.referral_source= 2 AND map_referral_hospitals.active_flag=1
        AND m_hospitals.active_flag=1`
        return query
    }

    static getReferralAdmin_map_referral_hospitals_two(){
        let query = `SELECT DISTINCT map_referral_hospitals.hospital_branch_id AS id , m_hospitals_branches.branch_name AS name , m_users.user_id , m_users.contact_number
        FROM map_referral_hospitals
        JOIN  m_hospitals_branches ON m_hospitals_branches.hospital_branch_id = map_referral_hospitals.hospital_branch_id
        JOIN m_users ON  m_users.user_id = m_hospitals_branches.user_id
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id
        WHERE map_referral_hospitals.referral_id =:referral_id AND m_referral_doctors.referral_source =2 AND map_referral_hospitals.active_flag =1 AND m_hospitals_branches.active_flag=1 `
        return query
    }

    static getRegisterRefferalCount_query(){
        let query = `SELECT COUNT(*) as registered_refferal_count FROM m_referral_doctors 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id `
        return query
    }

    static getAllReferralDoctors_query(){
        let query = `SELECT DISTINCT m_referral_doctors.referral_id,map_staff_hospitals.hospital_id,map_staff_hospitals.staff_id,
        m_referral_doctors.first_name,m_referral_doctors.last_name,m_referral_doctors.referral_source
        FROM map_staff_hospitals
        JOIN map_referral_hospitals ON map_referral_hospitals.hospital_id= map_staff_hospitals.hospital_id
        JOIN  m_referral_doctors ON m_referral_doctors.referral_id =map_referral_hospitals.referral_id 
        WHERE map_staff_hospitals.staff_id =:staffId
        AND map_referral_hospitals.hospital_action_status =4 AND map_referral_hospitals.referral_action_status =4 AND m_referral_doctors.referral_source=2
        UNION
        SELECT DISTINCT m_referral_doctors.referral_id,map_staff_hospitals.hospital_id,map_staff_hospitals.staff_id,
        m_referral_doctors.first_name,m_referral_doctors.last_name,m_referral_doctors.referral_source
        FROM map_staff_hospitals
        JOIN map_referral_hospitals ON map_referral_hospitals.hospital_id= map_staff_hospitals.hospital_id
        JOIN map_referral_hospitals mrh ON mrh.hospital_branch_id =map_staff_hospitals.hospital_branch_id
        JOIN  m_referral_doctors ON m_referral_doctors.referral_id =map_referral_hospitals.referral_id  
        WHERE map_staff_hospitals.staff_id =:staffId
        AND map_referral_hospitals.hospital_action_status =4 AND map_referral_hospitals.referral_action_status =4 AND m_referral_doctors.referral_source=1`
        return query
    }

    static getDashBoardDetail_hquery(hospitalId){
        let query = `SELECT  COUNT(DISTINCT m_staffs.staff_id)  AS total_staff , COUNT( DISTINCT patient_basic_infos.id) AS medical_record_count ,m_hospitals.hospital_name
        FROM map_staff_hospitals
        JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id
        JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN  patient_basic_infos ON patient_basic_infos.hospital_branch_id =map_staff_hospitals.hospital_branch_id
        WHERE map_staff_hospitals.hospital_id = `+ hospitalId
        return query
    }

    static getDashBoardDetail_hbquery(hospitalBranchId){
        let query = `SELECT COUNT(DISTINCT m_staffs.staff_id) AS total_staff ,COUNT( DISTINCT patient_basic_infos.id) AS medical_record_count , m_hospitals_branches.branch_name
        FROM map_staff_hospitals
        JOIN m_hospitals_branches ON m_hospitals_branches.hospital_branch_id = map_staff_hospitals.hospital_branch_id
        JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN  patient_basic_infos ON patient_basic_infos.hospital_branch_id =map_staff_hospitals.hospital_branch_id
        WHERE map_staff_hospitals.hospital_branch_id =`+ hospitalBranchId
        return query
    }

    static getDashBoardDetail_rquery(){
        let query = `SELECT COUNT(*) AS referral_doctor_count FROM m_referral_doctors `
        return query
    }

    static getDashBoardDetail_getStaffQuery(userType){
        let query = `SELECT DISTINCT map_staff_hospitals.staff_id ,
        m_staffs.first_name,m_staffs.last_name,m_roles.role, `
        if(userType === 'Hospital Branch'){
         query += ` m_hospitals_branches.user_id AS hospital_branch_user_id, `   
        }else{
         query += ` m_hospitals.user_id AS hospital_user_id, `
        }
        query += ` m_staffs.user_id AS staff_user_id
        FROM map_staff_hospitals
        JOIN m_staffs  ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN  m_hospital_branch_roles ON m_hospital_branch_roles.id= m_staffs.hospital_branch_role_id
        JOIN  m_roles ON m_roles.role_id = m_hospital_branch_roles.id `
        return query
    }

    static getDashBoardDetail_getReferralQuery(){
        let query = `SELECT DISTINCT map_referral_hospitals.referral_id,
        m_referral_doctors.first_name,m_referral_doctors.last_name ,m_referral_doctors.user_id AS referral_user_id,
        m_hospitals.user_id AS hospital_user_id 
        FROM map_referral_hospitals
        JOIN m_referral_doctors ON m_referral_doctors.referral_id=map_referral_hospitals.referral_id
        JOIN  m_hospitals ON m_hospitals.hospital_id = map_referral_hospitals.hospital_id `
        return query
    }

}
exports.HospitalContQueries = HospitalContQueries
