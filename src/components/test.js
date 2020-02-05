import DynamicStyles from "./dynamicstyles";

showprofileimage() {
    const dynamicstyles = new DynamicStyles();
    const myuser = dynamicstyles.getuser.call(this);
    const profileImage = dynamicstyles.getprofiledimensions.call(this)
    if (myuser.profileurl) {
        return (<img src={myuser.profileurl} style={{ ...profileImage }} alt={`${myuser.firstname} ${myuser.lastname}`} />)
    } else {
        return;
    }

}