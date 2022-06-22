const AutherController= require("../Controller/AutherController")
const checker=function(data){
    let rdata="";
    // if (!/^[a-zA-Z]+$/.test(data.fname)||!/^[a-zA-Z]+$/.test(data.lname)){
    //     const f1info="  fname or lname cannot be empty and cannot have spaces "
    //     rdata=rdata+f1info;
    // }
 
    if ( /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.fname)|| /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.lname)){
        const specialchar="  fanme and lname cannot  have special charaters or white spaces "
        rdata=rdata+specialchar;
    }
    else if (/\d/.test(data.fname)||/\d/.test(data.lname)){
        const f2info="  fname and lname cannot have numbers "
        rdata=rdata+f2info;

    }
     
   
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
        const emailvalidator="Email is envalid "
        rdata=rdata+emailvalidator;
    }
    if (/\s/.test(data.password)){
        const pass="password must not have spaces "
        rdata=rdata+pass;
    }
    
    else if (data.password.length<6){
        const pass="password must be more than 6characters "
        rdata=rdata+pass;
    }
    else if(!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(data.password)){
        const pass="password must have a special character present "
        rdata=rdata+pass;
    }
    return rdata
   
};
module.exports.checker=checker
