const isPasswordExpired = (user) => {
    const now = Date.now();
    const lastChange = user.lastPasswordChange.getTime();
    // console.log("current "+now+" and lastchange"+lastChange);
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if(user.role=="employer")
    return (now - lastChange) > expirationTime*2;  //48 hours  for employers
    if(user.role=="employee")
    return (now - lastChange) > expirationTime;   // 24 hours for employees
};

module.exports={isPasswordExpired}