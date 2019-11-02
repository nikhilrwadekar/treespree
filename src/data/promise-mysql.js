const query = (con, sql) => {
    return new Promise((resolve,reject)=>{
        
        con.query(sql,(error,result)=>{
            if(error){
                reject(error);
            }
            else {
                resolve(result);
            }
        })
        
    });
}

exports.query = query;