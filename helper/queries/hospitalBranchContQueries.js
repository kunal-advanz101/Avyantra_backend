class HospitalBranchContQueries{

    static getHospitalBranches_searchTextNull(){
        let query = `SELECT * FROM  m_hospitals_branches , m_users WHERE m_hospitals_branches.user_id=m_users.user_id 
        AND m_hospitals_branches.hospital_id=:hospitalId`
        return query
    }

    static getHospitalBranches_searchText(){
        let query = `SELECT * FROM  m_hospitals_branches,m_users WHERE m_hospitals_branches.user_id=m_users.user_id AND m_hospitals_branches.hospital_id=:hospitalId
        AND ( m_hospitals_branches.branch_name LIKE(:searchText)
        OR m_hospitals_branches.contact_person LIKE(:searchText)
        OR m_users.contact_number LIKE(:searchText) 
        OR m_users.user_name LIKE(:searchText))`
        return query
    }

    static getHopitalBranchRoles_query(){
        let query = `SELECT m_roles.role ,m_roles.role_id,m_hospital_branch_roles.id AS hospital_branch_role_id ,
        m_hospital_branch_roles.hospital_branch_id,m_hospital_branch_roles.hospital_id FROM  m_roles  
        JOIN  m_hospital_branch_roles ON m_roles.role_id = m_hospital_branch_roles.role_id 
        WHERE   m_hospital_branch_roles.hospital_branch_id =:hospital_branch_id AND m_hospital_branch_roles.hospital_id=:hospital_id AND m_hospital_branch_roles.deleted_flag=0 ORDER BY m_hospital_branch_roles.createdAt DESC`
        return query
    }

    static getHopitalBranchspecialities_query(){
        let query = `SELECT m_specialities.speciality, m_specialities.speciality_id ,m_hospital_branch_specialities.id AS hospital_branch_speciality_id ,m_hospital_branch_specialities.hospital_id , m_hospital_branch_specialities.hospital_branch_id FROM m_specialities JOIN m_hospital_branch_specialities ON m_specialities.speciality_id =m_hospital_branch_specialities.speciality_id WHERE m_hospital_branch_specialities.hospital_id=:hospital_id AND m_hospital_branch_specialities.hospital_branch_id=:hospital_branch_id AND m_hospital_branch_specialities.deleted_flag=0 ORDER BY m_hospital_branch_specialities.createdAt DESC`
        return query
    }

    static getHopitalBranchProfile_query(){
        let query = 'SELECT m_hospitals_branches.branch_name,m_hospitals_branches.hospital_branch_id,m_hospitals_branches.contact_person , '+
        ' m_users.user_name,m_users.contact_number,m_users.contact_number,m_users.email_address,m_users.state,m_users.city,m_users.address,m_users.pincode,m_users.password,m_hospitals.hospital_name'+
        ' FROM m_hospitals_branches '+
        ' JOIN  m_users ON m_users.user_id = m_hospitals_branches.user_id '+
        ' JOIN m_hospitals ON m_hospitals.hospital_id =  m_hospitals_branches.hospital_id '+
        ' WHERE m_hospitals_branches.hospital_branch_id =:hospital_branch_id' 
        return query
    }
}

exports.HospitalBranchContQueries = HospitalBranchContQueries

