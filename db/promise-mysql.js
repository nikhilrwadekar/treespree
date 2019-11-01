// Code Courtesy - Jordan Miller

const query = (cp, sql) => {
  return new Promise((resolve, reject) => {
    cp.query(sql, (error, result) => {
      if (error) {
        console.log("Rejected SQL!: " + sql);
        reject(error);
      } else {
        console.log("Approved SQL!: " + sql);
        resolve(result);
      }
    });
  });
};

exports.query = query;
