class HospitalStaffQueries {

    static getHospitalStaffRoles_query() {
        let query = 'SELECT m_hospital_branch_roles.id AS hospital_branch_roles_id ,m_roles.role_id ,m_roles.role ,m_hospital_branch_roles.hospital_id, m_hospital_branch_roles.hospital_branch_id  FROM  m_roles JOIN m_hospital_branch_roles ON m_roles.role_id = m_hospital_branch_roles.role_id WHERE hospital_id =:hospital_id'
        return query
    }
    static getHospitalStaffSpecialities_query() {
        let query = 'SELECT m_hospital_branch_specialities.id AS  hospital_branch_speciality_id ,m_specialities.speciality_id , m_specialities.speciality , m_hospital_branch_specialities.hospital_id,m_hospital_branch_specialities.hospital_branch_id FROM m_specialities  JOIN m_hospital_branch_specialities ON m_specialities.speciality_id = m_hospital_branch_specialities.speciality_id WHERE  hospital_id =:hospital_id'
        return query
    }
    static getReferralDoctor_searchTxtNull(end,start) {
        let query = `SELECT map_referral_hospitals.hospital_id, map_referral_hospitals.hospital_branch_id,
        .map_referral_hospitals.referral_id, map_referral_hospitals.hospital_action_status 
        AS hospital_action_status_id , map_referral_hospitals.referral_action_status 
        AS referral_action_status_id,map_referral_hospitals.active_flag,
        m_referral_doctors.user_id ,m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_referral_doctors.hospital_branch_speciality_id, m_users.address,m_users.email_address,
        m_users.state,m_users.city,m_users.pincode,m_users.contact_number, m_status.status_name 
        AS hospital_action_status,ms.status_name AS referral_action_status , m_specialities.speciality
        FROM map_referral_hospitals 
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id 
        JOIN m_hospital_branch_specialities ON m_hospital_branch_specialities.id = m_referral_doctors.hospital_branch_speciality_id
        JOIN m_specialities ON m_specialities.speciality_id = m_hospital_branch_specialities.speciality_id
        JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status 
        JOIN m_status ms ON ms.status_id = map_referral_hospitals.referral_action_status 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        WHERE map_referral_hospitals.hospital_id=:hospital_id
        AND map_referral_hospitals.hospital_branch_id=:hospital_branch_id
        LIMIT ` + end + ` OFFSET ` + start;
        return query;
    }
    static getReferralDoctor_NotNull() {
        let query = `SELECT map_referral_hospitals.hospital_id, map_referral_hospitals.hospital_branch_id,
        .map_referral_hospitals.referral_id, map_referral_hospitals.hospital_action_status 
        AS hospital_action_status_id , map_referral_hospitals.referral_action_status 
        AS referral_action_status_id,map_referral_hospitals.active_flag,
        m_referral_doctors.user_id ,m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_referral_doctors.hospital_branch_speciality_id, m_users.address,m_users.email_address,
        m_users.state,m_users.city,m_users.pincode,m_users.contact_number, m_status.status_name 
        AS hospital_action_status,ms.status_name AS referral_action_status , m_specialities.speciality
        FROM map_referral_hospitals 
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id 
        JOIN m_hospital_branch_specialities ON m_hospital_branch_specialities.id = m_referral_doctors.hospital_branch_speciality_id
        JOIN m_specialities ON m_specialities.speciality_id = m_hospital_branch_specialities.speciality_id
        JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status 
        JOIN m_status ms ON ms.status_id = map_referral_hospitals.referral_action_status 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        WHERE map_referral_hospitals.hospital_id=:hospital_id
        AND map_referral_hospitals.hospital_branch_id=:hospital_branch_id
         AND ( m_referral_doctors.first_name LIKE(:searchText)
                OR m_referral_doctors.last_name LIKE(:searchText)
                OR m_users.contact_number LIKE(:searchText)
                OR m_users.email_address LIKE(:searchText)
                OR m_specialities.speciality LIKE(:searchText))`
        return query;
    }
    static getReferralDoctor_then_query(){
        let query=`SELECT m_hospital_branch_specialities.speciality_id ,  m_specialities.speciality , m_referral_doctors.referral_id
        FROM map_referral_hospitals 
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id 
        JOIN m_hospital_branch_specialities ON m_hospital_branch_specialities.id = m_referral_doctors.hospital_branch_speciality_id
        JOIN m_specialities ON m_specialities.speciality_id = m_hospital_branch_specialities.speciality_id
        
        JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status 
        JOIN m_status  ms ON ms.status_id = map_referral_hospitals.referral_action_status 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        WHERE map_referral_hospitals.hospital_id=:hospital_id AND map_referral_hospitals.hospital_branch_id=:hospital_branch_id`;
        return query;
    }
    static getReferralDoctorCount_searchTxtNull() {
        let query = `SELECT map_referral_hospitals.hospital_id , map_referral_hospitals.hospital_branch_id,
        map_referral_hospitals.referral_id, map_referral_hospitals.hospital_action_status 
        AS hospital_action_status_id , map_referral_hospitals.referral_action_status 
        AS referral_action_status_id,map_referral_hospitals.active_flag,
        m_referral_doctors.user_id,m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_referral_doctors.hospital_branch_speciality_id, m_users.address,m_users.email_address,
        m_users.state,m_users.city,m_users.pincode,m_users.contact_number, m_status.status_name 
        AS hospital_action_status, ms.status_name AS referral_action_status, count(*) as total
        FROM map_referral_hospitals 
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id 
        JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status 
        JOIN m_status  ms ON ms.status_id = map_referral_hospitals.referral_action_status 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        WHERE map_referral_hospitals.hospital_id=:hospital_id 
        AND map_referral_hospitals.hospital_branch_id=:hospital_branch_id`
        return query;
    }
    static getReferralDoctorCount_NotNull() {
        let query = `SELECT map_referral_hospitals.hospital_id , map_referral_hospitals.hospital_branch_id,
        map_referral_hospitals.referral_id, map_referral_hospitals.hospital_action_status 
        AS hospital_action_status_id , map_referral_hospitals.referral_action_status 
        AS referral_action_status_id,map_referral_hospitals.active_flag,
        m_referral_doctors.user_id,m_specialities.speciality ,m_referral_doctors.first_name,m_referral_doctors.last_name,
        m_referral_doctors.hospital_branch_speciality_id, m_users.address,m_users.email_address,
        m_users.state,m_users.city,m_users.pincode,m_users.contact_number, m_status.status_name 
        AS hospital_action_status, ms.status_name AS referral_action_status, count(*) as total
        FROM map_referral_hospitals 
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id 
        JOIN m_specialities ON m_specialities.speciality_id = m_referral_doctors.hospital_branch_speciality_id
        JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status 
        JOIN m_status  ms ON ms.status_id = map_referral_hospitals.referral_action_status 
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id 
        WHERE map_referral_hospitals.hospital_id=:hospital_id 
        AND map_referral_hospitals.hospital_branch_id=:hospital_branch_id
        AND ( first_name LIKE(:searchText)
        OR last_name LIKE(:searchText)
        OR contact_number LIKE(:searchText)
        OR email_address LIKE(:searchText)
        OR speciality LIKE(:searchText))`
        return query;
    }
    static getStaffProfile_query() {
        let query = 'SELECT map_staff_hospitals.hospital_id,map_staff_hospitals.hospital_branch_id,map_staff_hospitals.staff_id , ' +
            ' m_staffs.first_name,m_staffs.last_name,m_staffs.staff_id,' +
            ' m_users.user_name,m_users.contact_number,m_users.email_address,' +
            ' m_specialities.speciality,m_roles.role,m_users.password,' +
            ' m_hospitals.hospital_name' +
            ' FROM map_staff_hospitals' +
            ' JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id' +
            ' JOIN m_users ON m_users.user_id = m_staffs.user_id' +
            ' JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id' +
            '  JOIN  m_hospital_branch_specialities ON m_hospital_branch_specialities.id= m_staffs.hospital_branch_speciality_id ' +
            ' JOIN m_specialities ON m_specialities.speciality_id = m_hospital_branch_specialities.speciality_id ' +
            ' JOIN m_hospital_branch_roles ON m_hospital_branch_roles.id = m_staffs.hospital_branch_role_id ' +
            ' JOIN m_roles ON m_roles.role_id = m_hospital_branch_roles.role_id ' +
            ' WHERE map_staff_hospitals.staff_id=:staff_id LIMIT 1'
        return query;
    }
    static getStaffProfile_then_one_query() {
        let query = 'SELECT ms.user_name AS reporting_user  FROM map_staff_hospitals JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id JOIN m_users  ms  ON ms.user_id = m_staffs.reporting_user_id  WHERE map_staff_hospitals.staff_id=:staff_id';
        return query;
    }
    static getStaffProfile_then_two_query() {
        let query = 'SELECT m_hospitals_branches.branch_name FROM map_staff_hospitals  JOIN  m_hospitals_branches ON m_hospitals_branches.hospital_branch_id= map_staff_hospitals.hospital_branch_id WHERE staff_id =:staff_id and map_staff_hospitals.active_flag=1'
        return query;
    }
    static getReferralProfile_query() {
        let query = 'SELECT m_referral_doctors.first_name,m_referral_doctors.last_name , ' +
            ' m_specialities.speciality, ' +
            ' m_users.user_name,m_users.password,m_users.contact_number,m_users.email_address,m_users.state,m_users.city,m_users.address,m_users.pincode ' +
            ' FROM m_referral_doctors ' +
            ' JOIN m_users ON m_users.user_id=m_referral_doctors.user_id ' +
            ' JOIN m_specialities ON m_specialities.speciality_id=m_referral_doctors.hospital_branch_speciality_id ' +
            ' WHERE m_referral_doctors.referral_id=:referral_id';
        return query;
    }
    static getReferralHospital_searchTxtNull(end,start) {
        let query = 'SELECT  m_hospitals.hospital_id,m_hospitals.hospital_name,m_users.user_id , m_users.contact_number,m_users.email_address,m_users.address,m_users.city,m_users.pincode,m_users.user_name,m_users.state ' +
            ' FROM m_hospitals ' +
            ' JOIN m_users ON m_users.user_id = m_hospitals.user_id ' +
            ' LIMIT ' + end + ' OFFSET ' + start;
        return query;
    }
    static getReferralHospital_notNull() {
        let query = `SELECT  m_hospitals.hospital_id,
        m_hospitals.hospital_name, m_users.user_id ,m_users.contact_number,
        m_users.email_address,m_users.address, m_users.city,m_users.pincode,
        m_users.user_name,m_users.state 
        FROM m_hospitals 
        JOIN m_users ON m_users.user_id = m_hospitals.user_id 
        AND ( m_hospitals.hospital_name LIKE(:searchText));`
        return query;
    }
    static getReferralHospital_result_query(hospitalIds) {
        let query = 'SELECT m_status.status_name AS hospital_initiation_status ,ms.status_name AS  refferal_initiation_status,map_referral_hospitals.referral_action_status,map_referral_hospitals.hospital_id ,map_referral_hospitals.referral_hospital_id,map_referral_hospitals.referral_id , map_referral_hospitals.hospital_action_status  FROM map_referral_hospitals ' +
            ' JOIN m_status ON m_status.status_id = map_referral_hospitals.hospital_action_status ' +
            'JOIN m_status ms ON  ms.status_id = map_referral_hospitals.referral_action_status' +
            ' WHERE map_referral_hospitals.referral_id =:referral_id AND map_referral_hospitals.hospital_id ' +
            'IN(' + hospitalIds + ')';
        return query;
    }
    static getReferralHospitalCount_searchTxtNull(){
        let query=`SELECT 
        count(m_hospitals.hospital_name) AS count
        FROM m_hospitals 
        JOIN m_users ON m_users.user_id = m_hospitals.user_id`;
        return query;
    }
    static getReferralHospitalCount_notNull(){
        let query=`SELECT  
        count(m_hospitals.hospital_name) AS count
        FROM m_hospitals 
        JOIN m_users ON m_users.user_id = m_hospitals.user_id 
        AND (m_hospitals.hospital_name LIKE(:searchText));`
        return query;
    }
    static getStaffForMessageCenter_query(){
        let query=`SELECT DISTINCT CONCAT(m_staffs.first_name ,' ', m_staffs.last_name) AS name , m_users.contact_number ,m_staffs.staff_id AS id ,m_users.user_id 
        FROM map_staff_hospitals 
        JOIN m_staffs ON m_staffs.staff_id=map_staff_hospitals.staff_id 
        JOIN m_users ON m_users.user_id = m_staffs.user_id 
        JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id
        WHERE m_hospitals.user_id =:user_id AND map_staff_hospitals.active_flag =1 AND m_staffs.active_flag=1`
        return query;
    }
    static getRefferalStaff_query(){
        let query=`SELECT DISTINCT CONCAT(m_referral_doctors.first_name , ' ', m_referral_doctors.last_name) AS name, map_referral_hospitals.referral_id, m_users.user_id , m_users.contact_number 
        FROM map_referral_hospitals
        JOIN  m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id
        JOIN m_hospitals ON m_hospitals.hospital_id = map_referral_hospitals.hospital_id
        WHERE m_hospitals.user_id=:user_id AND m_referral_doctors.referral_source=2 AND map_referral_hospitals.active_flag =1 AND m_referral_doctors.active_flag=1`
        return query;
    }
    static getReferralConnectedStaff_ruser_query(){
        let query=`SELECT * FROM m_referral_doctors WHERE referral_id=:referral_id`;
        return query;
    }
    static getReferralConnectedStaff_query(){
        let query=`SELECT  DISTINCT CONCAT(m_staffs.first_name ,' ', m_staffs.last_name) AS name , m_users.contact_number ,m_staffs.staff_id AS id ,m_users.user_id
        FROM map_staff_hospitals
        JOIN m_staffs ON m_staffs.staff_id=map_staff_hospitals.staff_id 
        JOIN m_users ON m_users.user_id = m_staffs.user_id 
        WHERE map_staff_hospitals.hospital_id IN( SELECT map_referral_hospitals.hospital_id 
        FROM map_referral_hospitals
        JOIN m_hospitals ON m_hospitals.hospital_id = map_referral_hospitals.hospital_id
        WHERE map_referral_hospitals.referral_id=:referral_id) AND m_staffs.active_flag=1`;
        return query;
    }
    static getConnectedStaff_suser_query(){
        let query=`SELECT * FROM m_staffs WHERE staff_id=:staff_id`;
        return query;
    }
    static getConnectedStaff_query(){
        let query=`SELECT  DISTINCT CONCAT(m_staffs.first_name ,' ', m_staffs.last_name) AS name , m_users.contact_number ,m_staffs.staff_id AS id ,m_users.user_id FROM map_staff_hospitals JOIN m_staffs ON m_staffs.staff_id=map_staff_hospitals.staff_id JOIN m_users ON m_users.user_id = m_staffs.user_id WHERE map_staff_hospitals.hospital_branch_id  IN ( SELECT map_staff_hospitals.hospital_branch_id FROM map_staff_hospitals WHERE map_staff_hospitals.staff_id =:staff_id)  AND m_staffs.active_flag=1 `;
        return query;
    }
    static getStaffReferral_sUser_query(){
        let query=`SELECT * FROM m_staffs WHERE staff_id=:staff_id`;
        return query;
    }
    static getStaffReferral_query(){
        let query=`SELECT DISTINCT CONCAT(m_referral_doctors.first_name ,' ',m_referral_doctors.last_name) AS name, m_users.contact_number ,m_users.user_id 
        FROM map_referral_hospitals
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_referral_hospitals.referral_id
        JOIN m_users ON m_users.user_id = m_referral_doctors.user_id
        WHERE map_referral_hospitals.hospital_id IN (SELECT map_staff_hospitals.hospital_id FROM map_staff_hospitals WHERE map_staff_hospitals.staff_id =:staff_id) AND m_referral_doctors.active_flag=1`;
        return query;
    }
    static  getBranchStaff_sUser_query(){
        let query=` SELECT * FROM m_hospitals_branches WHERE hospital_branch_id=:hospital_branch_id `;
        return query;
    }
    static  getBranchStaff_query(){
        let query=`SELECT DISTINCT m_users.user_id ,CONCAT(m_staffs.first_name, ' ' ,m_staffs.last_name) AS name , m_users.contact_number 
        FROM map_staff_hospitals
        JOIN m_staffs ON m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN m_users ON m_users.user_id= m_staffs.user_id
        WHERE map_staff_hospitals.hospital_branch_id =:hospital_branch_id  AND m_staffs.active_flag=1`;
        return query;
    }
    static getDashBoardDetail_query(){
        let query=`SELECT COUNT(id) AS total_baby_medical_records ,m_hospitals.hospital_name  
        FROM map_staff_hospitals
        JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id
        JOIN patient_basic_infos ON patient_basic_infos.hospital_branch_id = map_staff_hospitals.hospital_branch_id
        WHERE staff_id =:staff_id`;
        return query;
    }
    static getReferralDetail_query(end,start){
        let query=`SELECT DISTINCT  map_staff_referral_hospitals.staff_id , 
        CONCAT(m_staffs.first_name,' ' ,m_staffs.last_name) AS staff_name ,
        m_hospitals.hospital_name,
        m_hospitals_branches.branch_name,study_id,
       SUBSTRING( map_staff_referral_hospitals.createdAt, 1, 18) AS createdAt,
       patient_basic_infos.baby_medical_record_number,
       map_staff_referral_hospitals.hospital_branch_id
       FROM map_staff_referral_hospitals 
       JOIN  m_staffs ON m_staffs.staff_id =map_staff_referral_hospitals.staff_id
       JOIN m_hospitals_branches ON m_hospitals_branches.hospital_branch_id = map_staff_referral_hospitals.hospital_branch_id
       JOIN  m_hospitals ON m_hospitals.hospital_id = m_hospitals_branches.hospital_id
       JOIN map_referral_files ON map_referral_files.staff_referral_hospital_id = map_staff_referral_hospitals.id
       JOIN  patient_basic_infos ON patient_basic_infos.id = map_staff_referral_hospitals.study_id
       WHERE map_staff_referral_hospitals.referral_id=:referral_id`+
       ' LIMIT ' + end +' OFFSET ' +start
        return query;
    }
    static getReferralDetail_then_query(){
        let query='SELECT map_referral_files.filename , map_referral_files.id AS referral_file_id ,SUBSTRING( map_referral_files.createdAt, 1, 18) AS createdAt '+
        ' FROM map_staff_referral_hospitals '+ 
        ' JOIN map_referral_files ON map_referral_files.staff_referral_hospital_id =map_staff_referral_hospitals.id '+
        ' WHERE  map_staff_referral_hospitals.referral_id=:referral_id AND staff_id =:staff_id AND hospital_branch_id=:hospital_branch_id AND map_staff_referral_hospitals.study_id=:study_id';
        return query;
    }
    static getStaffBranches_query(){
        let query=`SELECT map_staff_hospitals.hospital_id AS id,map_staff_hospitals.staff_id, map_staff_hospitals.permission_id, m_staffs.first_name,m_staffs.last_name,m_staffs.user_id,m_users.user_name as username,m_users.email_address as email,m_users.user_type_id,m_hospitals_branches.branch_name  as hospital_branch_name, m_hospitals.hospital_id , m_hospitals.hospital_name, m_hospitals_branches.hospital_branch_id
        FROM  map_staff_hospitals
        JOIN m_hospitals_branches ON m_hospitals_branches.hospital_branch_id = map_staff_hospitals.hospital_branch_id
        JOIN m_hospitals ON m_hospitals.hospital_id = map_staff_hospitals.hospital_id
        JOIN m_staffs ON  m_staffs.staff_id = map_staff_hospitals.staff_id
        JOIN m_users ON m_users.user_id = m_staffs.user_id
        WHERE map_staff_hospitals.staff_id =:staff_id and map_staff_hospitals.active_flag = 1`;
        return query;
    }
    static getReferralOpinion_query(){
        let query=`SELECT  m_referral_opinions.id ,m_referral_opinions.opinion,m_referral_opinions.prescription , 
        m_referral_opinions.createdAt ,reading,
        CONCAT(m_referral_doctors.first_name,' ', m_referral_doctors.last_name ) AS referral_name,
        CONCAT(m_staffs.first_name,' ',m_staffs.last_name) AS reading_taken_by
        FROM map_staff_referral_hospitals
        JOIN m_referral_opinions ON m_referral_opinions.staff_referral_hospital_id = map_staff_referral_hospitals.id
        JOIN m_referral_doctors ON m_referral_doctors.referral_id = map_staff_referral_hospitals.referral_id
        JOIN patient_infos ON patient_infos.study_id = map_staff_referral_hospitals.study_id
        JOIN m_staffs ON m_staffs.user_id = patient_infos.updated_by
        WHERE map_staff_referral_hospitals.study_id =:study_id`;
        return query;
    }
}
exports.HospitalStaffQueries = HospitalStaffQueries;